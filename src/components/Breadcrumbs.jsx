import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home, Shield, CheckSquare, PlusCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { getTaskById } = useTasks();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 mb-6 py-1 px-3 bg-cyan-950/20 border border-cyan-800/30 rounded-lg w-fit">
        <Home className="w-3.5 h-3.5 text-cyan-400" />
        <span>SYNAPSE // MAIN HUB // DASHBOARD</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors p-1 rounded"
      >
        <Home className="w-3.5 h-3.5" />
        <span>HUB</span>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        let displayName = value.toUpperCase();
        let Icon = null;

        if (value === 'tasks') {
          displayName = 'ALL MISSIONS';
        } else if (value === 'add-task') {
          displayName = 'INITIATE MISSION';
          Icon = PlusCircle;
        } else if (value === 'completed') {
          displayName = 'ACCOMPLISHED ARCHIVE';
          Icon = CheckSquare;
        } else if (value === 'login') {
          displayName = 'SECURITY ACCESS GATE';
          Icon = Shield;
        } else {
          // Check if this path segment is a task ID
          const task = getTaskById(value);
          if (task) {
            displayName = `${task.id}: ${task.title}`;
          }
        }

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            {isLast ? (
              <span className="text-cyan-300 font-semibold bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                {Icon && <Icon className="w-3 h-3 text-cyan-400" />}
                <span className="truncate max-w-[280px]">{displayName}</span>
              </span>
            ) : (
              <Link to={to} className="hover:text-cyan-400 transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
