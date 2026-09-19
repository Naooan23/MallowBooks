from typing import Optional
import datetime
import decimal

from sqlalchemy import Date, ForeignKeyConstraint, Integer, Numeric, PrimaryKeyConstraint, String, Text, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class Categoria(Base):
    __tablename__ = 'categoria'
    __table_args__ = (
        PrimaryKeyConstraint('id_categoria', name='categoria_pkey'),
    )

    id_categoria: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre_categoria: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[Optional[str]] = mapped_column(String(100))

    libros: Mapped[list['Libros']] = relationship('Libros', back_populates='categoria')


class Usuarios(Base):
    __tablename__ = 'usuarios'
    __table_args__ = (
        PrimaryKeyConstraint('id_user', name='usuarios_pkey'),
        UniqueConstraint('email', name='usuarios_email_key')
    )

    id_user: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre_user: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(150), nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    rol: Mapped[str] = mapped_column(String(20), nullable=False)

    orden: Mapped[list['Orden']] = relationship('Orden', back_populates='usuarios')


class Libros(Base):
    __tablename__ = 'libros'
    __table_args__ = (
        ForeignKeyConstraint(['id_categoria'], ['categoria.id_categoria'], name='fk_libro_categoria'),
        PrimaryKeyConstraint('id_book', name='libros_pkey')
    )

    id_book: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    titulo: Mapped[str] = mapped_column(String(200), nullable=False)
    id_categoria: Mapped[Optional[int]] = mapped_column(Integer)
    autor: Mapped[Optional[str]] = mapped_column(String(100))
    sinopsis: Mapped[Optional[str]] = mapped_column(Text)
    portada_url: Mapped[Optional[str]] = mapped_column(String(500))
    fecha_publicacion: Mapped[Optional[datetime.date]] = mapped_column(Date)
    status: Mapped[Optional[str]] = mapped_column(String(100))
    precio: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(10, 2))
    stock: Mapped[Optional[int]] = mapped_column(Integer)

    categoria: Mapped[Optional['Categoria']] = relationship('Categoria', back_populates='libros')
    detalleorden: Mapped[list['Detalleorden']] = relationship('Detalleorden', back_populates='libros')


class Orden(Base):
    __tablename__ = 'orden'
    __table_args__ = (
        ForeignKeyConstraint(['id_user'], ['usuarios.id_user'], name='fk_orden_user'),
        PrimaryKeyConstraint('id_orden', name='orden_pkey')
    )

    id_orden: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    id_user: Mapped[int] = mapped_column(Integer, nullable=False)
    fecha: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    total: Mapped[decimal.Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(100), nullable=False)

    usuarios: Mapped['Usuarios'] = relationship('Usuarios', back_populates='orden')
    detalleorden: Mapped[list['Detalleorden']] = relationship('Detalleorden', back_populates='orden')


class Detalleorden(Base):
    __tablename__ = 'detalleorden'
    __table_args__ = (
        ForeignKeyConstraint(['id_book'], ['libros.id_book'], name='fk_detalle_libros'),
        ForeignKeyConstraint(['id_orden'], ['orden.id_orden'], name='fk_detalle_orden'),
        PrimaryKeyConstraint('id_detalle', name='detalleorden_pkey')
    )

    id_detalle: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    id_orden: Mapped[int] = mapped_column(Integer, nullable=False)
    id_book: Mapped[int] = mapped_column(Integer, nullable=False)
    cantidad: Mapped[int] = mapped_column(Integer, nullable=False)
    precio_libro: Mapped[decimal.Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    subtotal: Mapped[decimal.Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    libros: Mapped['Libros'] = relationship('Libros', back_populates='detalleorden')
    orden: Mapped['Orden'] = relationship('Orden', back_populates='detalleorden')
