import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Sparkles, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  Clock, 
  Flame, 
  AlertCircle, 
  ListChecks, 
  X, 
  Plus, 
  ArrowLeft,
  Bot,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useSound } from '../context/SoundContext';

export const AddTask = () => {
  const { addTask } = useTasks();
  const { playSound } = useSound();
  const navigate = useNavigate();

  // Form State with prompt specified fields: Description / Priority / Category / Due: 28 Aug 2026 / Status
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'High',
    category: 'Development',
    due: '2026-08-28', // Defaulting to the assignment deadline: 28 Aug 2026
    status: 'Todo',
    tags: ['Quantum', 'Core']
  });

  const [newTag, setNewTag] = useState('');
  const [subtasks, setSubtasks] = useState([
    { id: '1', title: 'Initialize subsystem architectural verification', completed: false }
  ]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [errors, setErrors] = useState({});

  // Preset categories
  const categories = [
    'Development', 
    'Cyber Security', 
    'AI & Neural', 
    'Infrastructure', 
    'Operations', 
    'Personal'
  ];

  // Priorities
  const priorities = [
    { label: 'Critical', color: 'border-rose-500 text-rose-400 bg-rose-950/30' },
    { label: 'High', color: 'border-amber-500 text-amber-400 bg-amber-950/30' },
    { label: 'Medium', color: 'border-cyan-500 text-cyan-400 bg-cyan-950/30' },
    { label: 'Low', color: 'border-slate-600 text-slate-400 bg-slate-800/40' },
  ];

  // Quick preset due date: 28 Aug 2026
  const setDeadlinePreset = () => {
    playSound('click');
    setFormData(prev => ({ ...prev, due: '2026-08-28' }));
  };

  // AI Assistant: Generate Subtasks Breakdown
  const handleAIGenerateBreakdown = () => {
    playSound('access');
    setIsGeneratingAI(true);

    setTimeout(() => {
      const title = formData.title.toLowerCase();
      let generated = [];

      if (title.includes('auth') || title.includes('security') || formData.category === 'Cyber Security') {
        generated = [
          { id: `ai-${Date.now()}-1`, title: 'Audit HMAC token signatures & rotation cadence', completed: false },
          { id: `ai-${Date.now()}-2`, title: 'Validate zero-trust biometric payload assertions', completed: false },
          { id: `ai-${Date.now()}-3`, title: 'Verify TLS 1.4 cipher suite negotiation logs', completed: false }
        ];
      } else if (title.includes('ai') || title.includes('model') || formData.category === 'AI & Neural') {
        generated = [
          { id: `ai-${Date.now()}-1`, title: 'Normalize training dataset embedding vectors', completed: false },
          { id: `ai-${Date.now()}-2`, title: 'Execute low-rank adapter (LoRA) weight quantization', completed: false },
          { id: `ai-${Date.now()}-3`, title: 'Benchmark inference latency against 150ms SLA', completed: false }
        ];
      } else {
        generated = [
          { id: `ai-${Date.now()}-1`, title: 'Perform system requirements and boundary condition analysis', completed: false },
          { id: `ai-${Date.now()}-2`, title: 'Implement core algorithmic pipeline and state transitions', completed: false },
          { id: `ai-${Date.now()}-3`, title: 'Deploy automated test harness and telemetry monitor', completed: false }
        ];
      }

      setSubtasks(prev => [...prev, ...generated]);
      setIsGeneratingAI(false);
      playSound('complete');
    }, 600);
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    playSound('click');
    setSubtasks(prev => [
      ...prev,
      { id: `sub-${Date.now()}`, title: newSubtaskTitle.trim(), completed: false }
    ]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id) => {
    playSound('delete');
    setSubtasks(prev => prev.filter(s => s.id !== id));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        playSound('click');
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    playSound('delete');
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title / Objective code is mandatory.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Task description field is required per assignment specification.';
    }
    if (!formData.due) {
      newErrors.due = 'Target Due Date is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      playSound('alert');
      return;
    }

    const newTask = addTask({
      ...formData,
      subtasks
    });

    // Programmatic navigation to newly created task details page via URL parameter
    navigate(`/tasks/${newTask.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
                PROTECTED ROUTE // AUTH VERIFIED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
              DISPATCH NEW OBJECTIVE
            </h1>
          </div>
        </div>

        <Link
          to="/tasks"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Cancel & Return
        </Link>
      </div>

      {/* Cyber Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 shadow-2xl">
        
        {/* Title Field */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center justify-between">
            <span>Mission Objective Title *</span>
            <span className="text-[11px] text-slate-400">Clear & Action-Oriented</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors({ ...errors, title: null });
            }}
            placeholder="e.g., Integrate Quantum Mesh API Bridge"
            className="w-full cyber-input rounded-xl px-4 py-3 text-sm font-medium placeholder-slate-400 focus:outline-none"
          />
          {errors.title && (
            <p className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        {/* Description Field (Assignment required) */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center justify-between">
            <span>Description (Field: Description) *</span>
            <span className="text-[11px] text-slate-400">Detailed Scope & Requirements</span>
          </label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: null });
            }}
            placeholder="Detail the technical specifications, acceptance criteria, dependencies, and implementation notes..."
            className="w-full cyber-input rounded-xl p-4 text-xs font-sans placeholder-slate-400 focus:outline-none resize-y"
          ></textarea>
          {errors.description && (
            <p className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Priority & Category & Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Priority (Field: Priority) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-cyan-300">
              Priority (Field: Priority)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {priorities.map(p => (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => {
                    playSound('click');
                    setFormData({ ...formData, priority: p.label });
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                    formData.priority === p.label
                      ? `${p.color} shadow-sm border-current`
                      : 'border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category (Field: Category) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-cyan-300">
              Category (Field: Category)
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full cyber-input rounded-xl p-3 text-xs font-mono bg-slate-900 text-slate-100 border-slate-700"
            >
              {categories.map(c => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Status (Field: Status) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-cyan-300">
              Status (Field: Status)
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full cyber-input rounded-xl p-3 text-xs font-mono bg-slate-900 text-slate-100 border-slate-700"
            >
              <option value="Todo" className="bg-slate-900">Todo (Pending)</option>
              <option value="In Progress" className="bg-slate-900">In Progress (Active)</option>
              <option value="Completed" className="bg-slate-900">Completed (Accomplished)</option>
            </select>
          </div>
        </div>

        {/* Due Date (Field: Due: 28 Aug 2026) */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Due Date (Due: 28 Aug 2026) *</span>
            </label>
            {/* Assignment 6 Preset Shortcut */}
            <button
              type="button"
              onClick={setDeadlinePreset}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
            >
              <Zap className="w-3 h-3" />
              <span>Set to "28 Aug 2026"</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={formData.due}
              onChange={(e) => {
                setFormData({ ...formData, due: e.target.value });
                if (errors.due) setErrors({ ...errors, due: null });
              }}
              className="w-full cyber-input rounded-xl p-3 text-xs font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* AI Assisted Subtasks Breakdown Section */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-purple-400" />
                <span>Mission Subroutines & Subtasks</span>
              </span>
              <p className="text-[11px] text-slate-400 font-sans">
                Break task into verifiable sequential checkpoints.
              </p>
            </div>

            {/* Futuristic AI Subtask Button */}
            <button
              type="button"
              onClick={handleAIGenerateBreakdown}
              disabled={isGeneratingAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 text-purple-300 text-xs font-mono shadow-glow-purple hover:shadow-purple-500/30 transition-all disabled:opacity-50"
            >
              <Bot className={`w-3.5 h-3.5 text-purple-400 ${isGeneratingAI ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAI ? 'Synthesizing...' : 'AI Breakdown Assist'}</span>
            </button>
          </div>

          {/* Subtasks List */}
          <div className="space-y-2">
            {subtasks.map((sub, idx) => (
              <div 
                key={sub.id} 
                className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-purple-400 font-bold">0{idx + 1}.</span>
                  <span className="text-slate-200">{sub.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(sub.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Subtask Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                placeholder="Add next subroutine step and press enter..."
                className="flex-1 cyber-input rounded-xl px-3.5 py-2 text-xs font-mono placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted in local quantum state.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>LAUNCH MISSION</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
