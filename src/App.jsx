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

/**
 * AEGIS // High-Tech Authentication & Quantum Task Matrix
 * Assignment 7 Architecture:
 * - Nested Routes with RootLayout
 * - Protected Dashboard & Protected Application Routes with JWT Verification
 * - Public Access Gate (/login)
 */
function App() {
  return (
    <HashRouter>
      <SoundProvider>
        <AuthProvider>
          <TaskProvider>
            <Routes>
              {/* Nested Routes with RootLayout container */}
              <Route path="/" element={<RootLayout />}>
                
                {/* 1. Protected Dashboard Page (Assignment 7 Core Requirement) */}
                <Route 
                  index 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* 2. Protected Tasks Explorer Page */}
                <Route 
                  path="tasks" 
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  } 
                />

                {/* 3. Protected Task Details Page (Dynamic Route :taskId) */}
                <Route 
                  path="tasks/:taskId" 
                  element={
                    <ProtectedRoute>
                      <TaskDetails />
                    </ProtectedRoute>
                  } 
                />

                {/* 4. Protected Add Task Page */}
                <Route 
                  path="add-task" 
                  element={
                    <ProtectedRoute>
                      <AddTask />
                    </ProtectedRoute>
                  } 
                />

                {/* 5. Protected Completed Tasks Archive Page */}
                <Route 
                  path="completed" 
                  element={
                    <ProtectedRoute>
                      <CompletedTasks />
                    </ProtectedRoute>
                  } 
                />

                {/* Public Access & Authentication Gate */}
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
