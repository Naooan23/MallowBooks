from datetime import date
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, EmailStr

class CarritoBase(BaseModel):
    id_user: int

class LibroBase(BaseModel):
    id_book: Optional[int] = None
    id_categoria: Optional[int] = None
    titulo: str
    autor: Optional[str] = None
    sinopsis: Optional[str] = None
    portada_url: Optional[str] = None
    fecha_publicacion: Optional[date] = None
    status: Optional[str] = None
    precio: Optional[Decimal] = None
    stock: Optional[int] = None
    
class LibroResponse(LibroBase):
    id_book: int

    model_config = ConfigDict(from_attributes=True)

class CarritoResponse(BaseModel):
    id_carrito: int
    id_user: int
    fecha_creacion: date

    model_config = ConfigDict(from_attributes=True)
    
class CarritoDetalleResponse(BaseModel):
    id_detalle: int
    id_carrito: int
    id_book: int
    cantidad: int

    model_config = ConfigDict(from_attributes=True)

class CarritoDetalleBase(BaseModel):
    id_carrito: Optional[int] = None
    id_book: int
    cantidad: int

    model_config = ConfigDict(from_attributes=True)

class UsuarioBase(BaseModel):
    id_user: int | None = None
    nombre: str
    email: str
    password: str
    rol: str

class UsuarioResponse(BaseModel):
    id_user: int
    nombre: str
    email: str
    rol: str

    model_config = ConfigDict(from_attributes=True)

class UsuarioPublico(BaseModel):
    id_user: int
    nombre_user: str
    email: str
    rol: str

    model_config = ConfigDict(from_attributes=True)

class RegisterRequest(BaseModel):
    nombre: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=4, max_length=100)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioResponse

class LibroOrdenCreate(BaseModel):
    id_book: int
    cantidad: int = Field(gt=0)

class OrdenCreate(BaseModel):
    id_user: int
    libros: list[LibroOrdenCreate] = Field(min_length=1)

class PasswordData(BaseModel):
    id_user: int
    new_Password: str = Field(min_length=4)

class UserData(BaseModel):
    id_user: int
    nombre: str
    email: EmailStr
