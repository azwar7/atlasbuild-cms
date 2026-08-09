'use client';

import { useState } from 'react';
import { RfpAnalysisResult } from '@/features/quotes-rfp/schemas/rfpAiSchema';

export interface RfpAiAnalysisDrawerProps {
  proposalId: string;
  projectTitle: string;
  clientCompany?: string | null;
  clientName: string;
  analysis: RfpAnalysisResult | null;
  analyzedAt?: string | null;
  version?: string | null;
  providerUsed?: string | null;
  humanPriority?: string | null;
  isAnalyzing: boolean;
  analysisError: string | null;
  onClose: () => void;
  onReanalyze: () => void;
  onOverridePriority?: (priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') => Promise<void>;
}

export default function RfpAiAnalysisDrawer({
  proposalId,
  projectTitle,
  clientCompany,
  clientName,
  analysis,
  analyzedAt,
  version,
  providerUsed,
  humanPriority,
  isAnalyzing,
  analysisError,
  onClose,
  onReanalyze,
  onOverridePriority,
}: RfpAiAnalysisDrawerProps) {
  const [isOverriding, setIsOverriding] = useState(false);
  const [overrideSuccessMsg, setOverrideSuccessMsg] = useState<string | null>(null);

  // Formatting helpers
  const getPriorityBadgeClass = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse';
      case 'HIGH':
        return 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]';
      case 'MEDIUM':
        return 'bg-amber-500/20 border-amber-500/50 text-amber-300';
      case 'LOW':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
      default:
        return 'bg-white/10 border-white/20 text-white';
    }
  };

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case 'CONTACT_IMMEDIATELY':
        return 'bg-purple-500/25 text-purple-200 border-purple-400/50 shadow-[0_0_10px_rgba(192,132,252,0.3)]';
      case 'PRIORITIZE_REVIEW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'REQUEST_INFORMATION':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'STANDARD_REVIEW':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'DEFER':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  const handlePrioritySelect = async (newPriority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
    if (!onOverridePriority) return;
    setIsOverriding(true);
    try {
      await onOverridePriority(newPriority);
      setOverrideSuccessMsg(`Priority manually set to ${newPriority}`);
      setTimeout(() => setOverrideSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update priority');
    } finally {
      setIsOverriding(false);
    }
  };

  const activePriorityLevel = humanPriority || analysis?.priorityLevel || 'MEDIUM';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end transition-opacity animate-in fade-in duration-200">
      
      {/* Backdrop listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Content */}
      <div className="relative w-full max-w-2xl bg-[#0f1524] border-l border-[#7dd3fc]/30 h-full flex flex-col shadow-2xl overflow-hidden z-10">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#334155]/40 bg-[#0A0E1A]/90 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc]">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>AI RFP PRIORITIZATION & AUDIT</span>
              <span>•</span>
              <span>RFP #{proposalId}</span>
              {providerUsed && (
                <>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-[#7dd3fc]/15 border border-[#7dd3fc]/30 text-[10px] font-bold text-[#7dd3fc]">
                    {providerUsed}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl font-headline font-bold text-white tracking-tight">
              {projectTitle}
            </h2>
            <p className="text-xs text-white/60">
              Submitted by <span className="text-white font-medium">{clientName}</span> ({clientCompany || 'Private Entity'})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Advisory Notice Banner */}
          <div className="p-3.5 rounded-xl bg-[#7dd3fc]/5 border border-[#7dd3fc]/20 text-xs text-[#7dd3fc]/90 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#7dd3fc] text-[18px] shrink-0 mt-0.5">info</span>
            <p className="leading-relaxed text-[11px]">
              <strong className="font-bold text-white">Advisory Prioritization Notice:</strong> AI priority rankings assist estimators in identifying urgent leads. Admin estimators retain full authority to override priority decisions.
            </p>
          </div>

          {/* Toast Notification */}
          {overrideSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{overrideSuccessMsg}</span>
            </div>
          )}

          {/* Loading State Overlay */}
          {isAnalyzing && (
            <div className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center gap-4 text-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-[#7dd3fc] border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-amber-400 border-b-transparent animate-spin duration-700"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-mono">Analyzing RFP Technical Scope & Lead Priority...</p>
                <div className="text-xs text-white/60 space-y-0.5 font-sans">
                  <p className="animate-pulse">Evaluating commercial opportunity vs execution risk</p>
                  <p className="text-[11px] text-[#7dd3fc]">Calculating priority score & recommended actions</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {analysisError && !isAnalyzing && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>AI Analysis Execution Failed</span>
              </div>
              <p className="font-mono text-[11px]">{analysisError}</p>
              <button
                onClick={onReanalyze}
                className="mt-2 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-bold text-[11px] transition-colors cursor-pointer"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {/* Analysis Findings */}
          {analysis && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Phase 1B Tri-Score Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Priority Score & Badge */}
                <div className={`p-4 rounded-2xl border flex flex-col justify-between ${getPriorityBadgeClass(activePriorityLevel)}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">AI Lead Priority</span>
                    {humanPriority && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">HUMAN OVERRIDE</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold font-mono tracking-tight">{analysis.priorityScore ?? 75}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold font-mono border ${getPriorityBadgeClass(activePriorityLevel)}`}>
                      {activePriorityLevel}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold mt-1 opacity-80">
                    Weighted 65% Opportunity / 35% Risk
                  </span>
                </div>

                {/* Opportunity Score */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Opportunity Score</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">{analysis.opportunityScore ?? analysis.leadScore}</span>
                    <span className="text-xs font-mono text-emerald-400/60">/ 100</span>
                  </div>
                  <span className="text-[10px] text-white/50 mt-1">Project scale & sector attractiveness</span>
                </div>

                {/* Risk Score */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Risk Score</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono text-amber-400 tracking-tight">{analysis.riskScore ?? 45}</span>
                    <span className="text-xs font-mono text-amber-400/60">/ 100</span>
                  </div>
                  <span className="text-[10px] text-white/50 mt-1">Scope gaps & technical uncertainty</span>
                </div>

              </div>

              {/* Priority Reason & Recommended Action Banner */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <h3 className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">assistant_navigation</span>
                    Recommended Action
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border self-start ${getActionBadgeClass(analysis.recommendedAction)}`}>
                    {analysis.recommendedAction.replace(/_/g, ' ')}
                  </span>
                </div>

                {analysis.priorityReason && (
                  <p className="text-xs text-white/90 leading-relaxed font-sans pt-1">
                    <strong className="font-bold text-white">Priority Explanation: </strong>
                    {analysis.priorityReason}
                  </p>
                )}
              </div>

              {/* Executive Summary */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h3 className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">summarize</span>
                  Executive Technical Summary
                </h3>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  {analysis.executiveSummary}
                </p>
              </div>

              {/* Key Positive Strategic Factors */}
              {analysis.keyPositiveFactors && analysis.keyPositiveFactors.length > 0 && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">stars</span>
                    Key Strategic Opportunities ({analysis.keyPositiveFactors.length})
                  </h3>
                  <ul className="space-y-2 text-xs text-emerald-100 font-sans">
                    {analysis.keyPositiveFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-black/20 p-2.5 rounded-xl border border-emerald-500/20">
                        <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0 mt-0.5">verified</span>
                        <span className="leading-snug">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Information Notice */}
              {analysis.missingInformation && analysis.missingInformation.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    Missing Scope Parameters ({analysis.missingInformation.length})
                  </h3>
                  <ul className="space-y-2 text-xs text-amber-100 font-mono">
                    {analysis.missingInformation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-black/20 p-2.5 rounded-xl border border-amber-500/20">
                        <span className="material-symbols-outlined text-amber-400 text-[16px] shrink-0 mt-0.5">help_outline</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Next Steps */}
              {analysis.recommendedNextSteps && analysis.recommendedNextSteps.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">checklist</span>
                    Recommended Estimator Action Items
                  </h3>
                  <ol className="space-y-2 text-xs text-white/90 list-decimal list-inside font-sans">
                    {analysis.recommendedNextSteps.map((step, idx) => (
                      <li key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Footer Timestamp & Engine Info */}
              {analyzedAt && (
                <div className="pt-2 text-right text-[10px] font-mono text-white/40 flex items-center justify-between">
                  <span>Engine: {providerUsed || 'UNKNOWN'} • v{version || '1.1.0'}</span>
                  <span>Analyzed: {new Date(analyzedAt).toLocaleString()}</span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-[#334155]/40 bg-[#0A0E1A]/90 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={onReanalyze}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Re-analyze
            </button>

            {/* Human Override Dropdown */}
            {onOverridePriority && (
              <div className="relative inline-block text-left">
                <select
                  disabled={isOverriding}
                  value={humanPriority || ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      handlePrioritySelect(e.target.value as any);
                    }
                  }}
                  className="px-3 py-2 bg-[#0f1524] border border-amber-500/40 text-amber-300 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>⚡ Override Priority...</option>
                  <option value="CRITICAL">Set CRITICAL Priority</option>
                  <option value="HIGH">Set HIGH Priority</option>
                  <option value="MEDIUM">Set MEDIUM Priority</option>
                  <option value="LOW">Set LOW Priority</option>
                </select>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#7dd3fc] text-[#001f2e] font-bold rounded-xl text-xs hover:bg-white transition-all shadow-[0_0_10px_rgba(125,211,252,0.3)] cursor-pointer"
          >
            Close Analysis
          </button>
        </div>

      </div>
    </div>
  );
}
