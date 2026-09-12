# Student Course Management System

A full-stack web application for managing students, courses, faculty, programs, and student course attempts.

## Overview

The Student Course Management System provides a centralized platform for managing academic information.

The application consists of:

- React frontend
- Node.js and Express backend
- Microsoft SQL Server database
- REST APIs for communication between frontend and backend

## Features

### Student Management
- Add students
- View student details
- Update student information
- Manage student records

### Course Management
- Add courses
- View available courses
- Update course information
- Manage course records

### Faculty Management
- Add faculty members
- View faculty details
- Update faculty information
- Manage faculty records

### Program Management
- Add academic programs
- View program details
- Update program information
- Manage program records

### Course Attempts
- Record student course attempts
- View course attempt information
- Manage student-course records

### Dashboard

The application includes a dashboard for accessing the main sections of the Student Course Management System.

## Technology Stack

### Frontend

- React.js
- React Router
- Material UI
- Axios
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT
- CORS
- dotenv

### Database

- Microsoft SQL Server

## Project Structure

```text
Student Course Management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Faculty.js
│   │   ├── Program.js
│   │   ├── Student.js
│   │   └── StudentCourseAttempt.js
│   ├── routes/
│   │   ├── courseRoutes.js
│   │   ├── facultyRoutes.js
│   │   ├── programRoutes.js
│   │   ├── studentRoutes.js
│   │   └── attemptRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Layout.jsx
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── StudentList.js
    │   │   ├── StudentForm.js
    │   │   ├── CourseList.js
    │   │   ├── CourseForm.js
    │   │   ├── FacultyList.js
    │   │   ├── FacultyForm.js
    │   │   ├── ProgramList.js
    │   │   ├── ProgramForm.js
    │   │   ├── AttemptList.js
    │   │   └── AttemptForm.js
    │   └── services/
    │       ├── api.js
    │       ├── studentService.js
    │       ├── courseService.js
    │       ├── facultyService.js
    │       ├── programService.js
    │       └── attemptService.js
    │
    ├── package.json
    └── .env