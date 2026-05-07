# Task 02 — Persistent Storage with Database Integration

A REST API built with **Node.js + Express + MySQL + Sequelize ORM**.

---

## 📁 Project Structure

```
task02/
├── config/
│   ├── database.js          # Sequelize connection + pooling
│   └── config.js            # Sequelize CLI config
├── migrations/
│   └── 20240101000000-create-users.js  # DB migration
├── middleware/
│   └── errorHandler.js      # Global error handler
├── models/
│   └── User.js              # Sequelize User model
├── routes/
│   └── users.js             # CRUD route handlers
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Template for .env
├── package.json
└── server.js                # Main entry point
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task02_db
DB_USER=root
DB_PASSWORD=yourpassword
```

### 3. Create MySQL Database
```sql
CREATE DATABASE task02_db;
```

### 4. Run Migrations (Optional)
```bash
npx sequelize-cli db:migrate
```

### 5. Start the Server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/users`      | Get all users      |
| GET    | `/api/users/:id`  | Get user by ID     |
| POST   | `/api/users`      | Create new user    |
| PUT    | `/api/users/:id`  | Update user by ID  |
| DELETE | `/api/users/:id`  | Delete user by ID  |

---

## 📦 Sample Requests

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 25}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Update a User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "age": 30}'
```

### Delete a User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```
