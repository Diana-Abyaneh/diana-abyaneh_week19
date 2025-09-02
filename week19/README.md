# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
### 🛒 Admin Panel (mini-project)

A Admin Dashboard built with React 18 + Vite ⚡.
This project lets you manage products (CRUD operations) with a clean UI and modern tools.


# ✨ Features

- 📦 Product Management – Add, edit, delete, and view products

- 🔍 Search & Filter – Quickly find items

- 🎨 Responsive Dashboard – Works on desktop & mobile

- 📡 API Integration – Uses axios to fetch data from backend

- 📝 Forms Made Easy – Powered by react-hook-form

- 🎭 Icons Support – Beautiful icons with react-icons

- ⚡ Fast Development – Built with Vite for blazing speed

# 🛠️ Tech Stack

⚛️ React 18

- ⚡ Vite

- 📡 Axios

- 📝 React Hook Form

- 🎭 React Icons

- 🎨 CSS

---

# 📁 Folder Structure
```
├── src/
│ ├── assets/ # SVG icons and static assets
│ ├── components/ # Reusable UI components (Tables, Forms, Buttons, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── pages/  
│ ├── services/ # API service functions (CRUD operations)
│ ├── App.jsx # Main app component
│ ├── global.css # Global styles
│ └── main.jsx # Entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

# 🚀 Getting Started

1️⃣ Clone the repo

```bash
git clone https://github.com/Diana-Abyaneh/diana-abyaneh_week19.git
cd diana-abyaneh_week19
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Run the project

```bash
npm run dev
```

Then open 👉 http://localhost:5173 in your browser.

---

### 📡 API Integration

The app connects to a backend API for product data.
Example service functions:

- getProducts() – fetch all products

- addProduct(product) – add new product

- editProduct(id, product) – update existing product

- deleteProduct(id) – remove product

---

### 👩‍💻 Author

[**Diana Abyaneh**](https://github.com/Diana-Abyaneh)
