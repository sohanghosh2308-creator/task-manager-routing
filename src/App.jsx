import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SoundProvider } from './context/SoundContext';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { RootLayout } from './layouts/RootLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { AddTask } from './pages/AddTask';
import { TaskDetails } from './pages/TaskDetails';
import { CompletedTasks } from './pages/CompletedTasks';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <HashRouter>
      <SoundProvider>
        <AuthProvider>
          <TaskProvider>
            <Routes>
              {/* Nested Routes with RootLayout container and <Outlet /> */}
              <Route path="/" element={<RootLayout />}>
                {/* 1. Dashboard Page */}
                <Route index element={<Dashboard />} />

                {/* 2. Tasks Page (with URL query parameters) */}
                <Route path="tasks" element={<Tasks />} />

                {/* 3. Task Details Page (Dynamic Route with URL Parameter :taskId) */}
                <Route path="tasks/:taskId" element={<TaskDetails />} />

                {/* 4. Add Task Page (Protected Route Basic) */}
                <Route 
                  path="add-task" 
                  element={
                    <ProtectedRoute>
                      <AddTask />
                    </ProtectedRoute>
                  } 
                />

                {/* 5. Completed Tasks Page */}
                <Route path="completed" element={<CompletedTasks />} />

                {/* Access / Biometric Clearance Terminal */}
                <Route path="login" element={<Login />} />

                {/* 404 Route Not Found */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </SoundProvider>
    </HashRouter>
  );
}

export default App;
