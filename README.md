# CRM-app

## Project Overview
This is a full-stack CRM (Customer Relationship Management) Lead Management System built for a small sales team.

It allows users to manage sales leads, track their progress through a sales pipeline, add internal notes, and view a dashboard with key business insights.

The system helps sales teams organize leads, monitor deal progress, and improve workflow efficiency.

---

## Tech Stack Used

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- MongoDB
- Mongoose ODM

---

## Features Implemented

### Authentication
- Login system using JWT
- Protected routes (only logged-in users can access CRM)

### Lead Management (CRUD)
- Create leads
- View all leads
- Update leads
- Delete leads
- View lead details
- Update lead status

### Sales Pipeline
- Lead status tracking:
  - New
  - Contacted
  - Qualified
  - Proposal Sent
  - Won
  - Lost
- Status can be updated dynamically

### Lead Notes
- Add notes to each lead
- View notes history per lead
- Notes include creator and timestamp

### Dashboard
- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Deal Value
- Total Won Deal Value

### Search and Filtering
- Filter by:
  - Status
  - Lead Source
  - Assigned Salesperson
- Search by:
  - Lead Name
  - Company Name
  - Email

---

## How to Run Locally

### Backend Setup
cd backend
npm install
npm run dev

Make sure backend is running on port 5000 before starting frontend.

### Frontend Setup
cd frontend
npm install
npm run dev

---

## Environment Variables

Create a .env file in the backend folder:

MONGO_URI=mongodb+srv://aadmin:T8STM7fVXRfLYQ7I@cluster0.psqrkud.mongodb.net/crmDB

JWT_SECRET=mysecretkey123@

---

## Test Login Credentials

Email: admin@example.com  
Password: password123

---

## Database Setup

This project uses MongoDB as the database.

### Collections

#### Leads Collection
Stores all lead information:
- leadName
- companyName
- email
- phoneNumber
- leadSource
- assignedSalesperson
- status
- dealValue
- createdAt
- updatedAt

#### Notes Collection
Stores notes related to leads:
- leadId (reference to Lead)
- noteContent
- createdBy
- createdAt

MongoDB connection is handled using Mongoose.

---

## Known Limitations

- No role-based access control (only single admin user)
- No email notifications
- No advanced analytics charts
- No real-time updates
- Project runs locally only (not deployed)

---

## Reflection

This project helped me understand what a CRM system is and how it works in real-world business environments.

I learned how companies manage leads, track customer progress through a sales pipeline, store interactions using notes, and use dashboards to monitor sales performance and decision-making.

I also improved my ability to design and build a structured full-stack application that follows a real business workflow.

Gained experience in:
- Building CRUD applications
- Connecting frontend and backend
- Designing a CRM workflow
- Managing state in React
- Structuring a full-stack project

Overall, this project improved my understanding of real-world application development and backend integration.