'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import DashboardHeader from '../DashboardHeader';
import { useAuth } from '@/context/AuthContext';
import RfpAiAnalysisDrawer from '@/components/RfpAiAnalysisDrawer';
import { RfpAnalysisResult } from '@/features/quotes-rfp/schemas/rfpAiSchema';

export interface RFPProposal {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  projectTitle: string;
  sector: string;
  budgetRange: string;
  location: string;
  description: string;
  blueprintUrl?: string | null;
  status: 'PENDING' | 'REVIEWING' | 'CONTACTED' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
  reviewedByAdminId?: string | null;
  reviewedByAdmin?: { id: string; name?: string; email: string } | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  aiAnalysis?: RfpAnalysisResult | null;
  aiAnalyzedAt?: string | null;
  aiAnalysisVersion?: string | null;
  aiRiskScore?: number | null;
  aiOpportunityScore?: number | null;
  aiPriorityScore?: number | null;
  aiPriorityLevel?: string | null;
  aiRecommendedAction?: string | null;
  aiHumanPriority?: string | null;
}

const MOCK_PROPOSALS: RFPProposal[] = [
  {
    id: 'rfp-901',
    name: 'Marcus Vance',
    email: 'm.vance@apexlogistics.com',
    company: 'Apex Infrastructure Group',
    projectTitle: 'Port Terminal Logistics Hub & Heavy Paving',
    sector: 'INFRASTRUCTURE',
    budgetRange: '$25,000,000 - $40,000,000',
    location: 'Port of Savannah, GA',
    description: 'Phase 1 heavy civil paving, deep foundation piling for container cranes, and stormwater retention system spanning 45 acres.',
    blueprintUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    aiOpportunityScore: 92,
    aiRiskScore: 65,
    aiPriorityScore: 83,
    aiPriorityLevel: 'HIGH',
    aiRecommendedAction: 'PRIORITIZE_REVIEW',
  },
  {
    id: 'rfp-902',
    name: 'Dr. Aris Thorne',
    email: 'thorne@metrohealth.org',
    company: 'Metropolitan Health System',
    projectTitle: 'Central Medical Tower & Helipad Structure',
    sector: 'HEALTHCARE',
    budgetRange: '$40,000,000 - $60,000,000',
    location: 'Chicago, IL',
    description: '12-story specialized surgical tower with emergency roof helipad, seismic damping structures, and cleanroom HVAC infrastructure.',
    blueprintUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    aiOpportunityScore: 95,
    aiRiskScore: 78,
    aiPriorityScore: 89,
    aiPriorityLevel: 'CRITICAL',
    aiRecommendedAction: 'CONTACT_IMMEDIATELY',
  },
  {
    id: 'rfp-903',
    name: 'Elena Rostova',
    email: 'elena@skylinecorp.com',
    company: 'Skyline Commercial Properties',
    projectTitle: 'Horizon Bay High-Rise Commercial Core',
    sector: 'COMMERCIAL',
    budgetRange: '$28,000,000 - $35,000,000',
    location: 'Austin, TX',
    description: 'Structural steel core construction, double-glazed curtain wall installation, and LEED Platinum smart energy grid implementation.',
    blueprintUrl: null,
    status: 'APPROVED',
    reviewedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    reviewedByAdmin: { id: 'usr-admin-1', name: 'Chief Architect Operations', email: 'admin@atlasbuild.com' },
    createdAt: new Date(Date.now() - 30 * 3600000).toISOString(),
    aiOpportunityScore: 88,
    aiRiskScore: 40,
    aiPriorityScore: 71,
    aiPriorityLevel: 'MEDIUM',
    aiRecommendedAction: 'STANDARD_REVIEW',
  },
  {
    id: 'rfp-904',
    name: 'Robert Sterling',
    email: 'r.sterling@dot.gov',
    company: 'State Dept of Transportation',
    projectTitle: 'Interstate 85 Viaduct Overpass Structural Seismic Retrofit',
    sector: 'CIVIL',
    budgetRange: '$12,500,000 - $18,000,000',
    location: 'Atlanta, GA',
    description: 'Seismic reinforcement of 3.2 miles of elevated bridge piers, carbon fiber wrap application, and pre-stressed concrete beam replacement.',
    blueprintUrl: null,
    status: 'REJECTED',
    rejectionReason: 'Scope exceeds current regional bonding cap limits for Phase 3 calendar availability.',
    reviewedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    reviewedByAdmin: { id: 'usr-admin-1', name: 'Chief Architect Operations', email: 'admin@atlasbuild.com' },
    createdAt: new Date(Date.now() - 72 * 3600000).toISOString(),
    aiOpportunityScore: 70,
    aiRiskScore: 85,
    aiPriorityScore: 75,
    aiPriorityLevel: 'HIGH',
    aiRecommendedAction: 'REQUEST_INFORMATION',
  },
  {
    id: 'rfp-905',
    name: 'Sophia Chen',
    email: 'sophia@vertexrealty.com',
    company: 'Vertex Urban Housing',
    projectTitle: 'Oakridge Eco-Residential Complex',
    sector: 'RESIDENTIAL',
    budgetRange: '$8,000,000 - $12,000,000',
    location: 'Denver, CO',
    description: '140-unit eco-friendly residential development featuring timber frame architecture, subterranean parking, and solar micro-grid.',
    blueprintUrl: null,
    status: 'REVIEWING',
    createdAt: new Date(Date.now() - 96 * 3600000).toISOString(),
    aiOpportunityScore: 55,
    aiRiskScore: 30,
    aiPriorityScore: 46,
    aiPriorityLevel: 'LOW',
    aiRecommendedAction: 'STANDARD_REVIEW',
  },
];

