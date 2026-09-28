import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useSound } from './SoundContext';

const TaskContext = createContext();

const INITIAL_TASKS = [
  {
    id: 'TSK-101',
    title: 'Deploy Quantum Encryption Layer',
    description: 'Implement post-quantum lattice cryptography across edge API gateways to mitigate harvest-now-decrypt-later vectors.',
    priority: 'Critical',
    category: 'Cyber Security',
    due: '2026-08-28', // As requested in assignment: 28 Aug 2026
    status: 'In Progress',
    createdAt: '2026-08-20T10:30:00.000Z',
    completedAt: null,
    subtasks: [
      { id: 'sub-1', title: 'Generate Kyber-1024 master keypairs', completed: true },
      { id: 'sub-2', title: 'Audit TLS 1.4 hybrid cipher suites', completed: true },
      { id: 'sub-3', title: 'Conduct zero-knowledge handshake stress tests', completed: false }
    ],
    tags: ['Cryptography', 'Edge Gateway', 'Security']
  },
  {
    id: 'TSK-102',
    title: 'Fine-tune Neural Copilot Model',
    description: 'Train local multi-modal agent weights on domain-specific system schematics with Flash-LoRA adapters.',
    priority: 'High',
    category: 'AI & Neural',
    due: '2026-08-28', // 28 Aug 2026
    status: 'Todo',
    createdAt: '2026-08-21T14:15:00.000Z',
    completedAt: null,
    subtasks: [
      { id: 'sub-4', title: 'Curate high-entropy token dataset', completed: true },
      { id: 'sub-5', title: 'Run 8-bit quantized validation epoch', completed: false }
    ],
    tags: ['Machine Learning', 'LoRA', 'Weights']
  },
  {
    id: 'TSK-103',
    title: 'Refactor React Router Architecture',
    description: 'Upgrade routing configuration to React Router with nested layout outlets, dynamic param validation, and auth guards.',
    priority: 'High',
    category: 'Development',
    due: '2026-08-30',
    status: 'Completed',
    createdAt: '2026-08-18T09:00:00.000Z',
    completedAt: '2026-08-25T16:20:00.000Z',
    subtasks: [
      { id: 'sub-6', title: 'Build protected route higher order wrapper', completed: true },
      { id: 'sub-7', title: 'Implement deep link URL query parameter persistence', completed: true }
    ],
    tags: ['React', 'SPA', 'Routing']
  },
  {
    id: 'TSK-104',
    title: 'Calibrate Holographic HUD Widgets',
    description: 'Tune backdrop-filter Gaussian blurs and Canvas particle force field vectors for 120 FPS render loops.',
    priority: 'Medium',
    category: 'Infrastructure',
    due: '2026-09-05',
    status: 'In Progress',
    createdAt: '2026-08-22T11:40:00.000Z',
    completedAt: null,
    subtasks: [
      { id: 'sub-8', title: 'Measure LCP paint times on high DPI screens', completed: true },
      { id: 'sub-9', title: 'Optimize Web Audio oscillator memory lifecycle', completed: false }
    ],
    tags: ['Performance', 'Canvas', 'WebGL']
  },
  {
    id: 'TSK-105',
    title: 'Archive Biometric Sentinel Audit Logs',
    description: 'Automated rotation and decentralized backup of system access attempts and telemetry nodes.',
    priority: 'Low',
    category: 'Operations',
    due: '2026-09-12',
    status: 'Completed',
    createdAt: '2026-08-15T08:00:00.000Z',
    completedAt: '2026-08-24T18:00:00.000Z',
    subtasks: [
      { id: 'sub-10', title: 'Export encrypted cold-storage snapshot', completed: true },
      { id: 'sub-11', title: 'Verify SHA-512 block checksums', completed: true }
    ],
    tags: ['Auditing', 'Storage', 'Logs']
  },
  {
    id: 'TSK-106',
    title: 'Run Core Fault Tolerance Simulation',
    description: 'Simulate concurrent multi-region latency spikes and test automatic circuit breaker recovery triggers.',
    priority: 'Critical',
    category: 'Development',
    due: '2026-09-02',
    status: 'Todo',
    createdAt: '2026-08-24T13:00:00.000Z',
    completedAt: null,
    subtasks: [
      { id: 'sub-12', title: 'Inject artificial network jitter packet drop', completed: false },
      { id: 'sub-13', title: 'Verify failover under 150ms threshold', completed: false }
    ],
    tags: ['Chaos Testing', 'Circuit Breaker']
  }
];

