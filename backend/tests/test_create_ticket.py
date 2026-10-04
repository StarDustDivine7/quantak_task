import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.database import Base, get_db
from app.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as test_client:
        yield test_client
    Base.metadata.drop_all(bind=engine)


def test_create_ticket_success(client):
    response = client.post("/api/tickets/", json={
        "title": "Test Ticket",
        "description": "This is a test ticket description",
        "email": "test@example.com",
        "priority": "high",
        "status": "open"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Ticket"
    assert data["email"] == "test@example.com"
    assert data["priority"] == "high"
    assert data["status"] == "open"
    assert "id" in data


def test_create_ticket_validation_error(client):
    response = client.post("/api/tickets/", json={
        "title": "",
        "description": "Test",
        "email": "invalid-email",
        "priority": "high"
    })
    assert response.status_code == 422
