# Crampton LLC - Professional Cleaning Website

A premium full-stack cleaning company website built with FastAPI backend and React frontend.

## Project Structure

```
crampton/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application entry point
│   ├── core/               # Configuration, database, security
│   ├── models/             # SQLAlchemy database models
│   ├── schemas/            # Pydantic schemas for validation
│   ├── crud/               # CRUD operations
│   └── api/routes/         # API endpoints
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── Pages/          # Page components
│   │   └── services/       # API services
│   ├── vite.config.js
│   └── package.json
├── Dockerfile              # Backend Docker image
├── frontend/Dockerfile     # Frontend Docker image
└── docker-compose.yml      # Development deployment
```

## Features

### Frontend
- Responsive design with Tailwind CSS
- Modern UI with smooth transitions and scroll animations
- Pages: Home, About, Services, Booking, Testimonials, FAQ, Contact, Admin

### Backend
- FastAPI with JWT authentication
- SQLite/PostgreSQL database with SQLAlchemy ORM
- Protected admin routes
- CORS support for frontend integration

### Admin Dashboard
- Booking management
- Contact message management
- Secure login/logout

## Deployment

1. **Railway**: Uses `railway.json` for automatic deployment
2. **Docker**: Run `docker-compose up -d` for local development

## Environment Variables

Backend `.env`:
```
SECRET_KEY=your-secret-key
ADMIN_EMAIL=cramptonllc@proton.me
ADMIN_PASSWORD=your-secure-password
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Crampton <no-reply@cramptonllc.com>
RESEND_FROM_NAME=Crampton LLC
PUBLIC_SITE_URL=https://yourdomain.com
```

## Admin Bootstrap

Create or update the admin account:

```bash
python3 create_admin.py
```

The script will prompt for the admin email and password, hash the password, and store it in the configured database.

## Email Delivery

Resend needs:

1. A valid `RESEND_API_KEY`
2. A verified sending domain
3. A `RESEND_FROM_EMAIL` that uses that verified domain

Once your domain is verified, you can send from any address at that domain.
