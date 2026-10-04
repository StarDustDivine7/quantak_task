from app.database.database import SessionLocal, engine, Base
from app.models.ticket import Ticket, Priority, Status
import random

Base.metadata.create_all(bind=engine)

db = SessionLocal()

titles = [
    "Login page not loading",
    "Payment gateway timeout",
    "Dashboard charts not displaying",
    "Email notifications not sending",
    "User profile update failing",
    "Search results incorrect",
    "Mobile app crashes on startup",
    "API rate limiting too strict",
    "File upload size limit issue",
    "Password reset not working",
    "Two-factor authentication problems",
    "Session timeout too short",
    "Export to PDF failing",
    "Calendar sync issues",
    "Chat messages not delivering",
    "Performance degradation",
    "Database connection errors",
    "SSL certificate warning",
    "CORS policy blocking requests",
    "Memory leak in background jobs",
    "WebSocket connection drops",
    "Image compression quality",
    "Bulk import functionality",
    "Audit trail missing entries",
    "Permission denied errors",
    "Cache invalidation problems",
    "Third-party integration errors",
    "Language translation issues",
    "Dark mode not saving",
    "Keyboard navigation broken",
    "Screen reader accessibility"
]

descriptions = [
    "Users are unable to access the login page. The page loads indefinitely without showing any error messages.",
    "Payment transactions are timing out during the processing phase. Customers are being charged but orders are not completed.",
    "The dashboard analytics charts are not rendering properly. Data is loading but visualizations remain blank.",
    "Transactional emails are not being delivered to users. No bounce messages are received.",
    "When users attempt to update their profile information, changes are not being saved to the database.",
    "Search functionality is returning irrelevant results. The search algorithm needs to be reviewed.",
    "The mobile application crashes immediately upon launch on iOS devices. Android version works fine.",
    "API requests are being rate limited too aggressively. Legitimate traffic is being blocked.",
    "Users cannot upload files larger than 5MB. The limit needs to be increased for enterprise customers.",
    "Password reset emails are not being sent. Users are locked out of their accounts.",
    "Two-factor authentication codes are not being accepted even when entered correctly.",
    "Users are being logged out too frequently. The session timeout needs to be extended.",
    "The export to PDF feature is generating corrupted files. The output is unreadable.",
    "Calendar events are not syncing with external calendar services like Google Calendar.",
    "Chat messages are not being delivered between users in real-time. There's a significant delay.",
    "Application performance has degraded significantly over the past week. Response times have tripled.",
    "Database connection pool is exhausted during peak hours. New connections are being rejected.",
    "SSL certificate is showing as expired in some browsers. HTTPS connections are being blocked.",
    "CORS policy is preventing legitimate API calls from the frontend. Requests are being blocked.",
    "Background job processing is consuming excessive memory. The server is running out of RAM.",
    "WebSocket connections are dropping unexpectedly after a few minutes of inactivity.",
    "Image compression is reducing quality too much. Images are pixelated after upload.",
    "Bulk import of CSV files is failing. The process times out after processing a few records.",
    "Audit trail is missing entries for critical operations. Compliance requirements are not being met.",
    "Users are getting permission denied errors when accessing resources they should have access to.",
    "Cache is not being invalidated properly. Stale data is being served to users.",
    "Integration with third-party payment processor is failing. Webhook callbacks are not being received.",
    "Language translation is not working correctly for some languages. Text is not being translated.",
    "Dark mode preference is not being saved. Users have to re-enable it on every visit.",
    "Keyboard navigation is broken throughout the application. Tab order is incorrect.",
    "Screen reader is not reading content correctly. Accessibility compliance is required."
]

emails = [
    "john.doe@example.com",
    "jane.smith@company.com",
    "mike.wilson@startup.io",
    "sarah.jones@enterprise.org",
    "david.brown@tech.co",
    "emily.davis@agency.net",
    "chris.miller@firm.com",
    "lisa.anderson@corp.com",
    "robert.taylor@business.io",
    "amanda.white@startup.org",
    "james.martin@tech.co",
    "jennifer.thomas@agency.net",
    "william.jackson@firm.com",
    "patricia.harris@corp.com",
    "michael.clark@business.io",
    "linda.lewis@startup.org",
    "richard.walker@tech.co",
    "barbara.hall@agency.net",
    "charles.allen@firm.com",
    "sandra.young@corp.com",
    "joseph.wright@business.io",
    "nancy.king@startup.org",
    "thomas.scott@tech.co",
    "rachel.green@agency.net",
    "christopher.baker@firm.com",
    "daniel.adams@corp.com",
    "matthew.nelson@business.io",
    "lauren.hill@startup.org",
    "joshua.moore@tech.co",
    "stephanie.floyd@agency.net"
]

priorities = [Priority.LOW, Priority.MEDIUM, Priority.HIGH]
statuses = [Status.OPEN, Status.IN_PROGRESS, Status.RESOLVED]

for i in range(30):
    ticket = Ticket(
        title=random.choice(titles),
        description=random.choice(descriptions),
        email=random.choice(emails),
        priority=random.choice(priorities),
        status=random.choice(statuses)
    )
    db.add(ticket)

db.commit()
db.close()

print(f"Successfully seeded 30 tickets")
