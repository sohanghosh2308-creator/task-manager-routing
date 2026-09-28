import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  Calendar, 
  Tag, 
  Award, 
  Search, 
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';

export const CompletedTasks = () => {
  const { tasks, toggleComplete, deleteTask } = useTasks();
  const { playSound } = useSound();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const completedList = tasks.filter(t => t.status === 'Completed');

  const filteredCompleted = completedList.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                          task.id.toLowerCase().includes(search.toLowerCase()) ||
                          task.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Development', 'Cyber Security', 'AI & Neural', 'Infrastructure', 'Operations', 'Personal'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              MISSION ACCOMPLISHED ARCHIVE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            COMPLETED MISSIONS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Historical log of finalized objectives, timestamps, and execution outcomes.
          </p>
        </div>
      </div>

      {/* Completion Stat Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-orbitron font-extrabold text-emerald-300">
                  {completedList.length}
                </span>
                <span className="text-xs font-mono text-emerald-400 uppercase">
                  Missions Finalized
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                All acceptance criteria and subroutines verified.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">TOTAL TASKS</span>
              <span className="text-sm font-bold text-white">{tasks.length}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SUCCESS RATE</span>
              <span className="text-sm font-bold text-emerald-400">
                {tasks.length > 0 ? Math.round((completedList.length / tasks.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search within Completed */}
      <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search completed missions..."
            className="w-full cyber-input rounded-xl pl-10 pr-4 py-2 text-xs font-mono placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Domain:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cyber-input rounded-xl px-3 py-2 text-xs font-mono bg-slate-900"
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-slate-900">{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Completed Tasks List */}
      {filteredCompleted.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto my-8">
          <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-orbitron font-bold text-white mb-1">
            NO COMPLETED MISSIONS YET
          </h3>
          <p className="text-xs text-slate-400 font-sans mb-4">
            Finish tasks from your active queue or reactivate archived ones.
          </p>
          <Link
            to="/tasks"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all"
          >
            <span>Go to Active Tasks</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompleted.map(task => (
            <div
              key={task.id}
              className="glass-card rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                      {task.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300">
                      {task.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>FINALIZED</span>
                  </span>
                </div>

                <Link
                  to={`/tasks/${task.id}`}
                  onClick={() => playSound('click')}
                  className="block group"
                >
                  <h3 className="text-base font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
                    {task.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-400 font-sans line-clamp-2 mb-4">
                  {task.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px]">Due: {task.due}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Reactivate / Restore */}
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700 hover:border-cyan-500/40 transition-colors"
                    title="Re-open Task to Active Queue"
                  >
                    <RotateCcw className="w-3 h-3 text-cyan-400" />
                    <span>Reopen</span>
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Purge Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to={`/tasks/${task.id}`}
                    onClick={() => playSound('click')}
                    className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
