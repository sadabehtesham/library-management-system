# Library Management System

A full-stack library management application built with React + Vite on the frontend and Node.js + Express on the backend. It supports user authentication, book management, borrowing flows, admin operations, notifications, and account verification.

## Features

- User registration and login
- Email OTP / verification flow
- Password reset and forgot password flow
- Admin dashboard for library management
- Add, update, and view books
- Borrow and return book tracking
- User dashboard with borrowed books
- Fine calculation and dues tracking
- Notification system for users
- Cloudinary-based file upload support
- Redux-powered frontend state management

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Chart.js

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cookie-based auth
- Nodemailer
- Cloudinary

## Project Structure

```bash
library-management-system/
├── backend/
│   ├── package.json
│   ├── server/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── postman/
├── client/
│   ├── package.json
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── .gitignore
├── auto-sync.ps1
└── README.md
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or later)
- npm
- MongoDB running locally or on a MongoDB Atlas instance
- A Gmail account for SMTP email sending (if using email verification and reset flows)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sadabehtesham/library-management-system.git
cd library-management-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

## Environment Configuration

Create or update the backend environment file at:

```bash
backend/server/config/config.env
```

Use values like the following:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/library_db

SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=3d
COOKIE_EXPIRE=3

CLOUDINARY_CLIENT_NAME=your_cloud_name
CLOUDINARY_CLIENT_API=your_api_key
CLOUDINARY_CLIENT_SECRET=your_api_secret
```

> Use a real Gmail app password for SMTP and keep your secret values secure.

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend runs on:

```bash
http://localhost:4000
```

### Start the frontend

```bash
cd client
npm run dev
```

The frontend runs on:

```bash
http://localhost:5173
```

## Default Development Flow

1. Start MongoDB.
2. Start the backend server.
3. Start the frontend application.
4. Open the frontend in the browser.
5. Register a user or login as an admin/user depending on the setup.

## Notes

- This project contains both a backend API and a frontend UI in the same repository.
- The repo is already connected to GitHub and includes an auto-sync script for local backup and push automation.
- You can use the script at the project root:

```bash
powershell -ExecutionPolicy Bypass -File .\auto-sync.ps1
```

## License

This project is for educational and personal project use.

## Author

Sadab Ehtesham
