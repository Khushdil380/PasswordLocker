<p align="center">
  <img src="client/public/favicon.svg" alt="Password Locker Logo" width="100" height="100" />
</p>

<h1 align="center">🔐 Password Locker</h1>

<p align="center">
  <strong>Your passwords, one master key.</strong><br/>
  A secure, modern password management platform built with the MERN stack.
</p>

<p align="center">
  <a href="https://password-locker-flame.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Password_Locker-9F3AAA?style=for-the-badge&labelColor=1a1a2e" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Brevo-Email-0B996E?style=flat-square&logo=sendinblue&logoColor=white" alt="Brevo" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/Khushdil380/PasswordLocker?style=flat-square&color=9F3AAA" alt="License" />
  <img src="https://img.shields.io/github/last-commit/Khushdil380/PasswordLocker?style=flat-square&color=9F3AAA" alt="Last Commit" />
  <img src="https://img.shields.io/github/repo-size/Khushdil380/PasswordLocker?style=flat-square&color=9F3AAA" alt="Repo Size" />
  <img src="https://img.shields.io/github/languages/count/Khushdil380/PasswordLocker?style=flat-square&color=9F3AAA" alt="Languages" />
</p>

---

## 💡 The Problem

We all forget passwords. Multiple bank accounts, social media, work tools — the list never ends. Resetting passwords is frustrating, sometimes restricted, and always time-consuming.

## ✨ The Solution

**Password Locker** lets you manage all your passwords with a single master password. No more memorizing dozens of credentials. One login, total control.

---

## 🎯 Features

<table>
  <tr>
    <td width="50%">

### 🔑 Core
- **Master Password** protection for viewing stored passwords
- **AES Encryption** — passwords stored encrypted, never in plain text
- **Auto-generated passwords** with customizable strength
- **One-click copy** & **Go To** destination links
- **Category-based** password organization

</td>
    <td width="50%">

### 🛡️ Security
- **JWT Authentication** with 1-hour auto-expiry
- **OTP Verification** via Brevo email service
- **Encrypted storage** using industry-standard algorithms
- **Secure session management** — no back/forward button exploits
- **Master password** required to reveal any stored credential

</td>
  </tr>
  <tr>
    <td width="50%">

### 🎨 User Experience
- **Animated preloader** on app launch
- **Responsive design** — Desktop & Mobile
- **Search functionality** across all passwords
- **Profile management** with password change
- **Smooth transitions** & consistent purple theme

</td>
    <td width="50%">

### ⚙️ Technical
- **Modular architecture** — each component in its own folder
- **No file exceeds 100 lines** — clean, maintainable code
- **API proxy** in development for seamless backend calls
- **Separate deployments** — client & server on Vercel
- **Environment-based** configuration

</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<table align="center">
  <tr>
    <th>Layer</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React 19, Tailwind CSS 4, Vite 8, React Router 7</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Node.js, Express.js 4</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td>MongoDB Atlas (Mongoose ODM)</td>
  </tr>
  <tr>
    <td><strong>Authentication</strong></td>
    <td>JWT, bcrypt.js, OTP via email</td>
  </tr>
  <tr>
    <td><strong>Email Service</strong></td>
    <td>Brevo (Sendinblue) API</td>
  </tr>
  <tr>
    <td><strong>Encryption</strong></td>
    <td>AES encryption for stored passwords</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Vercel (Client + Server)</td>
  </tr>
  <tr>
    <td><strong>Version Control</strong></td>
    <td>Git & GitHub</td>
  </tr>
</table>

---

## 📁 Project Structure

```
PasswordLocker/
├── client/                     # React Frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons/              # App icons (192x192, 512x512)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── AddPasswordForm/
│   │   │   ├── Auth/
│   │   │   ├── CategoryTabs/
│   │   │   ├── DashboardHeader/
│   │   │   ├── Hero/
│   │   │   ├── Modal/
│   │   │   ├── PasswordList/
│   │   │   ├── Preloader/
│   │   │   ├── ProfileForms/
│   │   │   ├── ViewPassword/
│   │   │   └── ...
│   │   ├── context/            # React Context (Auth state)
│   │   ├── constants/          # App-wide constants
│   │   ├── pages/              # Page components
│   │   │   ├── Home/
│   │   │   └── Dashboard/
│   │   ├── routes/             # Route configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json             # Vercel rewrites & API proxy
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Express Backend
│   ├── src/
│   │   ├── config/             # DB connection & constants
│   │   ├── controllers/        # Route handlers
│   │   │   ├── authController.js
│   │   │   ├── categoryController.js
│   │   │   ├── passwordController.js
│   │   │   ├── passwordEntryController.js
│   │   │   ├── profileController.js
│   │   │   └── viewPasswordController.js
│   │   ├── middleware/         # JWT auth middleware
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Password.js
│   │   │   ├── Category.js
│   │   │   └── Otp.js
│   │   ├── routes/             # API route definitions
│   │   ├── utils/              # Helpers (email, encryption, JWT)
│   │   └── index.js            # Server entry point
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB Atlas** account (or local MongoDB)
- **Brevo** account for email OTP service
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Khushdil380/PasswordLocker.git
cd PasswordLocker
```

### 2. Setup Server

```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_strong_random_secret_here
JWT_EXPIRES_IN=1h
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
CLIENT_URL=http://localhost:5173
ENCRYPTION_KEY=your_strong_encryption_key_here
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

### 3. Setup Client

```bash
cd client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🌐 Deployment

Both client and server are deployed on **Vercel** as separate projects:

| Service | URL |
|---------|-----|
| **Frontend** | [password-locker-flame.vercel.app](https://password-locker-flame.vercel.app) |
| **Backend** | [password-locker-backend-pi.vercel.app](https://password-locker-backend-pi.vercel.app) |

The client's `vercel.json` proxies `/api/*` requests to the backend deployment.

---

## 🔒 Security Highlights

| Feature | Implementation |
|---------|---------------|
| Password Storage | AES encrypted — never stored in plain text |
| Authentication | JWT tokens with 1-hour expiration |
| Master Password | Required to decrypt & view any stored password |
| OTP Verification | Email-based OTP for account recovery |
| Session Security | Auto-logout after 1 hour, immune to browser navigation |
| Password Hashing | bcrypt with salt rounds for user account passwords |

---

## 🎨 Design Philosophy

- **Color Theme:** `#9F3AAA` Purple — consistent across all components
- **Font:** Roboto Slab Medium
- **Responsiveness:** Two breakpoints — Desktop/Laptop & Mobile
- **Modularity:** Every component in its own folder, no file exceeds 100 lines
- **Animations:** Smooth transitions and consistent motion design

---

## 📱 Screenshots

<p align="center">
  <em>Landing Page • Dashboard • Add Password • View Password</em>
</p>

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

<p align="center">
  <a href="https://github.com/Khushdil380">
    <img src="https://img.shields.io/badge/GitHub-Khushdil380-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
</p>

---

<p align="center">
  <img src="client/public/favicon.svg" alt="Password Locker" width="40" height="40" />
  <br/>
  <strong>Password Locker</strong> — Because remembering one password is enough.
  <br/><br/>
  <img src="https://img.shields.io/badge/Made_with-❤️-9F3AAA?style=flat-square" alt="Made with love" />
</p>
