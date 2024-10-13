# Collaborative Task Management App

## Overview

The **Collaborative Task Management App** is a web-based platform designed to streamline team collaboration and task management. It offers robust features like user authentication, task creation and assignment, status tracking, and real-time updates, making it easier for teams to organize work efficiently and meet deadlines.

Whether you're managing a small project or coordinating a large team, this app provides the tools necessary for enhanced productivity and seamless collaboration.

## Features

- **User Authentication**: Secure sign-up, login, and logout functionality using JWT-based authentication.
- **Profile Management**: Users can update their profiles, including changing their profile picture and password.
- **Task Management**:
  - Task creation: Create new tasks with titles, descriptions, and deadlines.
  - Task assignment: Assign tasks to team members.
  - Task status tracking: Track task progress with states like `To-Do`, `In-Progress`, and `Completed`.
  - Task prioritization: Set task priority levels (low, medium, high).
- **Projects Page**:
  - Project creation: Create new projects to organize tasks.
  - Project assignment: Assign team members to projects.
  - Manage tasks within each project.
- **Real-Time Collaboration**: Tasks and status updates reflect in real-time across all team members' dashboards.
- **Responsive Design**: Fully responsive design optimized for both desktop and mobile users.
- **Search and Filtering**: Filter tasks by status, priority, or assignee to quickly find tasks.
- **Dashboard**: A central hub for users to see tasks, projects, and updates.
- **Chat Feature**: Real-time messaging, message history,  within each project.
  
## Technologies Used

### Frontend
- **React**: A JavaScript library for building dynamic user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the frontend.
- **Vite**: A fast build tool and development server for modern web projects.
- **React Router**: For client-side routing and navigation.

### Backend
- **Node.js**: A JavaScript runtime used to build the backend server.
- **Express**: A web framework for Node.js for creating APIs.
- **MongoDB**: A NoSQL database to store user and task information.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication and session management.
- **Bcrypt**: For secure password hashing.

### State Management

- **Redux Toolkit**: For managing the application's global state, including authentication, tasks, and user profiles.

## Getting Started

### Prerequisites

Ensure that you have the following installed on your machine:

- **Node.js**: Version 14 or higher.
- **MongoDB**: Make sure MongoDB is installed locally or use a cloud-based MongoDB Atlas cluster.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Om-Jadon/Collaborative-Task-Management-App.git
    cd Collaborative-Task-Management-App
    ```

2. Install dependencies for both frontend and backend:

    - For the frontend:
      ```bash
      cd frontend
      npm install
      ```

    - For the backend:
      ```bash
      cd backend
      npm install
      ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

   - `MONGO_URI`: The MongoDB connection string (replace `your_mongodb_connection_string` with the actual URI).
   - `JWT_SECRET`: A secret key used to sign JWT tokens for authentication.

### Running the Application

1. **Start the backend server**:
    ```bash
    cd backend
    node server.js
    ```

2. **Start the frontend development server** using Vite:
    ```bash
    cd ../frontend
    npm run dev
    ```
