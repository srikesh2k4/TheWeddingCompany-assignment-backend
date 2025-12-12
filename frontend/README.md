# **Frontend – Organization Management UI**

A modern React + Vite + TailwindCSS frontend for the Multi-Tenant Organization Management System.

---

## **🚀 Features**

* Clean dark-themed UI
* Create Organization
* Admin Login
* View Organization Metadata
* Form validation (email + password)
* Show/Hide password toggle
* Axios service layer
* Environment-based API base URL
* Fully responsive layout
* Compatible with Docker

---

## **📦 Tech Stack**

| Component  | Technology                |
| ---------- | ------------------------- |
| Framework  | **React 18 + Vite**       |
| Styling    | **TailwindCSS**           |
| Routing    | **react-router-dom v6**   |
| API Client | **Axios**                 |
| State      | React Hooks               |
| Deployment | Served by Nginx in Docker |

---

## **🛠️ Installation & Setup**

### **1. Navigate to frontend folder**

```sh
cd frontend
```

---

### **2. Install dependencies**

```sh
npm install
```

---

### **3. Create your environment variable file**

Create:

```
frontend/.env
```

Paste:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Your frontend automatically uses this value inside:

```js
import.meta.env.VITE_API_BASE_URL
```

---

### **4. Run development server**

```sh
npm run dev
```

Vite will start your project on:

```
http://localhost:5173
```

---

## **📁 Project Structure**

```
frontend/
│── src/
│   ├── api/
│   │    └── api.js
│   ├── pages/
│   │    ├── CreateOrg.jsx
│   │    ├── Login.jsx
│   │    └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│── .env
│── package.json
│── tailwind.config.js
│── vite.config.js
```

---

## **🔌 API Configuration**

**src/api/api.js**

```js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default API;
```

---

## **🐳 Running Frontend in Docker**

Your frontend uses an Nginx image and binds port 5173 → 80 inside container.

### **docker-compose.yml**

```yaml
frontend:
  build: ./frontend
  ports:
    - "5173:80"
```

### **To build + run**

```sh
docker compose up --build
```

Visit:

```
http://localhost:5173
```

---

## **✨ Available Scripts**

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start local Vite dev server |
| `npm run build`   | Build production React app  |
| `npm run preview` | Preview built app locally   |

---

## **🙌 Author**

**Kotipalli Srikesh**
LinkedIn: [https://www.linkedin.com/in/kotipalli-srikesh-9487561b9/](https://www.linkedin.com/in/kotipalli-srikesh-9487561b9/)
Reg No: **RA2211003010979**

---

## **📃 License**

This project is part of the **Backend Intern Assignment – Organization Management Service** (Multi-Tenant Architecture).

