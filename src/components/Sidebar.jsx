import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo, 
  PlusCircle, 
  CheckCircle2, 
  Shield, 
  RotateCcw,
  Sparkles,
  Layers,
  Flame
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';

export const Sidebar = () => {
  const { stats, resetToDefaults } = useTasks();
  const { playSound } = useSound();

  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      sublabel: 'Mission Control'
    },
    {
      to: '/tasks',
      label: 'Tasks Explorer',
      icon: ListTodo,
      badge: stats.total,
      sublabel: 'Full Directory'
    },
    {
      to: '/add-task',
      label: 'Add Task',
      icon: PlusCircle,
      badge: 'PROT',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
      sublabel: 'Protected Route'
    },
    {
      to: '/completed',
      label: 'Completed Tasks',
      icon: CheckCircle2,
      badge: stats.completed,
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
      sublabel: 'Mission Archive'
    },
    {
      to: '/login',
      label: 'Access Gate',
      icon: Shield,
      badge: null,
      sublabel: 'Biometric Auth'
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col justify-between glass-panel border-r border-cyan-500/20 bg-slate-950/70 p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" />
              SYSTEM MODULES
            </span>
            <span className="text-[10px] font-mono text-slate-500">v2.6</span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => playSound('click')}
                  className={({ isActive }) => `
                    group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/50 text-cyan-300 shadow-glow-cyan' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator dot */}
                      {isActive && (
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-[9px] text-slate-400 group-hover:text-slate-400 font-normal">{item.sublabel}</p>
                        </div>
                      </div>

                      {item.badge !== null && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40'}`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Priority Status Widget */}
        <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-rose-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              CRITICAL DEADLINES
            </span>
            <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.2 bg-rose-900/30 rounded border border-rose-500/30">
              {stats.critical} Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            High-priority tasks requiring architectural sign-off before 28 Aug 2026.
          </p>
        </div>

      </div>

      {/* Bottom Utility Controls */}
      <div className="pt-4 border-t border-cyan-500/10 space-y-2">
        <button
          onClick={resetToDefaults}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Simulation</span>
        </button>
        
        <div className="pt-2 text-center">
          <p className="text-[9px] font-mono text-slate-400">
            SYNAPSE OS // ASSIGNMENT 6
          </p>
        </div>
      </div>
    </aside>
  );
};