export const TaskProvider = ({ children }) => {
  const { playSound } = useSound();
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('synapse_tasks_list') || localStorage.getItem('nexus_tasks_list');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_TASKS;
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('synapse_tasks_list', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Trigger high-tech visual confetti effect
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#10b981', '#ffffff']
      });
    } catch {
      // fallback if canvas not available
    }
  };

  // Add Task
  const addTask = (taskData) => {
    const newId = `TSK-${Math.floor(100 + Math.random() * 900)}`;
    const newTask = {
      id: newId,
      title: taskData.title?.trim() || 'Untitled Objective',
      description: taskData.description?.trim() || '',
      priority: taskData.priority || 'Medium',
      category: taskData.category || 'Development',
      due: taskData.due || '2026-08-28',
      status: taskData.status || 'Todo',
      createdAt: new Date().toISOString(),
      completedAt: taskData.status === 'Completed' ? new Date().toISOString() : null,
      subtasks: taskData.subtasks || [],
      tags: taskData.tags || [taskData.category || 'General']
    };

    setTasks(prev => [newTask, ...prev]);
    playSound('access');
    addToast(`Task [${newId}] initiated successfully.`, 'success');
    return newTask;
  };

  // Update Task
  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isNowCompleted = updatedFields.status === 'Completed' && t.status !== 'Completed';
        if (isNowCompleted) {
          triggerConfetti();
          playSound('complete');
        } else {
          playSound('click');
        }

        return {
          ...t,
          ...updatedFields,
          completedAt: updatedFields.status === 'Completed' ? (t.completedAt || new Date().toISOString()) : null,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
    addToast(`Task [${id}] parameters updated.`, 'info');
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    playSound('delete');
    addToast(`Task [${id}] purged from mainframe.`, 'warning');
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'Todo' : 'Completed';
        if (nextStatus === 'Completed') {
          triggerConfetti();
          playSound('complete');
          addToast(`Mission accomplished: [${t.title}]`, 'success');
        } else {
          playSound('click');
          addToast(`Task [${t.id}] reactivated.`, 'info');
        }
        return {
          ...t,
          status: nextStatus,
          completedAt: nextStatus === 'Completed' ? new Date().toISOString() : null,
          // If completed, optionally mark all subtasks complete
          subtasks: nextStatus === 'Completed' 
            ? t.subtasks.map(s => ({ ...s, completed: true }))
            : t.subtasks
        };
      }
      return t;
    }));
  };

  // Subtask handling
  const toggleSubtask = (taskId, subtaskId) => {
    playSound('click');
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updatedSubtasks = t.subtasks.map(s => 
          s.id === subtaskId ? { ...s, completed: !s.completed } : s
        );
        const allCompleted = updatedSubtasks.length > 0 && updatedSubtasks.every(s => s.completed);
        
        if (allCompleted && t.status !== 'Completed') {
          triggerConfetti();
          playSound('complete');
        }

        return {
          ...t,
          subtasks: updatedSubtasks,
          status: allCompleted ? 'Completed' : t.status,
          completedAt: allCompleted ? (t.completedAt || new Date().toISOString()) : t.completedAt
        };
      }
      return t;
    }));
  };

  const addSubtask = (taskId, title) => {
    if (!title?.trim()) return;
    playSound('click');
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newSub = {
          id: `sub-${Date.now()}`,
          title: title.trim(),
          completed: false
        };
        return {
          ...t,
          subtasks: [...(t.subtasks || []), newSub]
        };
      }
      return t;
    }));
  };

  const deleteSubtask = (taskId, subtaskId) => {
    playSound('delete');
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.filter(s => s.id !== subtaskId)
        };
      }
      return t;
    }));
  };

  // Get single task by ID
  const getTaskById = (id) => {
    return tasks.find(t => t.id.toLowerCase() === id?.toLowerCase());
  };

  // Reset to original samples
  const resetToDefaults = () => {
    setTasks(INITIAL_TASKS);
    playSound('alert');
    addToast('All tasks restored to default simulation state.', 'info');
  };

  // Statistics calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const todoTasks = tasks.filter(t => t.status === 'Todo').length;
  const criticalTasks = tasks.filter(t => t.priority === 'Critical' && t.status !== 'Completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <TaskContext.Provider value={{
      tasks,
      toasts,
      removeToast,
      addToast,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      toggleSubtask,
      addSubtask,
      deleteSubtask,
      getTaskById,
      resetToDefaults,
      stats: {
        total: totalTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
        todo: todoTasks,
        critical: criticalTasks,
        completionRate
      }
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
