import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Clock, 
  Calendar, 
  Tag, 
  AlertCircle, 
  Flame, 
  ArrowUpRight, 
  Trash2,
  ListChecks,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';

export const TaskCard = ({ task }) => {
  const { toggleComplete, deleteTask } = useTasks();
  const { playSound } = useSound();

  const isCompleted = task.status === 'Completed';

  // Priority Styles
  const priorityConfig = {
    Critical: {
      badge: 'border-rose-500/50 bg-rose-950/40 text-rose-300 shadow-glow-rose',
      border: 'hover:border-rose-500/50',
      icon: Flame,
      indicator: 'bg-rose-500'
    },
    High: {
      badge: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
      border: 'hover:border-amber-500/50',
      icon: AlertCircle,
      indicator: 'bg-amber-500'
    },
    Medium: {
      badge: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300',
      border: 'hover:border-cyan-500/40',
      icon: Clock,
      indicator: 'bg-cyan-500'
    },
    Low: {
      badge: 'border-slate-600 bg-slate-800/40 text-slate-300',
      border: 'hover:border-slate-500',
      icon: Clock,
      indicator: 'bg-slate-400'
    }
  };

  const priorityStyle = priorityConfig[task.priority] || priorityConfig.Medium;
  const PriorityIcon = priorityStyle.icon;

  // Subtasks calculation
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  const completedSubtasks = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
  const subtasksPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Due date formatting
  const formatDueDate = (dateStr) => {
    if (!dateStr) return '28 Aug 2026';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div 
      className={`group relative glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
        isCompleted 
          ? 'border-emerald-500/20 bg-slate-950/50 opacity-80 hover:opacity-100 hover:border-emerald-500/40' 
          : `border-slate-800/80 ${priorityStyle.border}`
      }`}
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Task ID chip */}
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-cyan-300 font-semibold">
              {task.id}
            </span>

            {/* Priority Badge */}
            <span className={`flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${priorityStyle.badge}`}>
              <PriorityIcon className="w-3 h-3" />
              <span>{task.priority.toUpperCase()}</span>
            </span>

            {/* Category Chip */}
            <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300">
              <Tag className="w-2.5 h-2.5 text-purple-400" />
              <span>{task.category}</span>
            </span>
          </div>

          {/* Quick Toggle Checkbox */}
          <button
            onClick={() => toggleComplete(task.id)}
            title={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
              isCompleted 
                ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald hover:bg-emerald-400' 
                : 'border border-slate-700 hover:border-cyan-400 text-slate-500 hover:text-cyan-400 bg-slate-900/50'
            }`}
          >
            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-4 h-4" />}
          </button>
        </div>

        {/* Task Title & Dynamic Route Link */}
        <Link 
          to={`/tasks/${task.id}`}
          onClick={() => playSound('click')}
          className="block group/title"
        >
          <h3 className={`text-base font-semibold leading-snug tracking-tight mb-2 group-hover/title:text-cyan-300 transition-colors ${
            isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
          }`}>
            {task.title}
          </h3>
        </Link>

        {/* Task Description */}
        <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2 mb-4">
          {task.description || 'No detailed instructions registered.'}
        </p>
      </div>

      {/* Bottom Information & Progress */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        {/* Subtasks Progress */}
        {totalSubtasks > 0 && (
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <ListChecks className="w-3 h-3 text-cyan-400" />
                <span>Subroutines</span>
              </span>
              <span>{completedSubtasks}/{totalSubtasks} ({subtasksPercent}%)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${subtasksPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Due Date & Action Links */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="text-[11px]">Due: <span className="text-slate-200 font-medium">{formatDueDate(task.due)}</span></span>
          </div>

          <div className="flex items-center gap-1">
            {/* Delete button */}
            <button
              onClick={() => deleteTask(task.id)}
              title="Purge Task"
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* View Details Link */}
            <Link
              to={`/tasks/${task.id}`}
              onClick={() => playSound('click')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-[11px] font-semibold transition-all group/btn"
            >
              <span>Inspect</span>
              <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
