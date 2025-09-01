# 💳 Digital Wallet System – Frontend

Frontend application for a **role-based Digital Wallet System** (similar to bKash/Nagad) built with **React, Redux Toolkit, and RTK Query**.  

🔗 **Live Demo:** [Digital Wallet Client](https://digital-wallet-system-client.vercel.app)  
📂 **GitHub Repo:** [digital-wallet-system-client](https://github.com/Brparthib/digital-wallet-system-client)

---

## 📖 Overview

This project is the **client-side interface** of the Digital Wallet System.  
It provides a **secure, responsive, and user-friendly dashboard** for three roles:  

- 👤 **Users** – Send/Withdraw money, manage wallet, and view transactions  
- 🏪 **Agents** – Handle cash-in/cash-out and track commissions  
- 🛠️ **Admins** – Manage users/agents, monitor transactions, and oversee the system  

The app consumes APIs from a backend server and ensures **real-time state management** with **Redux Toolkit + RTK Query**.  

---

## 🛠️ Tech Stack

**Frontend**
- React.js + TypeScript  
- Redux Toolkit & RTK Query  
- React Router  
- Tailwind CSS  

**Backend (for API integration – separate repo)**
- Node.js / Express.js  
- MongoDB / Mongoose  
- JWT Authentication with bcrypt  

---

## ✨ Features

### 🔓 Public Landing Pages
- Home with hero section, navigation bar, and responsive design  
- About, Features, Pricing (optional), Contact, and FAQ pages  

### 🔑 Authentication
- Login & Registration (with role selection: User/Agent)  
- JWT authentication & persisted login state  
- Secure logout & role-based redirection  

### 👤 User Dashboard
- Wallet overview (balance, transactions)  
- Deposit, Withdraw, Send money  
- Transaction history with filters & pagination  
- Profile update  

### 🏪 Agent Dashboard
- Add/Withdraw money for users  
- Track commission & transaction history  
- Profile management  

### 🛠️ Admin Dashboard
- Manage Users & Agents (approve/block/suspend)  
- View all transactions with advanced filters  
- Dashboard stats & analytics  

### 🌍 General Features
- Role-based navigation menus  
- Loading indicators, error handling, and toasts  
- Guided Tour (React Joyride/Driver.js) for first-time users  
- Dark/Light mode toggle  
- Data visualizations with charts and cards  
- Fully responsive UI with smooth transitions  

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Brparthib/digital-wallet-system-client.git
cd digital-wallet-system-client
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory and add your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 4️⃣ Run the Project
```bash
npm run dev
```
Now visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure
```
src/
 ┣ components/     # Reusable UI components
 ┣ pages/          # Public & dashboard pages
 ┣ features/       # Redux slices & API services
 ┣ routes/         # Protected & role-based routes
 ┣ hooks/          # Custom hooks
 ┣ utils/          # Helper functions
 ┣ App.tsx
 ┗ main.tsx
```

---

## 🌐 Deployment

The project is deployed on **Vercel**.  
You can deploy your own version easily:
```bash
npm run build
```
Then deploy the `dist/` folder to **Vercel**, **Netlify**, or any hosting provider.  

---

## 📌 Notes
- Backend must be running for authentication & transactions.  
- Use provided test credentials (Admin/Agent/User) if available.  
- For demo purposes, wallet operations like deposit/withdraw are simulated.  

---

## 👨‍💻 Author
**Parthib Barua**  
🔗 [GitHub](https://github.com/Brparthib)

---
