import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Fingerprint, 
  Lock, 
  Unlock, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const Login = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { playSound } = useSound();
  const location = useLocation();
  const navigate = useNavigate();

  // If redirected by ProtectedRoute, location.state.from contains the destination
  const from = location.state?.from?.pathname || '/';

  const [scanning, setScanning] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || 'Lead Core Systems Engineer');

  const handleAuthorize = () => {
    playSound('access');
    setScanning(true);

    setTimeout(() => {
      login({
        name: 'Sohan Ghosh',
        title: 'Sohan Ghosh (Architect)',
        role: selectedRole,
        clearance: 'Alpha Clearance [L5]'
      });
      setScanning(false);
      playSound('complete');
      navigate(from, { replace: true });
    }, 800);
  };

  const handleRevoke = () => {
    playSound('delete');
    logout();
  };

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>ROUTING SECURITY SENTINEL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
          SECURITY CLEARANCE GATE
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto">
          Assignment 6 Protected Route demonstration gate. Authenticate to unlock restricted operational routes like Add Task and Mission Dispatch.
        </p>
      </div>

      {/* Security Gate Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Redirect Notice if coming from a protected route */}
        {location.state?.from && (
          <div className="mb-6 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs font-mono flex items-center gap-2.5 animate-in slide-in-from-top-2">
            <ShieldAlert className="w-4 h-4 text-purple-400 flex-shrink-0 animate-pulse" />
            <span>
              Restricted destination intercepted: <strong className="text-white">{from}</strong>. Authorization required to proceed.
            </span>
          </div>
        )}

        {/* Biometric Status Visualizer */}
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="relative mb-4">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 border ${
              isAuthenticated 
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-glow-emerald text-emerald-400' 
                : 'bg-slate-900 border-cyan-500/40 shadow-glow-cyan text-cyan-400'
            }`}>
              <Fingerprint className={`w-12 h-12 ${scanning ? 'animate-pulse scale-110' : ''}`} />
            </div>

            {/* Scanning radar sweep animation */}
            {scanning && (
              <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping"></span>
            )}
          </div>

          <h3 className="text-base font-orbitron font-bold text-white mb-1">
            {isAuthenticated ? 'CREDENTIALS VERIFIED' : 'BIOMETRIC ID REQUIRED'}
          </h3>
          <p className="text-xs font-mono text-slate-400">
            {isAuthenticated ? 'Level 5 Access Token Active' : 'Scan quantum passkey or execute quick override'}
          </p>
        </div>

        {/* Operative Details Form */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div>
            <label className="text-xs font-mono text-slate-300 block mb-1.5 uppercase">
              Operative Persona Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              disabled={scanning}
              className="w-full cyber-input rounded-xl p-3 text-xs font-mono bg-slate-900"
            >
              <option value="Lead Core Systems Engineer">Sohan Ghosh // Lead Core Systems Engineer</option>
              <option value="Quantum Security Specialist">Sohan Ghosh // Quantum Security Specialist</option>
              <option value="Cyber Defense Commander">Sohan Ghosh // Cyber Defense Commander</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={handleRevoke}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/40 font-mono text-xs font-bold transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>REVOKE CLEARANCE (LOGOUT)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(from)}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all"
                >
                  <span>PROCEED TO HUB</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleAuthorize}
                disabled={scanning}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                <Unlock className="w-4 h-4 stroke-[2.5]" />
                <span>{scanning ? 'AUTHORIZING BIOMETRIC SIGNATURE...' : 'AUTHORIZE LEVEL 5 CLEARANCE'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
