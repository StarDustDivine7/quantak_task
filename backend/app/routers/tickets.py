from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database.database import get_db
from app.schemas.ticket import TicketCreate, TicketResponse, TicketUpdate, TicketListResponse, TicketSummary
from app.services.ticket_service import TicketService
from app.models.ticket import Status, Priority

router = APIRouter(prefix="/api/tickets", tags=["tickets"])


@router.post("/", response_model=TicketResponse, status_code=201)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    service = TicketService(db)
    return service.create_ticket(ticket)


@router.get("/", response_model=TicketListResponse)
def get_tickets(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    status: Optional[Status] = None,
    priority: Optional[Priority] = None,
    sort_by: str = Query("created_at"),
    sort_order: str = Query("desc", regex="^(asc|desc)$"),
    db: Session = Depends(get_db)
):
    service = TicketService(db)
    skip = (page - 1) * page_size
    tickets, total = service.get_tickets(
        skip=skip,
        limit=page_size,
        search=search,
        status=status,
        priority=priority,
        sort_by=sort_by,
        sort_order=sort_order
    )
    return TicketListResponse(
        tickets=tickets,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/summary", response_model=TicketSummary)
def get_summary(db: Session = Depends(get_db)):
    service = TicketService(db)
    return service.get_summary()


@router.get("/{ticket_id}", response_model=TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    service = TicketService(db)
    ticket = service.get_ticket(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@router.patch("/{ticket_id}", response_model=TicketResponse)
def update_ticket(ticket_id: int, ticket_update: TicketUpdate, db: Session = Depends(get_db)):
    service = TicketService(db)
    ticket = service.update_ticket(ticket_id, ticket_update)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket
