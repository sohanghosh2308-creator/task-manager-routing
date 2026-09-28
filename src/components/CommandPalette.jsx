import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, CheckSquare, PlusCircle, LayoutDashboard, Shield, ArrowRight, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { tasks } = useTasks();
  const { playSound } = useSound();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose ? onClose(!isOpen) : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Mission Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'All Tasks Directory', path: '/tasks', icon: Command },
    { label: 'Initiate New Task', path: '/add-task', icon: PlusCircle },
    { label: 'Completed Archives', path: '/completed', icon: CheckSquare },
    { label: 'Security Clearance Terminal', path: '/login', icon: Shield },
  ];

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.id.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleSelect = (path) => {
    playSound('click');
    navigate(path);
    onClose(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl glass-panel border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-500/20 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search tasks, or jump to route..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 font-mono text-sm focus:outline-none"
          />
          <button 
            onClick={() => onClose(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-4">
          {/* Matching Tasks */}
          {query.trim() && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 px-2 mb-1.5">
                Target Tasks ({filteredTasks.length})
              </p>
              {filteredTasks.length === 0 ? (
                <p className="text-xs text-slate-400 px-2 py-2 font-mono">No matching tasks found in database.</p>
              ) : (
                <div className="space-y-1">
                  {filteredTasks.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelect(`/tasks/${t.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                          {t.id}
                        </span>
                        <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300">
                          {t.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{t.priority}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              Command Actions
            </p>
            <div className="space-y-1">
              {quickLinks.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleSelect(link.path)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-purple-500/10 hover:border-purple-500/30 border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                      <span className="text-xs text-slate-200 group-hover:text-white font-mono">
                        {link.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-purple-400">
                      {link.path}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-cyan-500/10 bg-slate-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">ESC</kbd>
            <span>Close</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
