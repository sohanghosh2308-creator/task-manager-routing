import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CyberBackground } from '../components/CyberBackground';
import { ToastContainer } from '../components/Toast';
import { CommandPalette } from '../components/CommandPalette';
import { Terminal, Shield, Wifi, Cpu } from 'lucide-react';

export const RootLayout = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Interactive Cyber Background Canvas */}
      <CyberBackground />

      {/* Top Navigation HUD */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Body with Sidebar + Nested Outlet */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto flex flex-row">
        {/* Persistent High-Tech Sidebar */}
        <Sidebar />

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Breadcrumb Hierarchy */}
          <Breadcrumbs />

          {/* Page rendered by React Router Outlet */}
          <div className="animate-in fade-in duration-300">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer System Status Bar */}
      <footer className="relative z-10 glass-panel border-t border-cyan-500/20 bg-slate-950/80 px-4 py-2 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              MAINFRAME STATUS: NOMINAL
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Wifi className="w-3 h-3 text-cyan-400" />
              REACT ROUTER 7 // NESTED & DYNAMIC ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">ASSIGNMENT 6 // TASK MANAGER</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300 font-semibold">TARGET DEADLINE: 28 AUG 2026</span>
          </div>
        </div>
      </footer>

      {/* Floating Global Overlays */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={setIsCommandPaletteOpen} 
      />
      <ToastContainer />
    </div>
  );
};
