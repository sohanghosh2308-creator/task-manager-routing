import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Fingerprint, 
  Lock, 
  Unlock, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  User,
  Zap,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const Login = () => {
  const { isAuthenticated, user, login, logout, rememberMe, setRememberMe } = useAuth();
  const { playSound } = useSound();
  const location = useLocation();
  const navigate = useNavigate();

  // If redirected by ProtectedRoute, location.state.from contains the destination
  const from = location.state?.from?.pathname || '/';
  const interceptedReason = location.state?.reason;

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Chief Security & Systems Architect');
  const [localRemember, setLocalRemember] = useState(rememberMe);

  // Field touch states for validation
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  // Password Strength Calculation (Assignment 7 Validation Requirement)
  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: 'Empty',
        color: 'bg-slate-700',
        textColor: 'text-slate-500',
        percent: 0,
        checks: {
          length: false,
          upper: false,
          lower: false,
          number: false,
          special: false
        }
      };
    }

    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };

    let score = 0;
    if (checks.length) score++;
    if (checks.upper) score++;
    if (checks.lower) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    let label = 'Very Weak';
    let color = 'bg-rose-500';
    let textColor = 'text-rose-400';
    let percent = 20;

    if (score === 2) {
      label = 'Weak';
      color = 'bg-amber-500';
      textColor = 'text-amber-400';
      percent = 40;
    } else if (score === 3) {
      label = 'Moderate';
      color = 'bg-yellow-400';
      textColor = 'text-yellow-300';
      percent = 60;
    } else if (score === 4) {
      label = 'Strong';
      color = 'bg-cyan-400';
      textColor = 'text-cyan-300';
      percent = 80;
    } else if (score === 5) {
      label = 'Ultra Secure (Max Entropy)';
      color = 'bg-emerald-400';
      textColor = 'text-emerald-400';
      percent = 100;
    }

    return { score, label, color, textColor, percent, checks };
  }, [password]);

  // Validation errors
  const usernameError = useMemo(() => {
    if ((usernameTouched || formSubmitted) && !username.trim()) {
      return 'Username is required to issue cryptographic token.';
    }
    if ((usernameTouched || formSubmitted) && username.trim().length < 3) {
      return 'Username must be at least 3 characters.';
    }
    return null;
  }, [username, usernameTouched, formSubmitted]);

  const passwordError = useMemo(() => {
    if ((passwordTouched || formSubmitted) && !password) {
      return 'Password is required for security clearance.';
    }
    return null;
  }, [password, passwordTouched, formSubmitted]);

  // One-Click Demo Credentials Auto-Fill
  const handleDemoFill = () => {
    playSound('click');
    setUsername('sohanghosh');
    setPassword('Sohan@SecurePass2026!');
    setSelectedRole('Chief Security & Systems Architect');
    setUsernameTouched(false);
    setPasswordTouched(false);
  };

  const handleAuthorize = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!username.trim() || !password) {
      playSound('delete');
      return;
    }

    playSound('access');
    setAuthenticating(true);

    // Simulate high-tech cryptographic handshake and JWT generation
    setTimeout(() => {
      login({
        username: username.trim(),
        role: selectedRole,
        remember: localRemember
      });
      setAuthenticating(false);
      playSound('complete');
      navigate(from, { replace: true });
    }, 900);
  };

  const handleRevoke = () => {
    playSound('delete');
    logout();
  };

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-10 space-y-6">
      {/* Title & Assignment 7 Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-1">
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>AEGIS // SECURITY CLEARANCE GATE [ASSIGNMENT 7]</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white tracking-wide">
          AUTONOMOUS AUTHENTICATION GATEWAY
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto">
          Protected Dashboard Route Guard, JWT Token Simulation, and Real-time Password Entropy Verification.
        </p>
      </div>

      {/* Security Gate Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Redirect Notice if intercepted by ProtectedRoute */}
        {location.state?.from && (
          <div className="mb-6 p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs font-mono flex items-start gap-3 animate-in slide-in-from-top-2">
            <ShieldAlert className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <span className="font-bold text-purple-300 uppercase block">
                PROTECTED ROUTE INTERCEPTED: {from}
              </span>
              <p className="text-slate-300 text-[11px]">
                {interceptedReason || 'Authentication required to unlock restricted Dashboard and Mission Control.'}
              </p>
            </div>
          </div>
        )}

        {/* IF USER IS ALREADY AUTHENTICATED */}
        {isAuthenticated ? (
          <div className="space-y-6 text-center py-4">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 shadow-glow-emerald flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-orbitron font-bold text-white mb-1">
                CLEARANCE ACTIVE // ACCESS GRANTED
              </h2>
              <p className="text-xs font-mono text-emerald-300">
                Operative: <strong className="text-white">Sohan Ghosh</strong> // {user?.role || 'Chief Security Architect'}
              </p>
              <div className="mt-2 text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                JWT Token Active • Destination: <span className="text-cyan-400 font-semibold">{from}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
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
                <span>ENTER DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATION FORM (LOGIN / REGISTER) */
          <div>
            {/* Tabs for Login vs Register */}
            <div className="flex items-center border-b border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setActiveTab('login');
                }}
                className={`flex-1 pb-3 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 border-b-2 ${
                  activeTab === 'login'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>OPERATIVE LOGIN</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setActiveTab('register');
                }}
                className={`flex-1 pb-3 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 border-b-2 ${
                  activeTab === 'register'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>REGISTER OPERATIVE</span>
              </button>
            </div>

            {/* Quick Demo Credentials Autofill Banner */}
            <div className="mb-5 p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">
                  Quick Evaluation Demo: <strong className="text-cyan-300">Sohan Ghosh</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono font-semibold transition-all active:scale-95"
              >
                <span>⚡ Auto-fill Demo Credentials</span>
              </button>
            </div>

            <form onSubmit={handleAuthorize} className="space-y-4">
              {/* Field 1: Username (Required Validation) */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Operative Username</span>
                    <span className="text-rose-400">*</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Required</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => setUsernameTouched(true)}
                    placeholder="Enter operative username (e.g. sohanghosh)"
                    disabled={authenticating}
                    className={`w-full cyber-input rounded-xl p-3 text-xs font-mono bg-slate-900 border ${
                      usernameError ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  {username && !usernameError && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-3.5 pointer-events-none" />
                  )}
                </div>
                {usernameError && (
                  <p className="mt-1 text-xs font-mono text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{usernameError}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Password (Required Validation + Show/Hide) */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Security Passkey</span>
                    <span className="text-rose-400">*</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Required</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="Enter security passkey"
                    disabled={authenticating}
                    className={`w-full cyber-input rounded-xl p-3 pr-10 text-xs font-mono bg-slate-900 border ${
                      passwordError ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-xs font-mono text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              {/* Requirement: Display Password Strength */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase text-[11px]">Password Strength:</span>
                  <span className={`font-bold ${passwordStrength.textColor}`}>
                    {passwordStrength.label}
                  </span>
                </div>

                {/* Animated Dynamic Strength Progress Bar */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
                    style={{ width: `${passwordStrength.percent}%` }}
                  />
                </div>

                {/* Password Criteria Checklist */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.length ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <Check className={`w-3 h-3 ${passwordStrength.checks.length ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>8+ Characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.upper ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <Check className={`w-3 h-3 ${passwordStrength.checks.upper ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Uppercase (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.lower ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <Check className={`w-3 h-3 ${passwordStrength.checks.lower ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Lowercase (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.number ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <Check className={`w-3 h-3 ${passwordStrength.checks.number ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Number (0-9)</span>
                  </div>
                  <div className={`col-span-2 flex items-center gap-1.5 ${passwordStrength.checks.special ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <Check className={`w-3 h-3 ${passwordStrength.checks.special ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Special Character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>

              {/* Operative Persona Role */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 uppercase">
                  Clearance Designation Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  disabled={authenticating}
                  className="w-full cyber-input rounded-xl p-3 text-xs font-mono bg-slate-900 border border-slate-800 text-slate-200"
                >
                  <option value="Chief Security & Systems Architect">Sohan Ghosh // Chief Security & Systems Architect</option>
                  <option value="Quantum Cryptography Specialist">Sohan Ghosh // Quantum Cryptography Specialist</option>
                  <option value="Lead Cyber Defense Commander">Sohan Ghosh // Lead Cyber Defense Commander</option>
                </select>
              </div>

              {/* Requirement: Remember User */}
              <div className="pt-1 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={localRemember}
                  onChange={(e) => {
                    playSound('click');
                    setLocalRemember(e.target.checked);
                    setRememberMe(e.target.checked);
                  }}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40"
                />
                <label htmlFor="rememberMe" className="text-xs font-mono text-slate-300 cursor-pointer">
                  <span className="font-semibold block text-cyan-300">Remember Operative (Persistent LocalStorage)</span>
                  <span className="text-[11px] text-slate-400 font-sans">
                    Keep JWT token and session persisted across browser restarts. Uncheck to use ephemeral SessionStorage.
                  </span>
                </label>
              </div>

              {/* Biometric Status Visualizer */}
              <div className="flex flex-col items-center justify-center text-center py-2">
                <div className="relative mb-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                    authenticating
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-glow-cyan text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <Fingerprint className={`w-8 h-8 ${authenticating ? 'animate-pulse scale-110 text-cyan-400' : ''}`} />
                  </div>
                  {authenticating && (
                    <span className="absolute inset-0 rounded-2xl border-2 border-cyan-400 animate-ping pointer-events-none"></span>
                  )}
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  {authenticating ? 'GENERATING CRYPTOGRAPHIC JWT SIGNATURE...' : 'READY FOR AUTHENTICATION HANDSHAKE'}
                </p>
              </div>

              {/* Submit Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={authenticating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <Unlock className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {authenticating 
                      ? 'AUTHORIZING LEVEL 5 CLEARANCE...' 
                      : activeTab === 'register' 
                        ? 'REGISTER OPERATIVE & ISSUE JWT' 
                        : 'AUTHORIZE LEVEL 5 CLEARANCE & LOGIN'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
