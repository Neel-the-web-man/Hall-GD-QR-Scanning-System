# Hostel QR Dinner System

A web-based system to manage attendance for the hostel’s grand dinner using unique QR codes for each boarder.

---

## Features

- Generate and email **unique QR codes** to all boarders.
- **QR scanning** for attendance verification.
- **Admin dashboard** to track scanned and eaten status.
- **JWT-based authentication** for admin access.
- MongoDB database for storing boarder and attendance data.

---

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas or local)
- **Email**: Nodemailer (Gmail SMTP)
- **Authentication**: JWT
- **QR Codes**: `qrcode` npm package

---

## Project Structure

hostel-qr-system/
├── backend/
│ ├── models/
│ │ ├── Boarder.js
│ │ └── Admin.js
│ ├── routes/
│ │ ├── admin.js
│ │ ├── scan.js
│ │ └── boarders.js
│ ├── middleware/
│ │ └── auth.js
│ ├── generateQR.js
│ ├── sendEmail.js
│ └── server.js
├── frontend/ (Vite + React)
├── .env
└── README.md


---

## Setup Instructions

### 1. Backend

1. Install dependencies:
```bash
cd backend
npm install

2. Create a .env file with:
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
EMAIL_USER=<your_gmail_address>
EMAIL_PASS=<your_gmail_app_password>
JWT_SECRET=<your_secret_key>

3.Create first admin:
node createAdmin.js

4.Start backend server:
node server.js

2. Frontend (React + Vite)

Navigate to frontend folder

cd frontend
npm install


Start dev server:

npm run dev

Usage

Admin logs in at /admin/login → receives JWT token.

QR codes are scanned at /scan → marks isScanned.

Admin dashboard /boarders → view boarders, mark hasEaten.

Notes

Gmail requires App Passwords if 2FA is enabled.

Ensure the backend server and frontend dev server are running on correct ports.
