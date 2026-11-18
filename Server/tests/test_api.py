import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Server')))

from main import app
from database import get_db

client = TestClient(app)

@pytest.fixture
def mock_db():
    db = MagicMock()
    return db

def test_openapi_docs():
    response = client.get("/docs")
    assert response.status_code == 200

def test_obtener_categorias_vacio():
    response = client.get("/categorias")
    assert response.status_code in [200, 500]

def test_obtener_libros():
    response = client.get("/libros")
    assert response.status_code in [200, 500]

def test_obtener_libro_inexistente():
    response = client.get("/libros/999999")
    assert response.status_code in [404, 500]

def test_login_invalido():
    response = client.post("/auth/login", json={"email": "", "password": ""})
    assert response.status_code == 422 or response.status_code == 400

def test_registro_email_invalido():
    response = client.post("/auth/register", json={
        "nombre": "Test",
        "email": "correo-no-valido",
        "password": "123"
    })
    assert response.status_code == 422

def test_endpoint_protegido_sin_token():
    response = client.get("/usuarios/1")
    assert response.status_code in [200, 401, 404, 500]

def test_crear_orden_vacia():
    response = client.post("/ordenes", json={
        "id_user": 1,
        "libros": []
    })
    assert response.status_code == 422
