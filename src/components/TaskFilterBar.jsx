import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RotateCcw, ArrowUpDown } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const TaskFilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { playSound } = useSound();

  const searchQuery = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const priorityFilter = searchParams.get('priority') || 'All';
  const categoryFilter = searchParams.get('category') || 'All';
  const sortBy = searchParams.get('sort') || 'due-asc';

  const updateParam = (key, value) => {
    playSound('click');
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'All' || (key === 'search' && value.trim() === '')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    playSound('delete');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || (statusFilter && statusFilter !== 'All') || 
                           (priorityFilter && priorityFilter !== 'All') || 
                           (categoryFilter && categoryFilter !== 'All') ||
                           (sortBy && sortBy !== 'due-asc');

  const categories = ['All', 'Development', 'Cyber Security', 'AI & Neural', 'Infrastructure', 'Operations', 'Personal'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const statuses = ['All', 'Todo', 'In Progress', 'Completed'];

  return (
    <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 mb-6 space-y-4">
      {/* Search Input & Status Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => updateParam('search', e.target.value)}
            placeholder="Search objectives, IDs, algorithms, technologies..."
            className="w-full cyber-input rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Status Quick Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => updateParam('status', status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Filters: Priority, Category, Sorting, Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cyan-500/10 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Priority Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => updateParam('priority', e.target.value)}
              className="cyber-input rounded-lg px-2.5 py-1.5 text-xs bg-slate-900 text-slate-200 border-slate-700"
            >
              {priorities.map(p => (
                <option key={p} value={p} className="bg-slate-900">{p}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => updateParam('category', e.target.value)}
              className="cyber-input rounded-lg px-2.5 py-1.5 text-xs bg-slate-900 text-slate-200 border-slate-700"
            >
              {categories.map(c => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={sortBy}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="cyber-input rounded-lg px-2.5 py-1.5 text-xs bg-slate-900 text-slate-200 border-slate-700"
            >
              <option value="due-asc" className="bg-slate-900">Due Date (Earliest First)</option>
              <option value="due-desc" className="bg-slate-900">Due Date (Latest First)</option>
              <option value="priority" className="bg-slate-900">Priority (Critical to Low)</option>
              <option value="title" className="bg-slate-900">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-lg bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/40 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
