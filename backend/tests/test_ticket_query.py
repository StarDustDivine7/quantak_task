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


def test_get_tickets_pagination(client):
    # Create 15 tickets
    for i in range(15):
        client.post("/api/tickets/", json={
            "title": f"Ticket {i}",
            "description": f"Description {i}",
            "email": f"user{i}@example.com",
            "priority": "medium",
            "status": "open"
        })

    response = client.get("/api/tickets/?page=1&page_size=10")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 15
    assert len(data["tickets"]) == 10
    assert data["page"] == 1


def test_get_tickets_search(client):
    client.post("/api/tickets/", json={
        "title": "Login Issue",
        "description": "Cannot login",
        "email": "john@example.com",
        "priority": "high",
        "status": "open"
    })
    client.post("/api/tickets/", json={
        "title": "Payment Error",
        "description": "Payment failed",
        "email": "jane@example.com",
        "priority": "medium",
        "status": "open"
    })

    response = client.get("/api/tickets/?search=login")
    assert response.status_code == 200
    data = response.json()
    assert len(data["tickets"]) == 1
    assert "Login" in data["tickets"][0]["title"]


def test_get_tickets_filter_by_status(client):
    client.post("/api/tickets/", json={
        "title": "Ticket 1",
        "description": "Description",
        "email": "test@example.com",
        "priority": "high",
        "status": "open"
    })
    client.post("/api/tickets/", json={
        "title": "Ticket 2",
        "description": "Description",
        "email": "test@example.com",
        "priority": "medium",
        "status": "resolved"
    })

    response = client.get("/api/tickets/?status=open")
    assert response.status_code == 200
    data = response.json()
    assert all(ticket["status"] == "open" for ticket in data["tickets"])