export default function RFPProposalsPage() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<RFPProposal[]>(MOCK_PROPOSALS);
  const [loading, setLoading] = useState(false);
  
  // Filter States
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('PRIORITY_DESC');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Proposal Details Modal
  const [selectedProposal, setSelectedProposal] = useState<RFPProposal | null>(null);

  // Action Modals
  const [rejectingProposal, setRejectingProposal] = useState<RFPProposal | null>(null);
  const [rejectionInputReason, setRejectionInputReason] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // AI RFP Analyzer Drawer State
  const [aiDrawerProposal, setAiDrawerProposal] = useState<RFPProposal | null>(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState<boolean>(false);
  const [aiAnalysisError, setAiAnalysisError] = useState<string | null>(null);
  const [aiProviderUsed, setAiProviderUsed] = useState<string | null>(null);

  // Trigger AI Analysis
  const handleTriggerAiAnalysis = async (proposal: RFPProposal, forceReanalyze = false) => {
    setAiDrawerProposal(proposal);
    setAiAnalysisError(null);

    if (proposal.aiAnalysis && !forceReanalyze) {
      return;
    }

    setIsAnalyzingAi(true);
    try {
      const res = await fetch(`/api/admin/rfps/${proposal.id}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reanalyze: forceReanalyze }),
      });

      const json = await res.json();
      if (!res.ok) {
        const errorMsg = typeof json.error === 'object' && json.error?.message
          ? json.error.message
          : (typeof json.error === 'string' ? json.error : (json.message || 'AI RFP Analysis request failed.'));
        throw new Error(errorMsg);
      }

      const { analysis, analyzedAt, version, providerUsed } = json.data;
      if (providerUsed) setAiProviderUsed(providerUsed);

      const updatedFields = {
        aiAnalysis: analysis,
        aiAnalyzedAt: analyzedAt,
        aiAnalysisVersion: version,
        aiRiskScore: analysis.riskScore ?? analysis.leadScore,
        aiOpportunityScore: analysis.opportunityScore ?? analysis.leadScore,
        aiPriorityScore: analysis.priorityScore ?? 75,
        aiPriorityLevel: analysis.priorityLevel ?? 'MEDIUM',
        aiRecommendedAction: analysis.recommendedAction ?? 'STANDARD_REVIEW',
      };

      setProposals((prev) =>
        prev.map((p) => (p.id === proposal.id ? { ...p, ...updatedFields } : p))
      );

      setAiDrawerProposal((prev) =>
        prev?.id === proposal.id ? { ...prev, ...updatedFields } : prev
      );

      if (selectedProposal?.id === proposal.id) {
        setSelectedProposal((prev) => (prev ? { ...prev, ...updatedFields } : null));
      }
    } catch (err: any) {
      setAiAnalysisError(err.message || 'AI RFP Analysis operation failed.');
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  // Human Priority Override Handler
  const handleOverridePriority = async (
    proposalId: string,
    humanPriority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  ) => {
    const res = await fetch(`/api/admin/rfps/${proposalId}/override-priority`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ humanPriority }),
    });

    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error?.message || 'Failed to update priority override');
    }

    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, aiHumanPriority: humanPriority } : p))
    );

    setAiDrawerProposal((prev) =>
      prev?.id === proposalId ? { ...prev, aiHumanPriority: humanPriority } : prev
    );

    if (selectedProposal?.id === proposalId) {
      setSelectedProposal((prev) => (prev ? { ...prev, aiHumanPriority: humanPriority } : null));
    }
  };

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const res = await fetch('/api/admin/rfps');
        if (res.ok && mounted) {
          const json = await res.json();
          if (json.data?.proposals && json.data.proposals.length > 0) {
            setProposals(json.data.proposals);
          }
        }
      } catch (e) {
        // Fallback to initial mock state if DB unreachable
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  // Action Handler for Approving/Rejecting
  const handleExecuteAction = async (
    proposalId: string,
    action: 'APPROVE' | 'REJECT' | 'REVIEW' | 'ARCHIVE',
    reason?: string
  ) => {
    setActionLoading(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/admin/rfps/${proposalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectionReason: reason }),
      });

      const targetStatusMap: Record<string, RFPProposal['status']> = {
        APPROVE: 'APPROVED',
        REJECT: 'REJECTED',
        REVIEW: 'REVIEWING',
        ARCHIVE: 'ARCHIVED',
      };

      const newStatus = targetStatusMap[action];

      if (res.ok) {
        const json = await res.json();
        const updated = json.data;
        setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, ...updated } : p)));
        if (selectedProposal?.id === proposalId) {
          setSelectedProposal((prev) => (prev ? { ...prev, ...updated } : null));
        }
      } else {
        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposalId
              ? {
                  ...p,
                  status: newStatus,
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: action === 'REJECT' ? reason || 'Reason logged by admin.' : p.rejectionReason,
                }
              : p
          )
        );
      }

      setFeedbackMsg({
        type: 'success',
        text: `Proposal RFP #${proposalId} successfully ${action.toLowerCase()}d.`,
      });
      setRejectingProposal(null);
      setRejectionInputReason('');
    } catch (e: any) {
      setFeedbackMsg({ type: 'error', text: e.message || 'Operation failed.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Compute Statistics Cards
  const stats = useMemo(() => {
    const total = proposals.length;
    const pending = proposals.filter((p) => p.status === 'PENDING').length;
    const approved = proposals.filter((p) => p.status === 'APPROVED').length;
    const rejected = proposals.filter((p) => p.status === 'REJECTED').length;

    // AI Lead Priority Counts
    const critical = proposals.filter((p) => (p.aiHumanPriority || p.aiPriorityLevel) === 'CRITICAL').length;
    const high = proposals.filter((p) => (p.aiHumanPriority || p.aiPriorityLevel) === 'HIGH').length;
    const medium = proposals.filter((p) => (p.aiHumanPriority || p.aiPriorityLevel) === 'MEDIUM').length;
    const low = proposals.filter((p) => (p.aiHumanPriority || p.aiPriorityLevel) === 'LOW').length;
    const unanalyzed = proposals.filter((p) => !p.aiAnalysis && !p.aiPriorityLevel).length;

    return { total, pending, approved, rejected, critical, high, medium, low, unanalyzed };
  }, [proposals]);

  // Filtered & Sorted Proposals List
  const filteredProposals = useMemo(() => {
    return proposals
      .filter((p) => {
        // Status filter
        if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
        // Sector filter
        if (sectorFilter !== 'ALL' && p.sector !== sectorFilter) return false;
        // Priority filter
        if (priorityFilter !== 'ALL') {
          const effectivePriority = p.aiHumanPriority || p.aiPriorityLevel || 'UNANALYZED';
          if (priorityFilter === 'UNANALYZED' && (p.aiAnalysis || p.aiPriorityLevel)) return false;
          if (priorityFilter !== 'UNANALYZED' && effectivePriority !== priorityFilter) return false;
        }
        // Search Query
        if (searchQuery.trim().length > 0) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.projectTitle.toLowerCase().includes(q);
          const matchCompany = (p.company || '').toLowerCase().includes(q);
          const matchName = p.name.toLowerCase().includes(q);
          const matchEmail = p.email.toLowerCase().includes(q);
          const matchLocation = p.location.toLowerCase().includes(q);
          return matchTitle || matchCompany || matchName || matchEmail || matchLocation;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRIORITY_DESC') {
          const scoreA = a.aiPriorityScore ?? (a.aiPriorityLevel === 'CRITICAL' ? 95 : a.aiPriorityLevel === 'HIGH' ? 80 : 50);
          const scoreB = b.aiPriorityScore ?? (b.aiPriorityLevel === 'CRITICAL' ? 95 : b.aiPriorityLevel === 'HIGH' ? 80 : 50);
          return scoreB - scoreA;
        }
        if (sortBy === 'OPPORTUNITY_DESC') {
          return (b.aiOpportunityScore ?? 0) - (a.aiOpportunityScore ?? 0);
        }
        if (sortBy === 'RISK_DESC') {
          return (b.aiRiskScore ?? 0) - (a.aiRiskScore ?? 0);
        }
        if (sortBy === 'NEWEST') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'OLDEST') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
  }, [proposals, statusFilter, sectorFilter, priorityFilter, sortBy, searchQuery]);

  const getPriorityBadgeStyle = (p: RFPProposal) => {
    const level = p.aiHumanPriority || p.aiPriorityLevel;
    if (!level) return 'bg-white/10 text-white/50 border-white/10';
    switch (level) {
      case 'CRITICAL':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)] animate-pulse';
      case 'HIGH':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LOW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-on-surface font-body flex flex-col">
      
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-[220px] bg-[#0f131c]/90 border-r border-[#334155]/40 flex flex-col z-40">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-[#334155]/30">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src="/images/logo.png" alt="AtlasBuild Logo" className="h-7 w-auto" />
            <span className="font-headline font-bold text-lg text-white">AtlasBuild</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
            Dashboard
          </Link>

          <Link
            href="/portfolio"
            className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">account_tree</span>
            Project Portfolio
          </Link>

          <Link
            href="/dashboard/rfps"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg transition-all bg-[#7dd3fc]/20 text-[#7dd3fc] font-semibold border border-[#7dd3fc]/30 shadow-[0_0_10px_rgba(125,211,252,0.2)]"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined mr-3 text-[20px]">assignment_turned_in</span>
              RFP Inbox & Priorities
            </div>
            {stats.critical > 0 && (
              <span className="bg-purple-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {stats.critical}
              </span>
            )}
          </Link>

          <Link
            href="/dashboard/leads"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined mr-3 text-[20px]">mail</span>
              Lead Inbox
            </div>
          </Link>

          <Link
            href="/careers"
            className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">work</span>
            Careers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="pl-[220px] w-full">
        <DashboardHeader />

        <main className="pt-16 p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc] mb-1">
                <span>LEAD PRIORITIZATION</span>
                <span>/</span>
                <span className="text-white">RFP INBOX AUDIT</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
                RFP Lead Prioritization & Inbox
              </h1>
              <p className="text-xs text-white/60 mt-1 max-w-2xl">
                Identify high-value leads and urgent risk profiles. AI priority recommendations remain advisory; estimators retain final decision-making.
              </p>
            </div>

            <Link
              href="/quotes"
              target="_blank"
              className="w-fit flex items-center gap-2 px-4 py-2.5 bg-[#7dd3fc] text-[#001f2e] text-xs font-bold rounded-lg hover:bg-[#38bdf8] transition-all shadow-[0_0_15px_rgba(125,211,252,0.3)] font-label uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Submit Test RFP Proposal
            </Link>
          </div>

          {/* Feedback Banner */}
          {feedbackMsg && (
            <div
              className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  {feedbackMsg.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <span>{feedbackMsg.text}</span>
              </div>
              <button onClick={() => setFeedbackMsg(null)} className="text-white/60 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>
          )}

          {/* Phase 1B AI Priority Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Total Submissions */}
            <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-4 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-white/60 uppercase">Total Intake</span>
              <p className="text-2xl font-bold text-white mt-1 font-mono">{stats.total}</p>
              <span className="text-[10px] text-white/40">All RFP submissions</span>
            </div>

            {/* Critical Priority */}
            <div className="bg-[#0f1524]/80 border border-purple-500/40 rounded-2xl p-4 backdrop-blur-xl shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">Critical</span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
              </div>
              <p className="text-2xl font-bold text-purple-300 mt-1 font-mono">{stats.critical}</p>
              <span className="text-[10px] text-purple-300/70">Urgent review required</span>
            </div>

            {/* High Priority */}
            <div className="bg-[#0f1524]/80 border border-red-500/30 rounded-2xl p-4 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase">High</span>
              <p className="text-2xl font-bold text-red-300 mt-1 font-mono">{stats.high}</p>
              <span className="text-[10px] text-red-400/70">High commercial value</span>
            </div>

            {/* Medium Priority */}
            <div className="bg-[#0f1524]/80 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Medium</span>
              <p className="text-2xl font-bold text-amber-300 mt-1 font-mono">{stats.medium}</p>
              <span className="text-[10px] text-amber-400/70">Standard review queue</span>
            </div>

            {/* Low Priority */}
            <div className="bg-[#0f1524]/80 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Low</span>
              <p className="text-2xl font-bold text-emerald-300 mt-1 font-mono">{stats.low}</p>
              <span className="text-[10px] text-emerald-400/70">Deferred priority</span>
            </div>

            {/* Unanalyzed */}
            <div className="bg-[#0f1524]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-white/50 uppercase">Unanalyzed</span>
              <p className="text-2xl font-bold text-white/70 mt-1 font-mono">{stats.unanalyzed}</p>
              <span className="text-[10px] text-white/40">Pending AI audit</span>
            </div>

          </div>

          {/* Search & Multi-Filter Toolbar */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
            
            {/* Left Filters */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="h-9 px-3 rounded-xl bg-white/5 border border-purple-500/40 text-xs text-purple-300 focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                <option value="ALL" className="bg-[#0f1524]">⚡ All Priorities</option>
                <option value="CRITICAL" className="bg-[#0f1524]">CRITICAL Priority</option>
                <option value="HIGH" className="bg-[#0f1524]">HIGH Priority</option>
                <option value="MEDIUM" className="bg-[#0f1524]">MEDIUM Priority</option>
                <option value="LOW" className="bg-[#0f1524]">LOW Priority</option>
                <option value="UNANALYZED" className="bg-[#0f1524]">Not Analyzed Yet</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-xl bg-white/5 border border-[#334155]/60 text-xs text-white focus:outline-none focus:border-[#7dd3fc] cursor-pointer"
              >
                <option value="ALL" className="bg-[#0f1524]">All Statuses</option>
                <option value="PENDING" className="bg-[#0f1524]">Pending Action</option>
                <option value="APPROVED" className="bg-[#0f1524]">Approved</option>
                <option value="REJECTED" className="bg-[#0f1524]">Rejected</option>
                <option value="REVIEWING" className="bg-[#0f1524]">Under Review</option>
              </select>

              {/* Sector Filter */}
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="h-9 px-3 rounded-xl bg-white/5 border border-[#334155]/60 text-xs text-white focus:outline-none focus:border-[#7dd3fc] cursor-pointer"
              >
                <option value="ALL" className="bg-[#0f1524]">All Sectors</option>
                <option value="CIVIL" className="bg-[#0f1524]">Civil</option>
                <option value="COMMERCIAL" className="bg-[#0f1524]">Commercial</option>
                <option value="INFRASTRUCTURE" className="bg-[#0f1524]">Infrastructure</option>
                <option value="HEALTHCARE" className="bg-[#0f1524]">Healthcare</option>
                <option value="RESIDENTIAL" className="bg-[#0f1524]">Residential</option>
              </select>
            </div>

            {/* Right Sorting & Search */}
            <div className="flex items-center gap-3">
              
              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-xl bg-white/5 border border-[#334155]/60 text-xs text-[#7dd3fc] focus:outline-none focus:border-[#7dd3fc] cursor-pointer"
              >
                <option value="PRIORITY_DESC" className="bg-[#0f1524]">Sort: Priority (Highest First)</option>
                <option value="OPPORTUNITY_DESC" className="bg-[#0f1524]">Sort: Opportunity Score</option>
                <option value="RISK_DESC" className="bg-[#0f1524]">Sort: Risk Score</option>
                <option value="NEWEST" className="bg-[#0f1524]">Sort: Date (Newest)</option>
                <option value="OLDEST" className="bg-[#0f1524]">Sort: Date (Oldest)</option>
              </select>

              {/* Search Bar */}
              <div className="relative flex-1 md:w-56">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/40 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lead or company..."
                  className="w-full h-9 pl-9 pr-3 rounded-xl bg-white/5 border border-[#334155]/60 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#7dd3fc]"
                />
              </div>
            </div>

          </div>

          {/* Proposals Data Table */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
            {loading ? (
              <div className="p-12 text-center text-xs text-white/50 flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#7dd3fc] border-t-transparent rounded-full animate-spin"></div>
                <span>Fetching live RFP submissions...</span>
              </div>
            ) : filteredProposals.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-white/30 text-[48px]">folder_off</span>
                <p className="text-sm font-bold text-white/80">No RFP Proposals Found</p>
                <p className="text-xs text-white/50 max-w-sm">
                  There are no submitted proposals matching your current search or priority filter criteria.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-[#334155]/40 text-[11px] font-mono uppercase tracking-wider text-white/60">
                      <th className="py-3.5 px-4 font-semibold">Priority & Title</th>
                      <th className="py-3.5 px-4 font-semibold">Client & Company</th>
                      <th className="py-3.5 px-4 font-semibold">Scores (Opp / Risk)</th>
                      <th className="py-3.5 px-4 font-semibold">Budget & Sector</th>
                      <th className="py-3.5 px-4 font-semibold">Intake Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#334155]/30 text-xs">
                    {filteredProposals.map((proposal) => {
                      const isPending = proposal.status === 'PENDING';
                      const isApproved = proposal.status === 'APPROVED';
                      const isRejected = proposal.status === 'REJECTED';
                      const activeLevel = proposal.aiHumanPriority || proposal.aiPriorityLevel;

                      return (
                        <tr
                          key={proposal.id}
                          className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                          onClick={() => setSelectedProposal(proposal)}
                        >
                          {/* Priority Badge & Project Title */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold font-mono border ${getPriorityBadgeStyle(proposal)}`}>
                                  {activeLevel || 'NOT ANALYZED'}
                                </span>
                                {proposal.aiHumanPriority && (
                                  <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                                    HUMAN OVERRIDE
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-white max-w-xs truncate group-hover:text-[#7dd3fc] transition-colors">
                                {proposal.projectTitle}
                              </span>
                              <span className="text-[10px] text-white/50 font-mono">
                                RFP #{proposal.id} • Submitted {new Date(proposal.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </td>

                          {/* Client & Company */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-white">
                                {proposal.company || 'Private Entity'}
                              </span>
                              <span className="text-[#7dd3fc]/80 font-mono text-[11px]">
                                {proposal.name}
                              </span>
                              <span className="text-[10px] text-white/40 truncate max-w-[180px]">
                                {proposal.email}
                              </span>
                            </div>
                          </td>

                          {/* Phase 1B Tri-Scores */}
                          <td className="py-4 px-4 font-mono">
                            {proposal.aiAnalysis || proposal.aiOpportunityScore !== undefined ? (
                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="text-emerald-400 font-bold" title="Opportunity Score">
                                  Opp: {proposal.aiOpportunityScore ?? proposal.aiRiskScore}/100
                                </span>
                                <span className="text-white/30">•</span>
                                <span className="text-amber-400 font-bold" title="Risk Score">
                                  Risk: {proposal.aiRiskScore ?? 45}/100
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-white/40">Not Analyzed</span>
                            )}
                          </td>

                          {/* Budget & Sector */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono font-semibold text-white/90">{proposal.budgetRange}</span>
                              <span className="w-fit text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 uppercase">
                                {proposal.sector}
                              </span>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-4 px-4">
                            {isPending && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                                Pending Action
                              </span>
                            )}
                            {isApproved && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Approved
                              </span>
                            )}
                            {isRejected && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/15 border border-red-500/40 text-red-300 font-mono">
                                <span className="material-symbols-outlined text-[14px]">cancel</span>
                                Rejected
                              </span>
                            )}
                            {!isPending && !isApproved && !isRejected && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/15 border border-sky-500/40 text-sky-300 font-mono">
                                {proposal.status}
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {/* AI Analyze & Priority Button */}
                              <button
                                onClick={() => handleTriggerAiAnalysis(proposal)}
                                className="px-2.5 py-1 bg-[#7dd3fc]/15 border border-[#7dd3fc]/40 text-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#001f2e] rounded-lg transition-all flex items-center gap-1 font-bold text-xs shadow-[0_0_8px_rgba(125,211,252,0.15)] cursor-pointer"
                                title="Analyze RFP Lead Priority & Technical Audit"
                              >
                                <span className="material-symbols-outlined text-[16px]">psychology</span>
                                {proposal.aiAnalysis || proposal.aiPriorityScore ? (
                                  <span className="font-mono text-[10px] font-extrabold">{proposal.aiPriorityScore ?? 80}/100</span>
                                ) : (
                                  <span className="text-[10px]">AI Audit</span>
                                )}
                              </button>

                              {/* View Details */}
                              <button
                                onClick={() => setSelectedProposal(proposal)}
                                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                                title="View Specifications"
                              >
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </button>

                              {/* Quick Approve */}
                              {!isApproved && (
                                <button
                                  onClick={() => handleExecuteAction(proposal.id, 'APPROVE')}
                                  disabled={actionLoading}
                                  className="p-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 rounded-lg transition-all cursor-pointer"
                                  title="Approve Proposal"
                                >
                                  <span className="material-symbols-outlined text-[18px]">check</span>
                                </button>
                              )}

                              {/* Quick Reject */}
                              {!isRejected && (
                                <button
                                  onClick={() => setRejectingProposal(proposal)}
                                  disabled={actionLoading}
                                  className="p-1.5 bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 rounded-lg transition-all cursor-pointer"
                                  title="Reject Proposal"
                                >
                                  <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* AI Analysis & Prioritization Drawer */}
      {aiDrawerProposal && (
        <RfpAiAnalysisDrawer
          proposalId={aiDrawerProposal.id}
          projectTitle={aiDrawerProposal.projectTitle}
          clientCompany={aiDrawerProposal.company}
          clientName={aiDrawerProposal.name}
          analysis={aiDrawerProposal.aiAnalysis || null}
          analyzedAt={aiDrawerProposal.aiAnalyzedAt}
          version={aiDrawerProposal.aiAnalysisVersion}
          providerUsed={aiProviderUsed}
          humanPriority={aiDrawerProposal.aiHumanPriority}
          isAnalyzing={isAnalyzingAi}
          analysisError={aiAnalysisError}
          onClose={() => setAiDrawerProposal(null)}
          onReanalyze={() => handleTriggerAiAnalysis(aiDrawerProposal, true)}
          onOverridePriority={(p) => handleOverridePriority(aiDrawerProposal.id, p)}
        />
      )}

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1524] border border-[#7dd3fc]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc] mb-1">
                  <span>RFP PROPOSAL #{selectedProposal.id}</span>
                  <span>•</span>
                  <span>{selectedProposal.sector}</span>
                </div>
                <h2 className="text-xl font-headline font-bold text-white">
                  {selectedProposal.projectTitle}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProposal(null)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Scope Details */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60 font-mono uppercase block text-[10px] mb-1">Project Scope Description</span>
                <p className="text-white/90 leading-relaxed font-sans">{selectedProposal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/60 font-mono uppercase block text-[10px] mb-1">Target Budget</span>
                  <span className="text-white font-bold font-mono">{selectedProposal.budgetRange}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/60 font-mono uppercase block text-[10px] mb-1">Location</span>
                  <span className="text-white font-semibold">{selectedProposal.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  const p = selectedProposal;
                  setSelectedProposal(null);
                  handleTriggerAiAnalysis(p);
                }}
                className="px-4 py-2 bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-[#7dd3fc] rounded-xl text-xs font-bold hover:bg-[#7dd3fc] hover:text-[#001f2e] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Open AI Prioritization & Audit
              </button>

              <button
                onClick={() => setSelectedProposal(null)}
                className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/20 transition-all"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingProposal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1524] border border-red-500/40 rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400">report</span>
              Reject RFP Proposal #{rejectingProposal.id}
            </h3>

            <textarea
              value={rejectionInputReason}
              onChange={(e) => setRejectionInputReason(e.target.value)}
              placeholder="Provide reason for decline (e.g. scope beyond regional bonding cap)..."
              rows={3}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-400"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingProposal(null)}
                className="px-4 py-2 bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecuteAction(rejectingProposal.id, 'REJECT', rejectionInputReason)}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
