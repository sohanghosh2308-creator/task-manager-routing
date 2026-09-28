# 🛡️ AEGIS — High-Tech Authentication System (Assignment 7)

> **Autonomous Authentication Gateway & Quantum Task Matrix**  
> Built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router 7**  
> Integrated seamlessly into **Assignment 6 (Task Manager Routing)**  
> 
> 👤 **Author / Student**: Sohan Ghosh (`Sohan231001102178`)  
> 🌐 **Live Website**: [https://sohan231001102178.github.io/task-manager-routing/](https://sohan231001102178.github.io/task-manager-routing/)  
> 📦 **GitHub Repository**: [https://github.com/Sohan231001102178/task-manager-routing](https://github.com/Sohan231001102178/task-manager-routing)

---

## 🎯 Assignment 7 Compliance Matrix

| Requirement from Sheet | Status | Implementation Details |
| :--- | :---: | :--- |
| **Pre-requisite: Local Storage / Route Protection** | ✅ Passed | Session management with configurable `localStorage` / `sessionStorage` persistence and `<ProtectedRoute />` guarding all restricted views. |
| **Problem Statement: Implement an authentication System with assignment 6** | ✅ Passed | Full authentication lifecycle integrated directly into the Assignment 6 Task Management SPA without breaking existing routing. |
| **Login** | ✅ Passed | High-tech login terminal with field validation, passkey visibility toggle, and instant one-click demo credentials autofill. |
| **Logout** | ✅ Passed | Instant clearance revocation, cryptographic token clearance from storage, audio chime feedback, and automatic redirect to `/login`. |
| **Protected Dashboard** | ✅ Passed | Route guard intercepts unauthorized visits to `/` (Dashboard), `/tasks`, `/tasks/:taskId`, `/add-task`, and `/completed`, preserving intended destination. |
| **Remember User** | ✅ Passed | Configurable checkbox: when enabled, persists session across restarts via `localStorage`; when disabled, uses temporary `sessionStorage`. |
| **JWT Token Simulation** | ✅ Passed | RFC 7519 3-part base64url token (`Header.Payload.Signature`), live 3600-second expiration countdown, and an interactive **JWT Sentinel Inspector Modal** with token refresh, tampering simulation, and expiry tests. |
| **Validation: Username Required** | ✅ Passed | Real-time inline feedback indicating username is required (minimum 3 characters). |
| **Validation: Password Required** | ✅ Passed | Real-time inline feedback requiring password entry. |
| **Validation: Display Password Strength** | ✅ Passed | Dynamic 5-level animated strength meter (Very Weak, Weak, Moderate, Strong, Ultra Secure) with real-time criteria checklist (8+ chars, uppercase, lowercase, numbers, special characters). |

---

## 🔑 Quick Demo Credentials

For rapid grading and evaluation on the `/login` terminal:
- Click the **"⚡ Auto-fill Demo Credentials"** button, or enter manually:
  - **Username**: `sohanghosh`
  - **Password**: `Sohan@SecurePass2026!` *(Achieves 100% Ultra Secure strength rating)*
  - **Role**: `Chief Security & Systems Architect`
  - **Remember Operative**: Toggle checked/unchecked to test `localStorage` vs `sessionStorage`

---

## 🚀 How to Open and Run in VS Code on Desktop

### Quick Method (One-Click)
1. Double-click `Launch-VSCode.bat` inside the project folder:
   ```
   C:\Users\Argya\Desktop\task-manager-routing\Launch-VSCode.bat
   ```
   This automatically opens the folder in VS Code and launches the Vite development server.

### Manual Method (VS Code Terminal)
1. Open **Visual Studio Code**.
2. Go to **File -> Open Folder...** and select:
   ```
   C:\Users\Argya\Desktop\task-manager-routing
   ```
3. Open the integrated terminal (`Ctrl + \``) and start the local development server:
   ```bash
   npm run dev
   ```
4. Click or navigate to the displayed local URL:
   ```
   http://localhost:5173/
   ```

---

## 💻 Tech Stack & Dependencies

- **Framework**: React 19 (`react`, `react-dom`)
- **Bundler & Tooling**: Vite 8, Rolldown engine
- **Routing**: React Router 7 (`react-router-dom` with HashRouter for smooth GitHub Pages deployment)
- **Styling**: Tailwind CSS + Custom High-Tech Cyber HUD design system
- **Icons**: Lucide React (`lucide-react`)
- **Visuals & Audio**: Web Audio API Sound Synthesizer, Dynamic Cyber Canvas Particle Background, Canvas Confetti
