# SYNAPSE // Quantum Task Manager [Assignment 6]
> **React Single-Page Application with React Router 7, Nested Routes, Dynamic Routes, and Protected Routes.**
> Operative Lead: **Sohan Ghosh**

Built specifically according to the requirements of **Assignment 6: Task Manager with Routing**, featuring an ultra-modern cybernetic sci-fi glassmorphism design, interactive Canvas background, Web Audio API sound synthesis, and real-time state persistence.

---

## 🚀 Key Specifications & Compliance

### 1. Problem Statement Fulfillment
- **Single-Page Application (SPA)**: Built using React and Vite with high performance.
- **Task Management**: Full CRUD capabilities allowing users to **Create**, **View**, **Update**, **Complete**, **Filter**, and **Delete** tasks.
- **Specified Task Fields**:
  - `Description` (Full multiline markdown/text briefing)
  - `Priority` (`Critical`, `High`, `Medium`, `Low` with neon color indicators)
  - `Category` (`Development`, `Cyber Security`, `AI & Neural`, `Infrastructure`, `Operations`, `Personal`)
  - `Due Date` (Features preset shortcut for `28 Aug 2026` + date picker)
  - `Status` (`Todo`, `In Progress`, `Completed`)
  - *Extras*: `Task ID` (`TSK-101`), `Subtasks Checklist`, `Tags`, `Created & Completed Timestamps`.

---

## 🗺️ React Router Architecture

### Pages & Routes
| Page Name | Route Path | Type | Description |
|---|---|---|---|
| **Dashboard** | `/` | Index Route | Mission control HUD, KPI counters, SVG completion ring gauge, upcoming missions feed, priority breakdown |
| **Tasks** | `/tasks` | Main Directory | Full task list with view toggle (Grid / Table), URL query parameter filtering (`?status=...&priority=...&search=...`) |
| **Add Task** | `/add-task` | **Protected Route** | Biometric security checkpoint protected form with validation, AI breakdown generator, and 28 Aug 2026 preset |
| **Task Details** | `/tasks/:taskId` | **Dynamic Route** | Dynamic URL parameter extraction with `useParams()`, full dossier view, inline edit mode, subtasks checklist, countdown |
| **Completed Tasks** | `/completed` | Dedicated Archive | Historical log of finished missions with reactivate/re-open mechanism, purge action, and telemetry statistics |
| **Access Gate** | `/login` | Security Auth Terminal | Biometric retinal scan simulator, role selector, and redirect return memory (`location.state.from`) |
| **404 Fallback** | `*` | Catch-all | Terminal diagnostics and quick return routing |

### Features Implemented
1. **Nested Routes**: Managed by `<RootLayout />` with shared cyber topbar, telemetry chronometer, sound controller, sidebar navigation dock, breadcrumbs, and dynamic `<Outlet />`.
2. **Dynamic Routes & URL Parameters**: `/tasks/:taskId` parses the URL parameter dynamically and renders the exact task with fallback 404 if not found.
3. **URL Query Synchronization**: Filter states (Status, Priority, Category, Sort, Search) synchronize with `useSearchParams()` for deep-linking and bookmarking.
4. **Navigation**: Active `NavLink` indicators with glowing neon accents, breadcrumb trail, and programmatic navigation via `useNavigate()`.
5. **Protected Route (Basic)**: Route guard (`<ProtectedRoute>`) ensuring `/add-task` requires active clearance. Users can toggle authentication anytime from the top bar or via `/login`.

---

## ⚡ Modern High-Tech Features & Effects

- **Interactive Quantum Background**: HTML5 Canvas particle constellation that smoothly reacts to cursor movements, connecting glowing synaptic lines with ambient radial gradients.
- **Native Web Audio API Synthesizer**: Generates crisp, futuristic audio feedback (clicks, completion chimes, delete alerts, authorization chimes) without downloading external audio files. Includes top-bar mute/unmute control.
- **Celebration Particle Bursts**: Confetti blast triggers upon completing missions (`canvas-confetti`).
- **AI Task Breakdown Assistant**: Auto-synthesizes realistic technical subtasks with one click in the Add Task form.
- **Command Palette (`Ctrl+K`)**: Global spotlight search modal to search tasks or jump between routes with keyboard navigation.
- **Offline / Local Storage Persistence**: Preloaded with high-tech sample tasks (including tasks due on `28 Aug 2026`), with simulation reset options.

---

## 💻 Running the Application in VS Code

### Prerequisites
- Node.js (v18+ or v24)
- npm

### Launch Steps:
1. Open this folder in VS Code:
   - On Desktop: `task-manager-routing`
   - Or in terminal:
     ```bash
     code "C:\Users\Argya\Desktop\task-manager-routing"
     ```
2. In the integrated terminal (`Ctrl + \``):
   ```bash
   npm run dev
   ```
3. Open your browser at the provided URL:
   ```
   http://localhost:5173/
   ```

### To Build for Production:
```bash
npm run build
npm run preview
```
