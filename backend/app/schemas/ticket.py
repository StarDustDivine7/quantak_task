from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional
from app.models.ticket import Priority, Status
import re


class TicketBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=2000)
    email: str = Field(..., max_length=255)
    priority: Priority = Priority.MEDIUM
    status: Status = Status.OPEN

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    status: Optional[Status] = None
    priority: Optional[Priority] = None


class TicketResponse(TicketBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TicketListResponse(BaseModel):
    tickets: list[TicketResponse]
    total: int
    page: int
    page_size: int


class TicketSummary(BaseModel):
    total: int
    open: int
    in_progress: int
    resolved: int
