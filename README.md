# 🍽️ Restaurant Menu API

A beginner-friendly **Restaurant Menu REST API** built with **Node.js**, **Express.js**, and **MongoDB**. This project manages restaurant menu items and demonstrates how to work with **array-based database schemas** in MongoDB while implementing RESTful CRUD operations.

This project was created to strengthen my understanding of Express routing, MongoDB data modeling, and API development.

---

# 🚀 Features

* 🍳 Manage Breakfast, Lunch, and Dinner Menus
* ➕ Add New Menu Items
* 📖 Retrieve Menu Data
* 🗑️ Delete Menu Items
* 🗄️ MongoDB Array-Based Schemas
* 🌐 RESTful API Design
* ⚡ Express.js Backend
* 📦 JSON Request & Response Handling
* 🔒 Environment Variables with dotenv

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv

---

# 📂 Project Structure

```text
Restaurant-API/
│
├── database/
│   └── menu.js
│
├── routes/
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Lavish09-Mehra/Restaurant-API.git
```

Navigate to the project folder:

```bash
cd Restaurant-API
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
Mongo_url=YOUR_MONGODB_CONNECTION_STRING
```

Start the server:

```bash
npm run dev
```

or

```bash
node server.js
```

---

# 📮 API Endpoints

### Get Restaurant Menu

```http
GET /api/menu
```

### Add Menu Items

```http
POST /api/menu
```

### Delete Menu Items

```http
DELETE /api/menu/:id
```

> Endpoint names may vary depending on your implementation.

---

# 📚 What I Learned

This project helped me understand:

* REST API fundamentals
* Express Routing
* MongoDB & Mongoose
* Array-based Database Schemas
* Nested Objects in MongoDB
* CRUD Operations
* GET Requests
* POST Requests
* DELETE Requests
* JSON Request & Response Handling
* Error Handling
* Backend Project Structure

---

# 🎯 Future Improvements

* Update Menu Items (PUT/PATCH)
* Categories (Veg, Non-Veg, Drinks, Desserts)
* Search Menu Items
* Price Filtering
* Pagination
* User Authentication (JWT)
* Image Uploads
* API Documentation (Swagger)

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👨‍💻 Author

**Lavish Mehra**

GitHub: https://github.com/Lavish09-Mehra

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub. It motivates me to continue building backend projects and improving my development skills.
