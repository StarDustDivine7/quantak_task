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


def test_update_ticket_status(client):
    # Create a ticket
    create_response = client.post("/api/tickets/", json={
        "title": "Test Ticket",
        "description": "Description",
        "email": "test@example.com",
        "priority": "high",
        "status": "open"
    })
    ticket_id = create_response.json()["id"]

    # Update the ticket
    update_response = client.patch(f"/api/tickets/{ticket_id}", json={
        "status": "resolved"
    })
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["status"] == "resolved"
    assert data["id"] == ticket_id


def test_update_ticket_priority(client):
    # Create a ticket
    create_response = client.post("/api/tickets/", json={
        "title": "Test Ticket",
        "description": "Description",
        "email": "test@example.com",
        "priority": "low",
        "status": "open"
    })
    ticket_id = create_response.json()["id"]

    # Update the ticket
    update_response = client.patch(f"/api/tickets/{ticket_id}", json={
        "priority": "high"
    })
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["priority"] == "high"


def test_update_ticket_not_found(client):
    response = client.patch("/api/tickets/99999", json={
        "status": "resolved"
    })
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_get_ticket_by_id(client):
    # Create a ticket
    create_response = client.post("/api/tickets/", json={
        "title": "Test Ticket",
        "description": "Description",
        "email": "test@example.com",
        "priority": "high",
        "status": "open"
    })
    ticket_id = create_response.json()["id"]

    # Get the ticket
    get_response = client.get(f"/api/tickets/{ticket_id}")
    assert get_response.status_code == 200
    data = get_response.json()
    assert data["id"] == ticket_id
    assert data["title"] == "Test Ticket"
