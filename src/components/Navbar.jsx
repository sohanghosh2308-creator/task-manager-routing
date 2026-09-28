import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Plus, 
  Activity,
  Cpu,
  Lock,
  Unlock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const Navbar = ({ onOpenCommandPalette }) => {
  const { isAuthenticated, user, toggleAuth } = useAuth();
  const { soundEnabled, toggleSound, playSound } = useSound();
  const [timeStr, setTimeStr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthToggle = () => {
    playSound('click');
    toggleAuth();
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group"
            onClick={() => playSound('click')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-extrabold text-base tracking-widest text-slate-100 group-hover:text-cyan-400 transition-colors">
                  SYNAPSE<span className="text-cyan-400 font-mono">_OS</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  A-6 ROUTING
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                QUANTUM TASK ORCHESTRATOR
              </p>
            </div>
          </Link>
        </div>

        {/* Center: System Telemetry & Quick Search */}
        <div className="flex items-center gap-3">
          {/* Live System Chronometer */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-cyan-500/15 text-xs font-mono text-cyan-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SYS_TIME: {timeStr || '18:56:00'}</span>
            <span className="text-[10px] text-slate-500">| UTC+5:30</span>
          </div>

          {/* Quick Search / Command Trigger */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-white transition-all text-xs font-mono group"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search / Cmd</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-400 group-hover:text-cyan-300">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Sound, Auth Clearance, Quick Action */}
        <div className="flex items-center gap-2.5">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable Audio Synthesizer' : 'Enable Audio Synthesizer'}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled 
                ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-400 hover:shadow-glow-cyan' 
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Protected Route Auth State Pill */}
          <div className="relative group">
            <button
              onClick={handleAuthToggle}
              title={`Click to ${isAuthenticated ? 'Lock (Logout)' : 'Unlock (Login)'} Protected Routes`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                isAuthenticated 
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/30' 
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300 hover:bg-rose-900/30'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline font-semibold">Sohan Ghosh [L5]</span>
                  <span className="text-[10px] uppercase bg-emerald-900/50 px-1 py-0.5 rounded border border-emerald-500/30">
                    AUTH ACTIVE
                  </span>
                  <Unlock className="w-3 h-3 text-emerald-400" />
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span className="hidden lg:inline">GUEST MODE</span>
                  <span className="text-[10px] uppercase bg-rose-900/50 px-1 py-0.5 rounded border border-rose-500/30">
                    LOCKED
                  </span>
                  <Lock className="w-3 h-3 text-rose-400" />
                </>
              )}
            </button>
          </div>

          {/* Quick Add Task Button */}
          <Link
            to="/add-task"
            onClick={() => playSound('click')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold font-mono text-xs shadow-glow-cyan hover:shadow-cyan-400/50 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">NEW TASK</span>
          </Link>

        </div>
      </div>
    </header>
  );
};
