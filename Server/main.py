from datetime import date, datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
from requests import session
from sqlalchemy import null
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from models import Carrito, Detallecarrito, Detalleorden, Libros, Orden, Usuarios, Categoria
from schemas import LibroBase, CarritoBase, LibroResponse, LoginRequest, RegisterRequest, CarritoResponse, CarritoDetalleResponse, CarritoDetalleBase, OrdenCreate, PasswordData, UserData
from decimal import Decimal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/libros", response_model=list[LibroResponse])
def obtener_libros(db: Session = Depends(get_db)):
    libros = db.query(Libros).order_by(Libros.id_book).all()

    return libros


@app.get("/libros/{id_book}", response_model=LibroResponse)
def obtener_libro(id_book: int, db: Session = Depends(get_db)):
    libro = db.query(Libros).filter(
        Libros.id_book == id_book
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    return libro

@app.post("/libros", response_model=LibroResponse, status_code=201)
def crear_libro(data: LibroBase, db: Session = Depends(get_db)):

    libro = Libros(
        id_categoria=data.id_categoria,
        titulo=data.titulo,
        autor=data.autor,
        sinopsis=data.sinopsis,
        portada_url=data.portada_url,
        fecha_publicacion=data.fecha_publicacion,
        status=data.status,
        precio=data.precio,
        stock=data.stock
    )

    db.add(libro)
    db.commit()
    db.refresh(libro)

    return libro

@app.put("/libros")
def actualizar_libro(data: LibroBase, db: Session = Depends(get_db)):
    libro = db.query(Libros).filter(
        Libros.id_book == data.id_book
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    libro.id_categoria = data.id_categoria
    libro.titulo = data.titulo
    libro.autor = data.autor
    libro.sinopsis = data.sinopsis
    libro.portada_url = data.portada_url
    libro.fecha_publicacion = data.fecha_publicacion
    libro.status = data.status
    libro.precio = data.precio
    libro.stock = data.stock

    db.commit()
    db.refresh(libro)

@app.delete("/libros/{id_book}")
def eliminar_libro(id_book: int, db: Session = Depends(get_db)):

    libro = db.query(Libros).filter(
        Libros.id_book == id_book
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    db.delete(libro)
    db.commit()

    return {
        "message": "Libro eliminado correctamente"
    }


@app.get("/usuarios")
def obtener_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuarios).all()

    return usuarios


@app.get("/usuarios/{id_user}")
def obtener_usuarios(id_user: int, db: Session = Depends(get_db)):
    usuario = (
            db.query(Usuarios)
            .filter(Usuarios.id_user == id_user)
            .first()
        )

    return {
                "id_user": usuario.id_user,
                "nombre": usuario.nombre_user,
                "email": usuario.email,
                "password": usuario.password,
                "rol": usuario.rol
            }

@app.put("/password")
def cambiar_password(data: PasswordData, db: Session = Depends(get_db)):
    user=db.query(Usuarios).filter(Usuarios.id_user==data.id_user).first()

    user.password=data.new_Password

    db.commit()
    db.refresh(user)

    return user

@app.put("/user")
def cambiar_User(data:UserData, db:Session=Depends(get_db)):
    user=db.query(Usuarios).filter(Usuarios.id_user==data.id_user).first()

    user.nombre_user=data.nombre
    user.email=data.email

    db.commit()
    db.refresh(user)

    return {
        "id_user": user.id_user,
        "nombre": user.nombre_user,
        "email": user.email,
        "rol": user.rol
    }
    

@app.get("/categorias")
def obtener_categorias(db: Session = Depends(get_db)):
    categorias = db.query(Categoria).all()

    return categorias

@app.post("/carrito")
def agregar_carrito(data: CarritoBase, db: Session = Depends(get_db)):
    carrito = Carrito(
            id_user=data.id_user,
            fecha_creacion=datetime.now()
        )
    
    db.add(carrito)
    db.commit()
    db.refresh(carrito)

    return carrito

@app.get("/carrito/{id_user}")
def obtener_carrito_completo(id_user: int, db: Session = Depends(get_db)):
    carrito = (
        db.query(Carrito)
        .filter(Carrito.id_user == id_user)
        .first()
    )

    if not carrito:
        return {
            "id_carrito": None,
            "id_user": id_user,
            "fecha_creacion": None,
            "libros": []
        }

    libros = (
        db.query(
            Libros,
            Detallecarrito.cantidad
        )
        .join(
            Detallecarrito,
            Libros.id_book == Detallecarrito.id_book
        )
        .filter(
            Detallecarrito.id_carrito == carrito.id_carrito
        )
        .all()
    )

    return {
        "id_carrito": carrito.id_carrito,
        "id_user": carrito.id_user,
        "fecha_creacion": carrito.fecha_creacion,
        "libros": [
            {
                **{
                    columna.name: getattr(libro, columna.name)
                    for columna in Libros.__table__.columns
                },
                "cantidad": cantidad
            }
            for libro, cantidad in libros
        ]
    }

@app.get("/librosCarrito/{id_carrito}")
def obtener_libros_carrito(id_carrito: int, db: Session = Depends(get_db)):

    libros = db.query(Detallecarrito).filter(
        Detallecarrito.id_carrito == id_carrito
    ).all()

    return libros

@app.post(
    "/librosCarrito",
    response_model=CarritoDetalleResponse,
    status_code=201
)
def agregar_libro_carrito(data: CarritoDetalleBase, db: Session = Depends(get_db)):
    try:
        detalle = db.query(Detallecarrito).filter(
            Detallecarrito.id_carrito == data.id_carrito,
            Detallecarrito.id_book == data.id_book
        ).first()

        if detalle:
            detalle.cantidad += data.cantidad
        else:
            detalle = Detallecarrito(
                id_carrito=data.id_carrito,
                id_book=data.id_book,
                cantidad=data.cantidad
            )
            db.add(detalle)

        db.commit()
        db.refresh(detalle)

        return detalle

    except SQLAlchemyError as e:
        db.rollback()
        print("Error de base de datos:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Error al guardar el detalle del carrito"
        )

@app.delete("/librosCarrito/{id_book}")
def eliminar_libro(id_book: int, db: Session = Depends(get_db)):

    libro = db.query(Detallecarrito).filter(
        Detallecarrito.id_book == id_book
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado en el carrito"
        )

    db.delete(libro)
    db.commit()

    return {"message": "Libro eliminado del carrito"}

@app.delete("/librosCarrito")
def vaciar_carrito(id_carrito: int, db: Session = Depends(get_db)):
    detalles = (
        db.query(Detallecarrito)
        .filter(Detallecarrito.id_carrito == id_carrito)
        .all()
    )

    if not detalles:
        raise HTTPException(
            status_code=404,
            detail="El carrito no contiene libros"
        )

    for detalle in detalles:
        db.delete(detalle)

    db.commit()

    return {"message": "Carrito vaciado correctamente"}

@app.put("/librosCarrito", response_model=CarritoDetalleBase)
def actualizar_libro(data: CarritoDetalleBase, db: Session = Depends(get_db)):
    if(data.id_carrito!=null):
        libro = db.query(Detallecarrito).filter(
            Detallecarrito.id_book == data.id_book,
            Detallecarrito.id_carrito==data.id_carrito
        ).first()

        print("Libro: ", libro)

        if not libro:
            raise HTTPException(
                status_code=404,
                detail="Libro no encontrado"
            )

        libro.cantidad = data.cantidad

        db.commit()
        db.refresh(libro)

        return libro

@app.post("/auth/register") 
def registrar_usuario( data: RegisterRequest, db: Session = Depends(get_db) ):
    if not data.nombre or not data.email or not data.password: 
        raise HTTPException( status_code=400, detail="Todos los campos son obligatorios" ) 
    
    usuario_existente = db.query(Usuarios).filter( Usuarios.email == data.email ).first() 
    if usuario_existente: 
        raise HTTPException( status_code=400, detail="El correo ya está registrado" ) 
    
    usuario = Usuarios( 
        nombre_user=data.nombre, 
        email=data.email, 
        password=data.password, 
        rol="user" 
    ) 

    db.add(usuario) 
    db.commit() 
    db.refresh(usuario) 

    return {
            "success": True,
            "message": "Usuario registrado correctamente",
            "usuario": {
                "id_user": usuario.id_user,
                "nombre": usuario.nombre_user,
                "email": usuario.email,
                "rol": usuario.rol
            }
    }


@app.post("/auth/login")
def iniciar_sesion(data: LoginRequest, db: Session = Depends(get_db)):

    if not data.email or not data.password:
        raise HTTPException(
            status_code=400,
            detail="Correo y contraseña son obligatorios"
        )

    usuario = db.query(Usuarios).filter(
        Usuarios.email == data.email,
        Usuarios.password == data.password
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    return {
        "success": True,
        "message": "Inicio de sesión correcto",
        "usuario": {
            "id_user": usuario.id_user,
            "nombre": usuario.nombre_user,
            "email": usuario.email,
            "rol": usuario.rol
        }
    }

@app.post("/ordenes")
def crear_orden(data: OrdenCreate, db: Session = Depends(get_db)):
    try:
        usuario = db.query(Usuarios).filter(Usuarios.id_user == data.id_user).first()

        if not usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        ids = [item.id_book for item in data.libros]

        if len(ids) != len(set(ids)):
            raise HTTPException(status_code=400, detail="Hay libros duplicados en la orden")

        detalles = []
        total = Decimal("0.00")

        for item in data.libros:
            libro = db.query(Libros).filter(Libros.id_book == item.id_book).first()

            if not libro:
                raise HTTPException(status_code=404, detail=f"No existe el libro {item.id_book}")

            precio = Decimal(str(libro.precio))
            subtotal_libro = precio * item.cantidad
            total += subtotal_libro

            detalles.append({
                "id_book": libro.id_book,
                "cantidad": item.cantidad,
                "precio_libro": precio,
                "subtotal": subtotal_libro
            })

        orden = Orden(
            id_user=data.id_user,
            fecha=date.today(),
            total=total,
            status="Pendiente de pago"
        )

        db.add(orden)
        db.flush()

        for detalle in detalles:
            db.add(Detalleorden(
                id_orden=orden.id_orden,
                id_book=detalle["id_book"],
                cantidad=detalle["cantidad"],
                precio_libro=detalle["precio_libro"],
                subtotal=detalle["subtotal"]
            ))

        db.commit()
        db.refresh(orden)

        return {
            "mensaje": "Orden de compra creada correctamente",
            "id_orden": orden.id_orden,
            "total": float(orden.total),
            "status": orden.status
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as e:
        db.rollback()
        print(f"ERROR REAL AL CREAR ORDEN: {repr(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )