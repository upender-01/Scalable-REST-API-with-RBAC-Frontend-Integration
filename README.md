# 🚀 Scalable REST API with RBAC (Frontend + Backend)

A full-stack web application implementing a **scalable REST API with Role-Based Access Control (RBAC)**.
It includes user authentication, protected routes, and task management features.

---

## 📌 Features

* 🔐 User Authentication (Register & Login)
* 🛡️ JWT-based Authorization
* 👥 Role-Based Access Control (RBAC)
* ✅ CRUD Operations for Tasks
* 🌐 Fully deployed (Frontend + Backend)
* ⚡ Scalable backend using Express & MongoDB

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcryptjs (password hashing)

---

## 📂 Project Structure

```
REST_API/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   └── myreact-app/
│       ├── src/
│       ├── public/
│       └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

Create environment variables in your backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/upender-01/Scalable-REST-API-with-RBAC-Frontend-Integration.git
cd REST_API
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend/myreact-app
npm install
npm run dev
```

---

## 🌍 Deployment

### Frontend

* Deployed on Vercel

### Backend

* Deployed on Render

### Database

* MongoDB Atlas

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register user |
| POST   | /api/v1/auth/login    | Login user    |

---

### Tasks (Protected)

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| GET    | /api/v1/tasks     | Get all tasks |
| POST   | /api/v1/tasks     | Create task   |
| DELETE | /api/v1/tasks/:id | Delete task   |

---

## 🔐 Authentication Flow

1. User registers/logs in
2. Server returns JWT token
3. Token stored in frontend
4. Token sent in headers for protected routes

---

## 🧪 Sample Request

### Register

```
POST /api/v1/auth/register
```

```json
{
  "username": "testuser",
  "password": "123456",
  "role": "user"
}
```

---

## ⚠️ Common Issues & Fixes

* ❌ 500 Error → Check MongoDB connection & environment variables
* ❌ CORS Error → Configure backend CORS properly
* ❌ Deployment Issues → Ensure correct build & start commands

---

## 📈 Future Improvements

* ✨ Add refresh tokens
* ✨ Role-based UI control
* ✨ Update task feature
* ✨ Pagination & filtering
* ✨ Docker support

---

## 👨‍💻 Author

**Bhukya Upender**
Aspiring Software Engineer | Full Stack Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
