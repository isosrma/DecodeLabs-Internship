# Cabin Booking System

A full-stack cabin reservation platform for managing cabins, guests, bookings, payments, and administrative operations. The project includes a React customer-facing application, an Express API, a PostgreSQL database managed with Prisma, and an older frontend prototype retained for reference.

## Features

### Guest experience

- Browse available cabins and inspect capacity, pricing, discounts, descriptions, and images.
- Select booking dates and guest counts.
- Create an account, sign in, verify an account with an OTP, and manage profile information.
- Submit reservations and view reservation details and status.
- Select payment options including Khalti and cash on delivery where enabled by the API.
- Upload profile or cabin images through Cloudinary-backed endpoints.

### Administration

- View dashboard information and operational summaries.
- Create, edit, and delete cabins.
- Review and manage reservations.
- Review payment records and payment status.
- Protect administrative routes with JWT authentication and role checks.

## Project Structure

```text
Cabin booking system/
├── Backend/                 # Express 5 API and Prisma database layer
│   ├── prisma/              # Schema and database migrations
│   └── src/
│       ├── controller/      # Authentication, cabin, booking, payment, dashboard logic
│       ├── middleware/      # Authentication, uploads, and request middleware
│       ├── routes/          # API route definitions
│       └── utils/           # Email, token, OTP, Cloudinary, and data helpers
├── frontend/                # Main React 19 + Vite application
│   └── src/
│       ├── components/      # Reusable interface components
│       ├── context/         # Authentication and reservation state
│       ├── layout/          # Public, profile, and admin layouts
│       ├── pages/           # Customer and admin screens
│       └── services/         # Query and mutation services
├── Frontendv1/              # Earlier React prototype and UI experiments
└── package.json             # Root workspace dependencies
```

## Technology Stack

- **Frontend:** React, React Router, Vite, Axios, React Hook Form, React Day Picker, Recharts, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, CORS, Multer, JWT, bcrypt, Nodemailer, Cloudinary
- **Database:** PostgreSQL
- **ORM and migrations:** Prisma
- **Payments:** Khalti integration and cash-on-delivery support

## Requirements

- Node.js 18 or newer
- npm
- A PostgreSQL database, such as Neon
- Cloudinary credentials for image upload features
- SMTP credentials for email and OTP features
- Khalti credentials for online payment features

## Environment Configuration

Create `Backend/.env` locally. Do not commit this file.

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
FRONTEND_URL="http://localhost:5173"
JWT_SECRET="replace-with-a-long-random-secret"

CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_SECRET="your-cloudinary-secret"

EMAIL="your-sender@example.com"
EMAIL_PASSWORD="your-smtp-or-app-password"

KHALTI_SECRET_KEY="your-khalti-secret"
```

The frontend reads the API URL from `frontend/.env` when provided:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Never publish real database passwords, JWT secrets, API keys, email passwords, or payment secrets. If a secret has been exposed, revoke and replace it before deploying.

## Installation

Install dependencies for the backend and the main frontend:

```bash
cd Backend
npm install
npx prisma generate
npx prisma migrate deploy

cd ../frontend
npm install
```

The repository already contains Prisma migrations. Use `npx prisma migrate deploy` for a deployment environment. For local schema development, use `npx prisma migrate dev` only when you intentionally want to create a new migration.

## Running the Application

Start the API in one terminal:

```bash
cd Backend
npm run dev
```

Start the main frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`. The API health endpoint is available at `http://localhost:5000/` and should return `Cabin Booking API is running`.

## API Overview

The API is versioned under `/api/v1`:

| Area | Base path | Purpose |
| --- | --- | --- |
| Authentication | `/api/v1/auth` | Registration, login, OTP verification, and profile operations |
| Cabins | `/api/v1/cabins` | Public cabin browsing and protected cabin administration |
| Bookings | `/api/v1/bookings` | Create, read, update, and manage reservations |
| Payments | `/api/v1/payments` | Payment creation and payment status handling |
| Dashboard | `/api/v1/dashboard` | Administrative summaries and dashboard data |

Protected requests use a bearer token:

```http
Authorization: Bearer <jwt-token>
```

## Database Models

- **User:** account details, role, contact information, OTP state, and reservations.
- **Cabin:** cabin name, capacity, price, discount, description, image, and reservations.
- **Booking:** dates, guests, pricing, breakfast choice, observations, status, user, and cabin.
- **Payment:** booking payment method, amount, status, transaction identifiers, and payment date.

## Useful Commands

### Backend

```bash
npm run dev                  # Start the API with Nodemon
npx prisma generate         # Generate the Prisma client
npx prisma migrate status   # Check migration state
npx prisma studio           # Browse the database locally
```

### Frontend

```bash
npm run dev                 # Start Vite development server
npm run build               # Create a production build
npm run lint                # Run ESLint
npm run preview             # Preview the production build
```

## Deployment Notes

1. Configure production environment variables in the hosting provider.
2. Run `npx prisma migrate deploy` against the production PostgreSQL database.
3. Set `FRONTEND_URL` to the deployed frontend origin so CORS accepts the frontend.
4. Set `VITE_API_BASE_URL` to the deployed API URL before building the frontend.
5. Configure Cloudinary, email, and Khalti credentials in the deployment environment.
6. Keep `.env` files, database credentials, and provider secrets outside version control.

## Current Status

The main frontend runs on Vite at port `5173`. The backend runs on port `5000` and uses the configured PostgreSQL database. The Prisma schema is represented by the migrations in `Backend/prisma/migrations`.