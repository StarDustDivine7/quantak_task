from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.routers import tickets

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Support Ticket Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets.router)


@app.get("/")
def health_check():
    return {"status": "healthy", "message": "Support Ticket Dashboard API"}
