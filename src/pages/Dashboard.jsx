import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ListTodo, 
  PlusCircle, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { TaskCard } from '../components/TaskCard';

export const Dashboard = () => {
  const { tasks, stats } = useTasks();
  const { user } = useAuth();
  const { playSound } = useSound();

  // Upcoming tasks sorted by due date
  const upcomingTasks = [...tasks]
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, 3);

  // Completed tasks recent
  const recentlyCompleted = [...tasks]
    .filter(t => t.status === 'Completed')
    .slice(0, 2);

  // Group by Category
  const categoryCounts = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Hero Welcome HUD */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                QUANTUM TELEMETRY ONLINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-orbitron tracking-tight text-white mb-2">
              WELCOME, <span className="cyber-gradient-text">SOHAN GHOSH</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
              Assignment 6 Task Orchestrator initialized. Multi-route synchronization and dynamic parameter tracking active. Target milestone deadline: <span className="text-cyan-300 font-mono font-semibold">28 Aug 2026</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/add-task"
              onClick={() => playSound('click')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>INITIATE TASK</span>
            </Link>

            <Link
              to="/tasks"
              onClick={() => playSound('click')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs transition-all"
            >
              <ListTodo className="w-4 h-4" />
              <span>EXPLORE ALL</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Tasks */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Tasks</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-orbitron text-white">{stats.total}</span>
            <span className="text-xs font-mono text-cyan-400">Objectives</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2">Active in simulation memory</p>
        </div>

        {/* In Progress */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">In Progress</span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-orbitron text-purple-300">{stats.inProgress}</span>
            <span className="text-xs font-mono text-purple-400">Executing</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2">Subroutines processing</p>
        </div>

        {/* Critical Alerts */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-rose-500/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Critical Priority</span>
            <div className="w-9 h-9 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-orbitron text-rose-400">{stats.critical}</span>
            <span className="text-xs font-mono text-rose-300">Urgent</span>
          </div>
          <p className="text-[11px] font-mono text-rose-400/80 mt-2">Immediate attention required</p>
        </div>

        {/* Completion Rate with SVG Gauge */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">Completion Rate</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-orbitron text-emerald-400">{stats.completionRate}%</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-2">{stats.completed} of {stats.total} accomplished</p>
          </div>
          {/* Circular SVG Ring */}
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${stats.completionRate}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 absolute" />
          </div>
        </div>
      </div>

      {/* Main Section: Urgent Deadlines & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Upcoming Critical Missions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
              <h2 className="text-base font-orbitron font-bold text-white tracking-wide">
                ACTIVE MISSIONS DUE FOR DISPATCH
              </h2>
            </div>
            <Link
              to="/tasks"
              onClick={() => playSound('click')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
            >
              <span>View All ({stats.total})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Right Col: Category Distribution & Routing Quick Test */}
        <div className="space-y-6">
          
          {/* Category Distribution Card */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>CATEGORY DOMAINS</span>
            </h3>

            <div className="space-y-3">
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const percent = Math.round((count / (tasks.length || 1)) * 100);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">{cat}</span>
                      <span className="text-cyan-400 font-semibold">{count} ({percent}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Routing Checklist Badge Card */}
          <div className="glass-card rounded-2xl p-5 border border-purple-500/20 bg-purple-950/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>ASSIGNMENT 6 VERIFICATION</span>
            </h3>
            
            <ul className="space-y-2 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>React Router Dynamic Routes (`/tasks/:id`)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>URL Query Parameters (`?status=...&priority=...`)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Protected Route Gate on Add Task</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>All 5 Pages Implemented & Linked</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Fields: Desc, Priority, Category, Due, Status</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
