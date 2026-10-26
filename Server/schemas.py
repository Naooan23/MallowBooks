from datetime import date
from decimal import Decimal
import string
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import null

class CarritoBase(BaseModel):
    id_user: int

class LibroBase(BaseModel):
    id_book : int
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

class CarritoDetalleBase(BaseModel):
    id_carrito: Optional[int]
    id_book: int
    cantidad: int

class UsuarioBase(BaseModel):
    id_user: int
    nombre_user: str
    email: str
    password: str
    rol: str

class RegisterRequest(BaseModel):
    nombre: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class LibroOrdenCreate(BaseModel):
    id_book: int
    cantidad: int = Field(gt=0)


class OrdenCreate(BaseModel):
    id_user: int
    libros: list[LibroOrdenCreate] = Field(min_length=1)

class PasswordData(BaseModel):
    id_user: int
    new_Password: str

class UserData(BaseModel):
    id_user:int
    nombre:str
    email:str