import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Tag, 
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  Check, 
  Edit3, 
  Trash2, 
  ListChecks, 
  Save, 
  X, 
  Circle, 
  Plus,
  Share2,
  Sparkles,
  Shield,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';

export const TaskDetails = () => {
  const { taskId } = useParams(); // URL Parameter!
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, toggleComplete, toggleSubtask, addSubtask, deleteSubtask } = useTasks();
  const { playSound } = useSound();

  const task = getTaskById(taskId);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Development',
    due: '',
    status: 'Todo'
  });
  const [newSubtask, setNewSubtask] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (task) {
      setEditForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        due: task.due,
        status: task.status
      });
    }
  }, [task]);

  if (!task) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 space-y-4 max-w-lg mx-auto my-16">
        <div className="w-14 h-14 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-orbitron font-bold text-white">
          TASK [{taskId}] NOT FOUND
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          The requested task identifier does not exist in active memory or was purged.
        </p>
        <div className="pt-4">
          <Link
            to="/tasks"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Missions Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = task.status === 'Completed';

  // Subtask progress
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  const completedSubtasks = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
  const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Due date countdown
  const getDueCountdown = (dueStr) => {
    if (!dueStr) return null;
    const dueTime = new Date(dueStr).getTime();
    const nowTime = new Date('2026-08-28T00:00:00').getTime(); // Using simulation date reference
    const diffDays = Math.ceil((dueTime - nowTime) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { label: 'Due Today (Target: 28 Aug 2026)', color: 'text-amber-400' };
    if (diffDays < 0) return { label: `${Math.abs(diffDays)} Days Past Due`, color: 'text-rose-400' };
    return { label: `${diffDays} Days Remaining`, color: 'text-cyan-400' };
  };

  const countdown = getDueCountdown(task.due);

  // Handle Edit Save
  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateTask(task.id, editForm);
    setIsEditing(false);
  };

  // Handle Delete
  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/tasks');
  };

  // Handle Add Subtask inline
  const handleAddSub = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    addSubtask(task.id, newSubtask);
    setNewSubtask('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/tasks')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all"
            title="Back to All Tasks"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/40 text-cyan-300">
                DYNAMIC URL PARAM: {taskId}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                /tasks/{taskId}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Toggle Complete */}
          <button
            onClick={() => toggleComplete(task.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 shadow-glow-emerald'
                : 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50'
            }`}
          >
            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-4 h-4" />}
            <span>{isCompleted ? 'Accomplished' : 'Mark Complete'}</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setIsEditing(!isEditing);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-mono text-xs transition-all ${
              isEditing 
                ? 'bg-purple-950/40 border-purple-500 text-purple-300' 
                : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Mission'}</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
            title="Purge Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {isEditing ? (
          /* Edit Form Mode */
          <form onSubmit={handleSaveEdit} className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-purple-400" />
                <span>UPDATING TASK PARAMETERS</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">ID: {task.id}</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300">Objective Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full cyber-input rounded-xl px-4 py-2.5 text-sm font-semibold"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300">Description (Field: Description)</label>
              <textarea
                rows="4"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full cyber-input rounded-xl p-3 text-xs font-sans"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Priority (Field: Priority)</label>
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                  className="w-full cyber-input rounded-xl p-2.5 text-xs font-mono bg-slate-900"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Category (Field: Category)</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full cyber-input rounded-xl p-2.5 text-xs font-mono bg-slate-900"
                >
                  <option value="Development">Development</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="AI & Neural">AI & Neural</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Operations">Operations</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Status (Field: Status)</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full cyber-input rounded-xl p-2.5 text-xs font-mono bg-slate-900"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Due Date (Field: Due: 28 Aug 2026)</label>
              <input
                type="date"
                value={editForm.due}
                onChange={(e) => setEditForm({ ...editForm, due: e.target.value })}
                className="w-full cyber-input rounded-xl p-2.5 text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          /* View Dossier Mode */
          <div className="space-y-6">
            
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-cyan-500/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  {task.id}
                </span>

                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                  task.priority === 'Critical' ? 'border-rose-500/50 bg-rose-950/40 text-rose-300 shadow-glow-rose' :
                  task.priority === 'High' ? 'border-amber-500/50 bg-amber-950/40 text-amber-300' :
                  task.priority === 'Medium' ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300' :
                  'border-slate-600 bg-slate-800/40 text-slate-300'
                }`}>
                  PRIORITY: {task.priority.toUpperCase()}
                </span>

                <span className="text-xs font-mono px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-purple-400" />
                  <span>{task.category}</span>
                </span>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">STATUS:</span>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
                  isCompleted 
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 shadow-glow-emerald' 
                    : task.status === 'In Progress'
                    ? 'border-purple-500/50 bg-purple-950/40 text-purple-300 animate-pulse'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}>
                  {task.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Title & Description (Fields: Title & Description) */}
            <div>
              <h1 className={`text-2xl sm:text-3xl font-orbitron font-extrabold tracking-tight mb-3 ${
                isCompleted ? 'text-slate-400 line-through' : 'text-white'
              }`}>
                {task.title}
              </h1>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/90 leading-relaxed font-sans text-sm text-slate-300">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1.5">
                  MISSION BRIEFING / DESCRIPTION
                </h4>
                <p className="whitespace-pre-wrap">{task.description}</p>
              </div>
            </div>

            {/* Due Date & Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Due Date Card (Field: Due: 28 Aug 2026) */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">TARGET DUE DATE</span>
                    <span className="text-sm font-mono font-bold text-white">{task.due}</span>
                  </div>
                </div>

                {countdown && (
                  <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700 ${countdown.color}`}>
                    {countdown.label}
                  </span>
                )}
              </div>

              {/* Subroutine Completion Meter */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">SUBTASKS METRIC</span>
                    <span className="text-sm font-mono font-bold text-white">
                      {completedSubtasks} / {totalSubtasks} Completed
                    </span>
                  </div>
                </div>

                <span className="text-sm font-orbitron font-bold text-purple-300">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Subtasks Checklist Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-cyan-400" />
                  <span>ACTIONABLE CHECKLIST</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Interactive State Toggle
                </span>
              </div>

              <div className="space-y-2">
                {task.subtasks && task.subtasks.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                      sub.completed 
                        ? 'bg-slate-950/40 border-emerald-500/20 text-slate-400' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-cyan-500/30'
                    }`}
                  >
                    <button
                      onClick={() => toggleSubtask(task.id, sub.id)}
                      className="flex items-center gap-3 text-left flex-1 group"
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        sub.completed 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'border border-slate-700 group-hover:border-cyan-400 text-slate-500'
                      }`}>
                        {sub.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3 h-3" />}
                      </div>
                      <span className={`text-xs font-mono ${sub.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {sub.title}
                      </span>
                    </button>

                    <button
                      onClick={() => deleteSubtask(task.id, sub.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove Subroutine"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Add Subtask Input */}
                <form onSubmit={handleAddSub} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add step to checklist..."
                    className="flex-1 cyber-input rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Task Meta Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
              </div>
              {task.completedAt && (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accomplished: {new Date(task.completedAt).toLocaleString()}</span>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="glass-panel max-w-md w-full rounded-2xl p-6 border border-rose-500/40 shadow-glow-rose space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <h3 className="text-base font-orbitron font-bold text-white">PURGE MISSION PROTOCOL</h3>
            </div>
            <p className="text-xs font-sans text-slate-300 leading-relaxed">
              Are you certain you wish to purge <span className="font-mono text-cyan-300">[{task.id}: {task.title}]</span>? This action deletes the task from persistent memory.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700 transition-colors"
              >
                Abort
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono transition-colors shadow-glow-rose"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
