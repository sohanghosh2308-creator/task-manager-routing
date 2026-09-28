import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useTasks();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => {
        let borderClass = 'border-cyan-500/40 text-cyan-300';
        let bgClass = 'bg-slate-900/90 shadow-glow-cyan';
        let Icon = Info;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500/40 text-emerald-300';
          bgClass = 'bg-slate-900/90 shadow-glow-emerald';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          borderClass = 'border-rose-500/40 text-rose-300';
          bgClass = 'bg-slate-900/90 shadow-glow-rose';
          Icon = AlertTriangle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border backdrop-blur-xl ${borderClass} ${bgClass} transition-all duration-300 animate-in slide-in-from-bottom-5`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-mono font-medium tracking-wide text-slate-100">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
