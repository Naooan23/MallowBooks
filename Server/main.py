from re import I
from fastapi import FastAPI, HTTPException
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Libros, Usuarios, Categoria
from schemas import LibroBase, LibroResponse, LoginRequest, RegisterRequest

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
    libros = db.query(Libros).all()

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


@app.put("/libros/{id_book}", response_model=LibroResponse)
def actualizar_libro(id_book: int, data: LibroBase, db: Session = Depends(get_db)):
    libro = db.query(Libros).filter(
        Libros.id_book == id_book
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

    return libro


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


@app.get("/categorias")
def obtener_categorias(db: Session = Depends(get_db)):
    categorias = db.query(Categoria).all()

    return categorias


@app.post("/auth/register") 
def registrar_usuario( data: RegisterRequest, db: Session = Depends(get_db) ):
    # print(data)
    if not data.nombre_usuario or not data.email or not data.password: 
        raise HTTPException( status_code=400, detail="Todos los campos son obligatorios" ) 
    
    usuario_existente = db.query(Usuarios).filter( Usuarios.email == data.email ).first() 
    if usuario_existente: 
        raise HTTPException( status_code=400, detail="El correo ya está registrado" ) 
    
    usuario = Usuarios( 
        nombre_user=data.nombre_usuario, 
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
                "nombre_usuario": usuario.nombre_user,
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
        Usuarios.email == data.email
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
            "nombre_usuario": usuario.nombre_user,
            "email": usuario.email,
            "rol": usuario.rol
        }
    }