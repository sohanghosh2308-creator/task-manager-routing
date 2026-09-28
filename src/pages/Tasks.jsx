import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Table as TableIcon, 
  Plus, 
  SlidersHorizontal, 
  SearchX, 
  ArrowUpDown,
  Calendar,
  Tag,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight,
  Trash2,
  Check,
  Circle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';
import { TaskCard } from '../components/TaskCard';
import { TaskFilterBar } from '../components/TaskFilterBar';

export const Tasks = () => {
  const { tasks, toggleComplete, deleteTask } = useTasks();
  const { playSound } = useSound();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Read URL Parameters for filtering & sorting
  const searchQuery = (searchParams.get('search') || '').toLowerCase();
  const statusFilter = searchParams.get('status') || 'All';
  const priorityFilter = searchParams.get('priority') || 'All';
  const categoryFilter = searchParams.get('category') || 'All';
  const sortBy = searchParams.get('sort') || 'due-asc';

  // Apply filters
  let filteredTasks = tasks.filter(task => {
    // Search match (title, desc, id, category, tags)
    if (searchQuery) {
      const matchTitle = task.title.toLowerCase().includes(searchQuery);
      const matchDesc = task.description.toLowerCase().includes(searchQuery);
      const matchId = task.id.toLowerCase().includes(searchQuery);
      const matchCat = task.category.toLowerCase().includes(searchQuery);
      if (!matchTitle && !matchDesc && !matchId && !matchCat) return false;
    }

    // Status filter
    if (statusFilter !== 'All' && task.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'All' && task.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  // Apply sorting
  filteredTasks.sort((a, b) => {
    if (sortBy === 'due-asc') {
      return new Date(a.due) - new Date(b.due);
    } else if (sortBy === 'due-desc') {
      return new Date(b.due) - new Date(a.due);
    } else if (sortBy === 'priority') {
      const weight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return (weight[b.priority] || 0) - (weight[a.priority] || 0);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const priorityBadge = (priority) => {
    const map = {
      Critical: 'border-rose-500/50 bg-rose-950/40 text-rose-300',
      High: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
      Medium: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300',
      Low: 'border-slate-600 bg-slate-800/40 text-slate-300'
    };
    return map[priority] || map.Medium;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              SYSTEM REPOSITORY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            ALL MISSIONS & TASKS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Displaying {filteredTasks.length} of {tasks.length} total operational tasks in database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                playSound('click');
                setViewMode('grid');
              }}
              title="Grid View"
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSound('click');
                setViewMode('table');
              }}
              title="Matrix Table View"
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/add-task"
            onClick={() => playSound('click')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>NEW TASK</span>
          </Link>
        </div>
      </div>

      {/* URL Parameter Integrated Filter Bar */}
      <TaskFilterBar />

      {/* Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 space-y-4 max-w-lg mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <SearchX className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-orbitron font-bold text-white mb-1">
              NO OBJECTIVES MATCH QUERY
            </h3>
            <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto">
              No tasks correspond with the active URL filter parameters. Clear the parameters or initiate a new mission.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/tasks"
              onClick={() => playSound('click')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
            >
              Reset Filters
            </Link>
            <Link
              to="/add-task"
              onClick={() => playSound('click')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-glow-cyan transition-colors"
            >
              Add New Task
            </Link>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        /* Matrix Table View */
        <div className="glass-panel rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-cyan-500/20 bg-slate-900/80 text-cyan-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12">Status</th>
                  <th className="py-3 px-4 w-28">Task ID</th>
                  <th className="py-3 px-4">Objective / Title</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTasks.map(task => {
                  const isDone = task.status === 'Completed';
                  return (
                    <tr 
                      key={task.id} 
                      className={`hover:bg-cyan-950/20 transition-colors group ${isDone ? 'opacity-70 bg-slate-950/40' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isDone 
                              ? 'bg-emerald-500 text-slate-950' 
                              : 'border border-slate-700 text-slate-500 hover:border-cyan-400 hover:text-cyan-400'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-bold text-cyan-300">
                        {task.id}
                      </td>
                      <td className="py-3 px-4">
                        <Link 
                          to={`/tasks/${task.id}`}
                          onClick={() => playSound('click')}
                          className={`font-semibold hover:text-cyan-300 transition-colors block max-w-md truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}
                        >
                          {task.title}
                        </Link>
                        <p className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5">
                          {task.description}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-bold ${priorityBadge(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md border border-purple-500/30 bg-purple-950/20 text-purple-300 text-[10px]">
                          {task.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                        {task.due}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 rounded hover:text-rose-400 hover:bg-rose-950/30 text-slate-500 transition-colors"
                            title="Purge Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/tasks/${task.id}`}
                            onClick={() => playSound('click')}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 text-[11px] transition-colors"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
