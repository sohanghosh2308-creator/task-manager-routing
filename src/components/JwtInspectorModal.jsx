import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound, 
  Copy, 
  Check, 
  RotateCw, 
  AlertTriangle, 
  X, 
  Cpu, 
  Lock, 
  Database,
  ExternalLink,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const JwtInspectorModal = ({ isOpen, onClose }) => {
  const { 
    jwtToken, 
    tokenDetails, 
    tokenStatus, 
    tokenError, 
    rememberMe, 
    refreshToken, 
    simulateTamper, 
    simulateExpire 
  } = useAuth();
  const { playSound } = useSound();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!jwtToken) return;
    navigator.clipboard.writeText(jwtToken);
    setCopied(true);
    playSound('complete');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatRemainingTime = (seconds) => {
    if (seconds <= 0) return 'EXPIRED';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl glass-panel rounded-3xl border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-orbitron font-bold text-white tracking-wide">
                  JWT SENTINEL // TOKEN TELEMETRY
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  RFC 7519
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Cryptographic authentication token inspection and live lifecycle simulator
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Token Status Strip */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Status */}
          <div className="p-3.5 rounded-xl border bg-slate-900/60 flex items-center gap-3">
            {tokenStatus === 'valid' ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0 animate-pulse" />
            )}
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Token Status</span>
              <span className={`text-xs font-mono font-bold ${
                tokenStatus === 'valid' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {tokenStatus === 'valid' ? 'VERIFIED & ACTIVE' : tokenError || 'INVALID'}
              </span>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-3">
            <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Token Lifetime</span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {tokenDetails ? formatRemainingTime(tokenDetails.remainingSeconds) : 'N/A'}
              </span>
            </div>
          </div>

          {/* Storage Mode */}
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Persistence Target</span>
              <span className="text-xs font-mono font-bold text-purple-300">
                {rememberMe ? 'LocalStorage (Remember Me)' : 'SessionStorage (Ephemeral)'}
              </span>
            </div>
          </div>
        </div>

        {/* Encoded JWT Token Display with Color Separation */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulated Encoded JWT Token</span>
            </label>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="text-rose-400">■ Header</span>
              <span className="text-purple-400">■ Payload</span>
              <span className="text-cyan-400">■ Signature</span>
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs break-all leading-relaxed select-all">
            {tokenDetails ? (
              <>
                <span className="text-rose-400 font-semibold">{tokenDetails.rawHeader}</span>
                <span className="text-slate-400 font-bold">.</span>
                <span className="text-purple-400 font-semibold">{tokenDetails.rawPayload}</span>
                <span className="text-slate-400 font-bold">.</span>
                <span className="text-cyan-400 font-semibold">{tokenDetails.rawSignature}</span>
              </>
            ) : (
              <span className="text-slate-500">No active JWT token found. Authenticate to generate.</span>
            )}

            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
              title="Copy Token"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Decoded Header and Payload Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Decoded Header */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>Decoded Header</span>
              <span className="text-[10px] font-normal text-slate-400">(Algorithm & Token Type)</span>
            </span>
            <pre className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/20 text-rose-300 text-xs font-mono overflow-x-auto">
              {JSON.stringify(tokenDetails?.header || { alg: 'HS256', typ: 'JWT' }, null, 2)}
            </pre>
          </div>

          {/* Decoded Payload */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>Decoded Payload</span>
              <span className="text-[10px] font-normal text-slate-400">(Claims & Operative Data)</span>
            </span>
            <pre className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/20 text-purple-300 text-xs font-mono overflow-x-auto">
              {JSON.stringify(tokenDetails?.payload || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Security Simulation Actions */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
            Security & Route Guard Simulation Controls
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Refresh Token */}
            <button
              onClick={() => {
                playSound('complete');
                refreshToken();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/50 text-cyan-300 text-xs font-mono font-bold transition-all shadow-glow-cyan"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>REFRESH TOKEN (1H)</span>
            </button>

            {/* Test Expiry */}
            <button
              onClick={() => {
                playSound('delete');
                simulateExpire();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 hover:bg-amber-900/40 text-amber-300 text-xs font-mono font-bold transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>TEST EXPIRE TOKEN</span>
            </button>

            {/* Test Tamper */}
            <button
              onClick={() => {
                playSound('delete');
                simulateTamper();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/30 border border-rose-500/40 hover:bg-rose-900/40 text-rose-300 text-xs font-mono font-bold transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TEST TAMPER ATTACK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
