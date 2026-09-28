import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ListTodo, Terminal } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const NotFound = () => {
  const { playSound } = useSound();

  return (
    <div className="max-w-lg mx-auto py-16 text-center space-y-6">
      <div className="relative inline-block">
        <div className="w-20 h-20 rounded-3xl bg-rose-950/40 border border-rose-500/50 flex items-center justify-center text-rose-400 mx-auto shadow-glow-rose">
          <AlertTriangle className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
          ERROR CODE: 404 // VECTOR DISPLACED
        </span>
        <h1 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
          ROUTE NOT LOCATED
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-sm mx-auto">
          The requested coordinate is outside current system routing tables. Verify URL parameter hierarchy.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left font-mono text-xs text-slate-400 max-w-sm mx-auto">
        <div className="flex items-center gap-2 text-cyan-400 mb-1">
          <Terminal className="w-3.5 h-3.5" />
          <span>ROUTER DIAGNOSTIC:</span>
        </div>
        <p>• Location: Window.location.pathname</p>
        <p>• Status: Unresolved Route</p>
        <p>• Action: Redirect to verified route</p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          onClick={() => playSound('click')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
        <Link
          to="/tasks"
          onClick={() => playSound('click')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs transition-all"
        >
          <ListTodo className="w-4 h-4" />
          <span>Browse Missions</span>
        </Link>
      </div>
    </div>
  );
};
