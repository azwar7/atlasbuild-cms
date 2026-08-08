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
  isAnalyzing: boolean;
  analysisError: string | null;
  onClose: () => void;
  onReanalyze: () => void;
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
  isAnalyzing,
  analysisError,
  onClose,
  onReanalyze,
}: RfpAiAnalysisDrawerProps) {

  // Helper formatting function for lead score badge color
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.2)]';
    if (score >= 65) return 'text-[#7dd3fc] border-[#7dd3fc]/40 bg-[#7dd3fc]/10 shadow-[0_0_15px_rgba(125,211,252,0.2)]';
    if (score >= 45) return 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
    return 'text-red-400 border-red-500/40 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
      case 'MEDIUM':
        return 'bg-sky-500/15 border-sky-500/40 text-[#7dd3fc]';
      case 'HIGH':
        return 'bg-amber-500/15 border-amber-500/40 text-amber-300';
      case 'CRITICAL':
        return 'bg-red-500/15 border-red-500/40 text-red-300 animate-pulse';
      default:
        return 'bg-white/10 border-white/20 text-white';
    }
  };

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case 'PRIORITIZE_FOR_REVIEW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'REQUEST_MORE_INFORMATION':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'CONTACT_CLIENT':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end transition-opacity animate-in fade-in duration-200">
      
      {/* Backdrop overlay listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Content */}
      <div className="relative w-full max-w-2xl bg-[#0f1524] border-l border-[#7dd3fc]/30 h-full flex flex-col shadow-2xl overflow-hidden z-10">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#334155]/40 bg-[#0A0E1A]/90 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc]">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>AI RFP TECHNICAL AUDIT</span>
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
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Drawer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Advisory Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-[#7dd3fc]/5 border border-[#7dd3fc]/20 text-xs text-[#7dd3fc]/90 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#7dd3fc] text-[18px] shrink-0 mt-0.5">info</span>
            <p className="leading-relaxed text-[11px]">
              <strong className="font-bold text-white">Advisory Assessment Notice:</strong> AI analysis recommendations are advisory tools designed to support AtlasBuild estimators. Final decision-making remains with the administrative team.
            </p>
          </div>

          {/* Loading State Overlay */}
          {isAnalyzing && (
            <div className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center gap-4 text-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-[#7dd3fc] border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-amber-400 border-b-transparent animate-spin duration-700"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-mono">Analyzing RFP Technical Scope...</p>
                <div className="text-xs text-white/60 space-y-0.5 font-sans">
                  <p className="animate-pulse">Evaluating engineering parameters & risk indicators</p>
                  <p className="text-[11px] text-[#7dd3fc]">Checking missing scope & extracting key requirements</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {analysisError && !isAnalyzing && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>AI Analysis Execution Failed</span>
              </div>
              <p className="font-mono text-[11px]">{analysisError}</p>
              <button
                onClick={onReanalyze}
                className="mt-2 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-bold text-[11px] transition-colors"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {/* Analysis Findings */}
          {analysis && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Top Score Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Lead Score */}
                <div className={`p-4 rounded-2xl border flex flex-col justify-between ${getScoreColorClass(analysis.leadScore)}`}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">Lead Quality Score</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono tracking-tight">{analysis.leadScore}</span>
                    <span className="text-xs font-mono opacity-70">/ 100</span>
                  </div>
                  <span className="text-[10px] font-semibold mt-1">
                    {analysis.leadScore >= 80 ? 'High Potential Lead' : analysis.leadScore >= 60 ? 'Standard RFP Lead' : 'Requires Qualification'}
                  </span>
                </div>

                {/* Risk Level */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-wider">Project Risk Profile</span>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-mono border ${getRiskBadgeClass(analysis.riskLevel)}`}>
                      {analysis.riskLevel} RISK
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50 mt-1">Based on technical scope & data</span>
                </div>

                {/* Project Complexity */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-wider">Structural Complexity</span>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono bg-purple-500/15 border border-purple-500/40 text-purple-300">
                      {analysis.projectComplexity} COMPLEXITY
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50 mt-1">Engineering difficulty rating</span>
                </div>

              </div>

              {/* Executive Summary Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h3 className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">summarize</span>
                  Executive Summary
                </h3>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  {analysis.executiveSummary}
                </p>
              </div>

              {/* Recommended Action & Next Steps */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">assistant_navigation</span>
                    Recommended Next Action
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${getActionBadgeClass(analysis.recommendedNextAction)}`}>
                    {analysis.recommendedNextAction.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Key Requirements Checklist */}
              {analysis.keyRequirements && analysis.keyRequirements.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                    Extracted Key Requirements ({analysis.keyRequirements.length})
                  </h3>
                  <ul className="space-y-2 text-xs text-white/80">
                    {analysis.keyRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0 mt-0.5">check_circle</span>
                        <span className="leading-snug">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Information Notice (Prominent Callout) */}
              {analysis.missingInformation && analysis.missingInformation.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    Missing Scope Information ({analysis.missingInformation.length})
                  </h3>
                  <p className="text-[11px] text-amber-300/80">
                    The client has not provided the following technical parameters in the submitted RFP:
                  </p>
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

              {/* Potential Risk Factors */}
              {analysis.riskFactors && analysis.riskFactors.length > 0 && (
                <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">shield_with_house</span>
                    Identified Risk Factors ({analysis.riskFactors.length})
                  </h3>
                  <ul className="space-y-2 text-xs text-red-200">
                    {analysis.riskFactors.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-black/20 p-2.5 rounded-xl border border-red-500/20">
                        <span className="material-symbols-outlined text-red-400 text-[16px] shrink-0 mt-0.5">report_problem</span>
                        <span className="leading-snug font-sans">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Estimator Questions */}
              {analysis.recommendedQuestions && analysis.recommendedQuestions.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                    Recommended Questions for Client Review
                  </h3>
                  <ol className="space-y-2 text-xs text-white/90 list-decimal list-inside font-sans">
                    {analysis.recommendedQuestions.map((q, idx) => (
                      <li key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 leading-relaxed">
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Footer Timestamp & Version Info */}
              {analyzedAt && (
                <div className="pt-2 text-right text-[10px] font-mono text-white/40 flex items-center justify-between">
                  <span>Engine: {providerUsed || 'UNKNOWN'} • v{version || '1.0.0'}</span>
                  <span>Analyzed: {new Date(analyzedAt).toLocaleString()}</span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-[#334155]/40 bg-[#0A0E1A]/90 flex items-center justify-between gap-3">
          <button
            onClick={onReanalyze}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Re-analyze with AI
          </button>

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
