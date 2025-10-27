# Portfolio MERN Application

A full-stack portfolio application built with Node.js, Express, MongoDB, and React.

## Features

- RESTful API with CRUD operations
- JWT Authentication
- MongoDB database integration with Mongoose ODM
- User management with password encryption
- Contact, Project, and Qualification management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/Nisrin888/MyPortfolio.git
cd MyPortfolio
```

2. Install dependencies
```bash
npm install
cd client && npm install
```

3. Environment Setup
- Copy `.env.example` to `.env`
- Fill in your MongoDB URI and JWT secret

```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

From the client folder:
```bash
cd client
npm run dev
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend (Node.js): http://localhost:3000

## API Endpoints

### Authentication
- `POST /auth/signin` - User sign in
- `GET /auth/signout` - User sign out

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts/:id` - Get contact by ID
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `DELETE /api/contacts` - Delete all contacts

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `DELETE /api/projects` - Delete all projects

### Qualifications
- `GET /api/qualifications` - Get all qualifications
- `POST /api/qualifications` - Create qualification
- `GET /api/qualifications/:id` - Get qualification by ID
- `PUT /api/qualifications/:id` - Update qualification
- `DELETE /api/qualifications/:id` - Delete qualification
- `DELETE /api/qualifications` - Delete all qualifications

## Technologies Used

- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: React, Vite, TailwindCSS
- **Password Encryption**: crypto (SHA-1 with salt)


## Author

Nisrin Pakhrin

