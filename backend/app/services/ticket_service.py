from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from typing import Optional, List
from app.models.ticket import Ticket, Priority, Status
from app.schemas.ticket import TicketCreate, TicketUpdate


class TicketService:
    def __init__(self, db: Session):
        self.db = db

    def create_ticket(self, ticket: TicketCreate) -> Ticket:
        db_ticket = Ticket(**ticket.model_dump())
        self.db.add(db_ticket)
        self.db.commit()
        self.db.refresh(db_ticket)
        return db_ticket

    def get_ticket(self, ticket_id: int) -> Optional[Ticket]:
        return self.db.query(Ticket).filter(Ticket.id == ticket_id).first()

    def get_tickets(
        self,
        skip: int = 0,
        limit: int = 10,
        search: Optional[str] = None,
        status: Optional[Status] = None,
        priority: Optional[Priority] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> tuple[List[Ticket], int]:
        query = self.db.query(Ticket)

        if search:
            query = query.filter(
                or_(
                    Ticket.title.ilike(f"%{search}%"),
                    Ticket.email.ilike(f"%{search}%")
                )
            )

        if status:
            query = query.filter(Ticket.status == status)

        if priority:
            query = query.filter(Ticket.priority == priority)

        total = query.count()

        if sort_order == "desc":
            query = query.order_by(desc(getattr(Ticket, sort_by)))
        else:
            query = query.order_by(asc(getattr(Ticket, sort_by)))

        tickets = query.offset(skip).limit(limit).all()
        return tickets, total

    def update_ticket(self, ticket_id: int, ticket_update: TicketUpdate) -> Optional[Ticket]:
        db_ticket = self.get_ticket(ticket_id)
        if not db_ticket:
            return None

        update_data = ticket_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_ticket, key, value)

        self.db.commit()
        self.db.refresh(db_ticket)
        return db_ticket

    def get_summary(self) -> dict:
        total = self.db.query(Ticket).count()
        open_count = self.db.query(Ticket).filter(Ticket.status == Status.OPEN).count()
        in_progress = self.db.query(Ticket).filter(Ticket.status == Status.IN_PROGRESS).count()
        resolved = self.db.query(Ticket).filter(Ticket.status == Status.RESOLVED).count()

        return {
            "total": total,
            "open": open_count,
            "in_progress": in_progress,
            "resolved": resolved
        }
