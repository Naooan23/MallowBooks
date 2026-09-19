from datetime import date
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict


class LibroBase(BaseModel):
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

class UsuarioBase(BaseModel):
    id_user: int
    nombre_user: str
    email: str
    password: str
    rol: str


class RegisterRequest(BaseModel):
    nombre_usuario: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str
