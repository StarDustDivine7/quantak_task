# Support Ticket Dashboard

A full-stack support ticket management application with a FastAPI backend and React frontend.

## Features

- **Create Ticket**: Form with Title, Description, Email, Priority, and Status fields
- **Validation**: Frontend and backend validation with useful error messages
- **Ticket List**: Display all tickets in a responsive table
- **Search**: Search tickets by title or customer email
- **Filters**: Filter by Status (Open, In Progress, Resolved) and Priority (Low, Medium, High)
- **Sorting**: Sort by created date (Newest/Oldest)
- **Pagination**: Backend pagination with 10 tickets per page
- **Ticket Details**: View complete ticket details by clicking on a ticket
- **Update Ticket**: Change Status and Priority from the details page
- **Persistence**: SQLite database for persistent storage
- **Summary Cards**: Display Total, Open, In Progress, and Resolved ticket counts
- **Responsive UI**: Works on desktop and mobile devices
- **Loading States**: Loading indicators for async operations
- **Empty States**: Friendly messages when no tickets are found
- **Error Handling**: Clear error messages for API failures
- **API**: RESTful API with proper HTTP status codes and consistent error responses
- **Database**: Persistent SQLite database
- **Seed Data**: Pre-seeded with 30 sample tickets
- **Tests**: Automated backend tests with pytest

## Tech Stack

### Backend
- FastAPI - Modern Python web framework
- SQLAlchemy - SQL toolkit and ORM
- SQLite - Lightweight database
- Pydantic - Data validation
- Pytest - Testing framework

### Frontend
- React 18 - UI library
- Vite - Build tool and dev server
- React Router - Client-side routing
- Axios - HTTP client

## Project Structure

```
support-ticket-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── core/
│   │   │   └── config.py        # Configuration settings
│   │   ├── database/
│   │   │   └── database.py      # Database connection and session
│   │   ├── models/
│   │   │   └── ticket.py        # SQLAlchemy models
│   │   ├── schemas/
│   │   │   └── ticket.py        # Pydantic schemas
│   │   ├── routers/
│   │   │   └── tickets.py       # API endpoints
│   │   └── services/
│   │       └── ticket_service.py # Business logic
│   ├── tests/
│   │   ├── test_create_ticket.py
│   │   ├── test_ticket_query.py
│   │   └── test_ticket_update.py
│   ├── seed.py                  # Database seeding script
│   ├── requirements.txt         # Python dependencies
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   ├── App.jsx             # Main app component with routing
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── .env
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env .env
```

5. Seed the database with sample data:
```bash
python seed.py
```

6. Run the backend server:
```bash
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env .env
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running with Docker

1. Build and start all services:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Running Tests

### Backend Tests

Navigate to the backend directory and run:
```bash
cd backend
pytest
```

The test suite includes:
- `test_create_ticket.py`: Tests ticket creation and validation
- `test_ticket_query.py`: Tests ticket listing, search, and filters
- `test_ticket_update.py`: Tests ticket updates and retrieval

## API Endpoints

### Tickets

- `POST /api/tickets/` - Create a new ticket
- `GET /api/tickets/` - List tickets with pagination, search, filters, and sorting
- `GET /api/tickets/summary` - Get ticket summary statistics
- `GET /api/tickets/{id}` - Get a specific ticket by ID
- `PATCH /api/tickets/{id}` - Update ticket status or priority

### Query Parameters (for GET /api/tickets/)

- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 10, max: 100)
- `search` - Search by title or email
- `status` - Filter by status (open, in_progress, resolved)
- `priority` - Filter by priority (low, medium, high)
- `sort_by` - Sort field (default: created_at)
- `sort_order` - Sort order (asc or desc, default: desc)

## Environment Variables

### Backend (.env)
```
DATABASE_URL=sqlite:///./tickets.db
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Screenshots

The application includes screenshots in the `screenshots/` directory showing:
- Dashboard with summary cards and ticket list
- Create ticket form
- Ticket details page with update functionality

## AI Disclosure

This project was developed with assistance from AI (Cascade, powered by SWE-1.6). The AI helped with:

- **Code Generation**: Writing the initial code structure for both backend and frontend
- **Component Design**: Creating reusable React components with proper state management
- **API Design**: Designing RESTful API endpoints with proper validation
- **Database Schema**: Designing the SQLAlchemy models and relationships
- **Testing**: Writing automated test cases for the backend
- **Documentation**: Creating comprehensive documentation and setup instructions

The AI was used as a pair programming assistant to accelerate development while maintaining code quality. All code was reviewed and tested to ensure it meets the requirements.

## License

This project is open source and available for educational purposes.
