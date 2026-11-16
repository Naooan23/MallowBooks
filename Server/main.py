from datetime import date, datetime
from auth import create_access_token, get_password_hash, require_admin, verify_password
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
from sqlalchemy import desc, asc, null, func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from models import Carrito, Detallecarrito, Detalleorden, Libros, Orden, Usuarios, Categoria
from schemas import LibroBase, CarritoBase, LibroResponse, LoginRequest, RegisterRequest, CarritoDetalleResponse, CarritoDetalleBase, OrdenCreate, PasswordData, UserData, UsuarioBase
from decimal import Decimal
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:80",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/libros", response_model=list[LibroResponse])
def obtener_libros( db: Session = Depends(get_db)):
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
def crear_libro(data: LibroBase,  _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    fecha_pub = data.fecha_publicacion or date.today()

    libro = Libros(
        id_categoria=data.id_categoria,
        titulo=data.titulo,
        autor=data.autor,
        sinopsis=data.sinopsis,
        portada_url=data.portada_url,
        fecha_publicacion=fecha_pub,
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

    datos = data.model_dump(exclude_unset=True)

    for campo, valor in datos.items():
        if campo != "id_book":
            setattr(libro, campo, valor)

    db.commit()
    db.refresh(libro)

    return {
        "success": True,
        "message": "Libro actualizado correctamente",
        "id_book": libro.id_book
    }

@app.delete("/libros/{id_book}")
def eliminar_libro(id_book: int, _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):

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
        "success": True,
        "message": "Libro eliminado correctamente"
    }

@app.get("/usuarios")
def obtener_usuarios( _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    usuarios = db.query(Usuarios).all()

    return [
        {
            "id_user": usuario.id_user,
            "nombre": usuario.nombre_user,
            "email": usuario.email,
            "password": usuario.password,
            "rol": usuario.rol,
        }
        for usuario in usuarios
    ]

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

    user.password = get_password_hash(data.new_Password)

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

@app.get("/ultOrden/{id_user}")
def obtener_Ultima_Orden(id_user: int, db: Session = Depends(get_db)):
    orden = db.query(Orden).filter(Orden.id_user == id_user).order_by(desc(Orden.id_orden)).first()

    if not orden:
        return None

    detalles = (
        db.query(Detalleorden)
        .filter(Detalleorden.id_orden == orden.id_orden)
        .all()
    )

    usuario=db.query(Usuarios).filter(Usuarios.id_user==orden.id_user).first()

    libros_response = []

    for detalle in detalles:
        libro = (
            db.query(Libros)
            .filter(Libros.id_book == detalle.id_book)
            .first()
        )

        if libro:
            libros_response.append({
                "id_book": libro.id_book,
                "titulo": libro.titulo,
                "autor": libro.autor,
                "precio": libro.precio,
                "cantidad": detalle.cantidad,
                "subtotal": libro.precio * detalle.cantidad
            })

    return {
        "orden": {
            "id_orden": orden.id_orden,
            "total": orden.total,
            "status": orden.status
        },
        "libros": libros_response,
        "cliente": usuario.nombre_user,
        "email": usuario.email,
        "fecha": orden.fecha.isoformat()
    }

@app.get("/ordenes/todas")
def obtener_todas_las_ordenes(db: Session = Depends(get_db)):
    ordenes = db.query(Orden).order_by(Orden.id_orden.desc()).all()
    
    respuesta = []

    for orden in ordenes:
        usuario = db.query(Usuarios).filter(Usuarios.id_user == orden.id_user).first()
        detalles = db.query(Detalleorden).filter(Detalleorden.id_orden == orden.id_orden).all()
        
        libros_response = []
        total_articulo = 0

        for detalle in detalles:
            libro = db.query(Libros).filter(Libros.id_book == detalle.id_book).first()
            if libro:
                subtotal = libro.precio * detalle.cantidad
                libros_response.append({
                    "id_book": libro.id_book,
                    "titulo": libro.titulo,
                    "autor": libro.autor,
                    "precio": libro.precio,
                    "cantidad": detalle.cantidad,
                    "subtotal": subtotal
                })
                total_articulo += detalle.cantidad

        respuesta.append({
            "orden": {
                "id_orden": orden.id_orden,
                "total": orden.total,
                "status": orden.status
            },
            "libros": libros_response,
            "cliente": usuario.nombre_user if usuario else "Usuario eliminado",
            "email": usuario.email if usuario else "Sin correo",
            "fecha": orden.fecha.isoformat(),
            "totalArticulo": total_articulo,
            "totalPrecio": orden.total
        })

    return respuesta

@app.get("/ordenes/{id_user}")
def obtener_Ordenes(id_user: int, db: Session = Depends(get_db)):

    ordenes = (
        db.query(Orden)
        .filter(Orden.id_user == id_user)
        .order_by(Orden.id_orden)
        .all()
    )

    if not ordenes:
        return []

    usuario = (
        db.query(Usuarios)
        .filter(Usuarios.id_user == id_user)
        .first()
    )

    if not usuario:
        return []

    respuesta = []

    for orden in ordenes:

        detalles = (
            db.query(Detalleorden)
            .filter(Detalleorden.id_orden == orden.id_orden)
            .all()
        )

        libros_response = []
        total_articulo = 0

        for detalle in detalles:

            libro = (
                db.query(Libros)
                .filter(Libros.id_book == detalle.id_book)
                .first()
            )

            if libro:
                subtotal = libro.precio * detalle.cantidad

                libros_response.append({
                    "id_book": libro.id_book,
                    "titulo": libro.titulo,
                    "autor": libro.autor,
                    "precio": libro.precio,
                    "cantidad": detalle.cantidad,
                    "subtotal": subtotal
                })

                total_articulo += detalle.cantidad

        respuesta.append({
            "orden": {
                "id_orden": orden.id_orden,
                "total": orden.total,
                "status": orden.status
            },
            "libros": libros_response,
            "cliente": usuario.nombre_user,
            "email": usuario.email,
            "fecha": orden.fecha.isoformat(),
            "totalArticulo": total_articulo,
            "totalPrecio": orden.total
        })

    return respuesta

class EstadoUpdate(BaseModel):
    status: str

@app.put("/ordenes/{id_orden}/status")
def actualizar_estado_orden(id_orden: int, data: EstadoUpdate, db: Session = Depends(get_db)):
    orden = db.query(Orden).filter(Orden.id_orden == id_orden).first()

    if not orden:
        raise HTTPException(status_code=404, detail="Orden no encontrada")

    orden.status = data.status
    
    try:
        db.commit()
        db.refresh(orden)
        return {"mensaje": "Estado actualizado correctamente", "status": orden.status}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sistRecomendaciones/{id_user}")
def sistema_recomendacion(id_user: int, db: Session = Depends(get_db)):
    ordenes = db.query(Orden).filter(Orden.id_user == id_user).all()

    ids_orden = [o.id_orden for o in ordenes]

    detalles = db.query(Detalleorden).filter(Detalleorden.id_orden.in_(ids_orden)).all()

    libros_comprados = [d.id_book for d in detalles]

    if not libros_comprados:
        return []

    categorias = db.query(Libros.id_categoria).filter(Libros.id_book.in_(libros_comprados)).distinct().all()

    categorias = [c[0] for c in categorias]

    recomendaciones = db.query(Libros).filter(Libros.id_categoria.in_(categorias),~Libros.id_book.in_(libros_comprados)).limit(10).all()

    return recomendaciones

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

@app.post("/librosCarrito", response_model=CarritoDetalleResponse, status_code=201)
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
        password=get_password_hash(data.password),
        rol="user"
    )

    token = create_access_token({
        "id_user": usuario.id_user,
        "rol": usuario.rol
    })

    db.add(usuario) 
    db.commit() 
    db.refresh(usuario) 

    return {
            "success": True,
            "token": token,
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

    print("Enviado:", data)

    usuario = db.query(Usuarios).filter(
        Usuarios.email == data.email
    ).first()

    print("Enviado:", data)
    print("Email recibido:", repr(data.email))

    usuario = db.query(Usuarios).filter(
        Usuarios.email == data.email
    ).first()

    print("Usuario:", usuario)

    print("Guardado:", usuario.password)

    if not verify_password(data.password, usuario.password):
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    token = create_access_token({
        "id_user": usuario.id_user,
        "rol": usuario.rol
    })

    return {
        "success": True,
        "token": token,
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
            status="Pendiente"
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

@app.post("/usuarios", status_code=201)
def crear_usuario(data: UsuarioBase, _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    try:
        usuario = Usuarios(
            nombre_user=data.nombre,
            email=data.email,
            password=get_password_hash(data.password),
            rol=data.rol,
        )

        db.add(usuario)
        db.commit()

        db.refresh(usuario)

    except Exception as e:
        db.rollback()
        print("ERROR AL REGISTRAR:", repr(e))
        raise

@app.put("/usuarios")
def actualizar_usuario(data: UsuarioBase, _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    usuario = db.query(Usuarios).filter(
        Usuarios.id_user == data.id_user
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    usuario.nombre_user = data.nombre
    usuario.email = data.email
    usuario.password = data.password
    usuario.rol = data.rol

    db.commit()
    db.refresh(usuario)

    return usuario

@app.delete("/usuarios/{id_user}")
def eliminar_usuario(id_user: int, _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    usuario = db.query(Usuarios).filter(
        Usuarios.id_user == id_user
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    db.delete(usuario)
    db.commit()

    return {
        "success": True,
        "message": "Usuario eliminado correctamente"
    }

@app.get("/dashboardCardsInfo")
def get_Admin_Info_Cards( _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    totalUsuarios = db.query(Usuarios).filter(Usuarios.rol=="user").count()
    totalPedidos = db.query(Orden).filter(Orden.status!=["pendiente", "cancelado"]).count()
    totalLibros = db.query(Libros).count()
    totalempleados = db.query(Usuarios).filter(Usuarios.rol!="user").count()

    return{
        "totalUsuarios": totalUsuarios,
        "totalPedidos": totalPedidos,
        "totalLibros": totalLibros,
        "totalempleados": totalempleados
    }

@app.get("/libros+")
def libros_mas_vendidos(db: Session = Depends(get_db)):
    total_ventas = (
        db.query(func.sum(Orden.total))
        .scalar()
    ) or 0

    total_ordenes = db.query(Orden).count()

    libros_mas_vendidos = (
        db.query(
            Libros.titulo,
            func.sum(Detalleorden.cantidad).label("vendidos")
        )
        .join(Detalleorden)
        .group_by(Libros.id_book, Libros.titulo)
        .order_by(func.sum(Detalleorden.cantidad).desc())
        .limit(5)
        .all()
    )

    ventas_por_categoria = (
        db.query(
            Categoria.nombre_categoria_es,
            func.sum(Detalleorden.cantidad).label("cantidad")
        )
        .join(Libros, Categoria.id_categoria == Libros.id_categoria)
        .join(Detalleorden, Libros.id_book == Detalleorden.id_book)
        .group_by(Categoria.id_categoria, Categoria.nombre_categoria_es)
        .all()
    )

    total_libros_vendidos = sum(
        int(categoria.cantidad)
        for categoria in ventas_por_categoria
    )

    categorias = [
        {
            "nombre": categoria.nombre_categoria_es,
            "cantidad": int(categoria.cantidad),
        }
        for categoria in ventas_por_categoria
    ]

    return {
        "totalVentas": float(total_ventas),
        "totalOrdenes": total_ordenes,
        "totalLibrosVendidos": total_libros_vendidos,
        "categorias": categorias,
        "librosMasVendidos": [
            {
                "titulo": libro.titulo,
                "vendidos": int(libro.vendidos)
            }
            for libro in libros_mas_vendidos
        ]
    }

@app.get("/ActividadTienda")
def actividad_tienda( _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    return {
        "pendientes": db.query(Orden).filter(Orden.status == "Pendiente")
            .count(),
        "completados": db.query(Orden).filter(Orden.status == "Pagado")
            .count(),
        "cancelados": db.query(Orden).filter(Orden.status == "Cancelado")
            .count(),
    }

@app.get("/InventarioBajo")
def get_inventarioBajo( _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    pocos_libros = db.query(Libros).filter(Libros.stock < 10).order_by(asc(Libros.stock)).all()

    return [
        {
            "portada_url": libro.portada_url,
            "titulo": libro.titulo,
            "cantidad": libro.stock
        }
        for libro in pocos_libros
    ]

@app.get("/PedidosRecientes")
def get_Pedidos_Recientes( _: Usuarios = Depends(require_admin), db: Session = Depends(get_db)):
    ultimosPedidos = db.query(Orden).order_by(desc(Orden.fecha)).limit(10).all()

    return [
        {
            "num": pedido.id_orden,
            "usuario": db.query(Usuarios).filter(Usuarios.id_user == pedido.id_user).first().nombre_user,
            "fecha": pedido.fecha,
            "status": pedido.status,
        }
        for pedido in ultimosPedidos
    ]