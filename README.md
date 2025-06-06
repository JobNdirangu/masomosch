# 🏫 Masomo School Management System (React + Node + Express)

This project is a **school management system** built using React for the frontend and Node.js for the backend. It implements **role-based login**, a **protected dashboard**, and separate pages for **Admin**, **Teachers**, and **Parents**.

---

## 📁 Project Structure Overview

src/
├── components/
│ ├── admin/
│ ├── teacher/
│ ├── parent/
│ └── LoginComponent.jsx
├── context/
│ ├── AuthContext.jsx
│ └── ProtectedRoute.jsx
├── App.js
├── index.js

## 🧱 Step 1: Initialize the Project

1. Create a new React project:

```bash
npx create-react-app@latest masomo-school
cd masomo-school

npm install axios react-router-dom bootstrap jwt-decode

## 🧱 Step 1: Initialize the Project
## Step 2: Create a Landing Page – HomeComponent
Create a file: src/components/HomeComponent.jsx