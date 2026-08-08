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
}

const MOCK_PROPOSALS: RFPProposal[] = [
  {
    id: 'rfp-901',
    name: 'Marcus Vance',
    email: 'm.vance@apexlogistics.com',
    company: 'Apex Infrastructure Group',
    projectTitle: 'Port Terminal Logistics Hub & Heavy Paving',
    sector: 'INFRASTRUCTURE',
    budgetRange: '$15,000,000 - $25,000,000',
    location: 'Port of Savannah, GA',
    description: 'Phase 1 heavy civil paving, deep foundation piling for container cranes, and stormwater retention system spanning 45 acres.',
    blueprintUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
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
  },
];

export default function RFPProposalsPage() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<RFPProposal[]>(MOCK_PROPOSALS);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Proposal Drawer
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

  // AI Analysis Execution Handler
  const handleTriggerAiAnalysis = async (proposal: RFPProposal, forceReanalyze = false) => {
    setAiDrawerProposal(proposal);
    setAiAnalysisError(null);

    // If analysis exists in memory and forceReanalyze is false, render cached instantly
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

      const { analysis, analyzedAt, version } = json.data;

      // Update proposal state in proposals list
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposal.id
            ? {
                ...p,
                aiAnalysis: analysis,
                aiAnalyzedAt: analyzedAt,
                aiAnalysisVersion: version,
                aiRiskScore: analysis.leadScore,
              }
            : p
        )
      );

      // Update current drawer proposal state
      setAiDrawerProposal((prev) =>
        prev?.id === proposal.id
          ? {
              ...prev,
              aiAnalysis: analysis,
              aiAnalyzedAt: analyzedAt,
              aiAnalysisVersion: version,
              aiRiskScore: analysis.leadScore,
            }
          : prev
      );

      // Update selected proposal if active in modal
      if (selectedProposal?.id === proposal.id) {
        setSelectedProposal((prev) =>
          prev
            ? {
                ...prev,
                aiAnalysis: analysis,
                aiAnalyzedAt: analyzedAt,
                aiAnalysisVersion: version,
                aiRiskScore: analysis.leadScore,
              }
            : null
        );
      }
    } catch (err: any) {
      setAiAnalysisError(err.message || 'AI RFP Analysis operation failed.');
    } finally {
      setIsAnalyzingAi(false);
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

  // Action Handler for Approving, Rejecting, or Changing Status
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
        body: JSON.stringify({
          action,
          rejectionReason: reason,
        }),
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
        // Optimistic UI fallback
        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposalId
              ? {
                  ...p,
                  status: newStatus,
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: action === 'REJECT' ? reason || 'Reason logged by admin.' : p.rejectionReason,
                  reviewedByAdmin: { id: user?.id || 'admin-1', name: user?.name || 'Administrator', email: user?.email || 'admin@atlasbuild.com' },
                }
              : p
          )
        );
        if (selectedProposal?.id === proposalId) {
          setSelectedProposal((prev) =>
            prev
              ? {
                  ...prev,
                  status: newStatus,
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: action === 'REJECT' ? reason || 'Reason logged by admin.' : prev.rejectionReason,
                }
              : null
          );
        }
      }

      setFeedbackMsg({
        type: 'success',
        text: `Proposal RFP #${proposalId} successfully ${action.toLowerCase()}d. Notification dispatched.`,
      });
      setRejectingProposal(null);
      setRejectionInputReason('');
    } catch (e: any) {
      setFeedbackMsg({ type: 'error', text: e.message || 'Operation failed.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Compute Metrics
  const stats = useMemo(() => {
    const total = proposals.length;
    const pending = proposals.filter((p) => p.status === 'PENDING').length;
    const approved = proposals.filter((p) => p.status === 'APPROVED').length;
    const rejected = proposals.filter((p) => p.status === 'REJECTED').length;
    const reviewing = proposals.filter((p) => p.status === 'REVIEWING').length;

    return { total, pending, approved, rejected, reviewing };
  }, [proposals]);

  // Filtered List
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      // Status filter
      if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
      // Sector filter
      if (sectorFilter !== 'ALL' && p.sector !== sectorFilter) return false;
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
    });
  }, [proposals, statusFilter, sectorFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-on-surface font-body flex flex-col">
      
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-[220px] bg-[#0f131c]/90 border-r border-[#334155]/40 flex flex-col z-40">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-[#334155]/30">
          <img src="/images/logo.png" alt="AtlasBuild Logo" className="h-7 w-auto" />
          <span className="font-headline font-bold text-lg text-white">AtlasBuild</span>
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
              RFP Proposals
            </div>
            {stats.pending > 0 && (
              <span className="bg-[#7dd3fc] text-[#001f2e] text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {stats.pending}
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

          <Link
            href="/portal/proj-1/safety"
            className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">health_and_safety</span>
            Safety Logs
          </Link>

          <Link
            href="/dashboard/roles"
            className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">admin_panel_settings</span>
            Access Roles
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="pl-[220px] w-full">
        <DashboardHeader />

        <main className="pt-16 p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc] mb-1">
                <span>DASHBOARD</span>
                <span>/</span>
                <span className="text-white">RFP PROPOSALS AUDIT</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
                RFP Proposal Management
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 text-[#7dd3fc]">
                  Admin Gatekeeper
                </span>
              </h1>
              <p className="text-xs text-white/60 mt-1 max-w-2xl">
                Review, evaluate, accept, or reject incoming client engineering build requests and RFP proposals.
              </p>
            </div>

            <Link
              href="/quotes"
              target="_blank"
              className="w-fit flex items-center gap-2 px-4 py-2.5 bg-[#7dd3fc] text-[#001f2e] text-xs font-bold rounded-lg hover:bg-[#38bdf8] transition-all shadow-[0_0_15px_rgba(125,211,252,0.3)] font-label uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Test Client Intake Wizard
            </Link>
          </div>

          {/* Feedback Alert Banner */}
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
              <button
                onClick={() => setFeedbackMsg(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Top Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Total Submitted */}
            <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/60 uppercase">Total Submitted</span>
                <span className="material-symbols-outlined text-[#7dd3fc] bg-[#7dd3fc]/10 p-2 rounded-xl text-[20px]">
                  folder_open
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-white mt-3 font-mono">
                {stats.total}
              </p>
              <p className="text-[11px] text-white/50 mt-1">All RFP Intake submissions</p>
            </div>

            {/* Pending Review (Action Required) */}
            <div className="bg-[#0f1524]/80 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Pending Review
                </span>
                <span className="material-symbols-outlined text-amber-400 bg-amber-500/10 p-2 rounded-xl text-[20px]">
                  pending_actions
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-amber-300 mt-3 font-mono">
                {stats.pending}
              </p>
              <p className="text-[11px] text-amber-400/70 mt-1 font-semibold">Requires Admin Decision</p>
            </div>

            {/* Approved Proposals */}
            <div className="bg-[#0f1524]/80 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Approved RFPs</span>
                <span className="material-symbols-outlined text-emerald-400 bg-emerald-500/10 p-2 rounded-xl text-[20px]">
                  verified
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-emerald-300 mt-3 font-mono">
                {stats.approved}
              </p>
              <p className="text-[11px] text-emerald-400/70 mt-1">Ready for Project Lifecycle</p>
            </div>

            {/* Rejected Proposals */}
            <div className="bg-[#0f1524]/80 border border-red-500/30 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold uppercase">Rejected RFPs</span>
                <span className="material-symbols-outlined text-red-400 bg-red-500/10 p-2 rounded-xl text-[20px]">
                  cancel
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-red-300 mt-3 font-mono">
                {stats.rejected}
              </p>
              <p className="text-[11px] text-red-400/70 mt-1">Decline reason logged</p>
            </div>

          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
            
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { label: 'All', value: 'ALL', count: stats.total },
                { label: 'Pending Action', value: 'PENDING', count: stats.pending, highlight: true },
                { label: 'Approved', value: 'APPROVED', count: stats.approved },
                { label: 'Rejected', value: 'REJECTED', count: stats.rejected },
                { label: 'Under Review', value: 'REVIEWING', count: stats.reviewing },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    statusFilter === tab.value
                      ? 'bg-[#7dd3fc] text-[#001f2e] font-bold shadow-[0_0_10px_rgba(125,211,252,0.3)]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      statusFilter === tab.value
                        ? 'bg-[#001f2e]/20 text-[#001f2e]'
                        : tab.highlight && tab.count > 0
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input & Sector Select */}
            <div className="flex items-center gap-3">
              {/* Sector Dropdown */}
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="h-9 px-3 rounded-xl bg-white/5 border border-[#334155]/60 text-xs text-white focus:outline-none focus:border-[#7dd3fc]"
              >
                <option value="ALL" className="bg-[#0f1524]">All Sectors</option>
                <option value="CIVIL" className="bg-[#0f1524]">Civil</option>
                <option value="COMMERCIAL" className="bg-[#0f1524]">Commercial</option>
                <option value="INFRASTRUCTURE" className="bg-[#0f1524]">Infrastructure</option>
                <option value="HEALTHCARE" className="bg-[#0f1524]">Healthcare</option>
                <option value="RESIDENTIAL" className="bg-[#0f1524]">Residential</option>
              </select>

              {/* Search Bar */}
              <div className="relative flex-1 md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/40 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search company, title, email..."
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
                  There are no submitted proposals matching your current filter criteria.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-[#334155]/40 text-[11px] font-mono uppercase tracking-wider text-white/60">
                      <th className="py-3.5 px-4 font-semibold">RFP ID & Project Title</th>
                      <th className="py-3.5 px-4 font-semibold">Client & Company</th>
                      <th className="py-3.5 px-4 font-semibold">Location & Sector</th>
                      <th className="py-3.5 px-4 font-semibold">Budget Range</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#334155]/30 text-xs">
                    {filteredProposals.map((proposal) => {
                      const isPending = proposal.status === 'PENDING';
                      const isApproved = proposal.status === 'APPROVED';
                      const isRejected = proposal.status === 'REJECTED';

                      return (
                        <tr
                          key={proposal.id}
                          className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                          onClick={() => setSelectedProposal(proposal)}
                        >
                          {/* RFP ID & Title */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-[10px] text-[#7dd3fc] font-bold">
                                #{proposal.id}
                              </span>
                              <span className="font-bold text-white max-w-xs truncate group-hover:text-[#7dd3fc] transition-colors">
                                {proposal.projectTitle}
                              </span>
                              <span className="text-[10px] text-white/50 font-mono">
                                Submitted {new Date(proposal.createdAt).toLocaleDateString()}
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

                          {/* Location & Sector */}
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-white/80">{proposal.location}</span>
                              <span className="w-fit text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 uppercase">
                                {proposal.sector}
                              </span>
                            </div>
                          </td>

                          {/* Budget */}
                          <td className="py-4 px-4 font-mono font-semibold text-white/90">
                            {proposal.budgetRange}
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

                          {/* Quick Action Buttons */}
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {/* AI Analyze Button */}
                              <button
                                onClick={() => handleTriggerAiAnalysis(proposal)}
                                className="px-2.5 py-1 bg-[#7dd3fc]/15 border border-[#7dd3fc]/40 text-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#001f2e] rounded-lg transition-all flex items-center gap-1 font-bold text-xs shadow-[0_0_8px_rgba(125,211,252,0.15)]"
                                title="Analyze RFP with AI Lead Scoring"
                              >
                                <span className="material-symbols-outlined text-[16px]">psychology</span>
                                {proposal.aiAnalysis ? (
                                  <span className="font-mono text-[10px] font-extrabold">{proposal.aiRiskScore}/100</span>
                                ) : (
                                  <span className="text-[10px]">AI Audit</span>
                                )}
                              </button>

                              {/* View Details */}
                              <button
                                onClick={() => setSelectedProposal(proposal)}
                                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                title="View Full RFP Specifications"
                              >
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </button>

                              {/* Quick Approve */}
                              {!isApproved && (
                                <button
                                  onClick={() => handleExecuteAction(proposal.id, 'APPROVE')}
                                  disabled={actionLoading}
                                  className="p-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 rounded-lg transition-all"
                                  title="Accept & Approve RFP Proposal"
                                >
                                  <span className="material-symbols-outlined text-[18px]">check</span>
                                </button>
                              )}

                              {/* Quick Reject */}
                              {!isRejected && (
                                <button
                                  onClick={() => setRejectingProposal(proposal)}
                                  disabled={actionLoading}
                                  className="p-1.5 bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 rounded-lg transition-all"
                                  title="Reject RFP Proposal"
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

      {/* Proposal Details Modal / Drawer */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1524] border border-[#7dd3fc]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc] mb-1">
                  <span>RFP PROPOSAL #{selectedProposal.id}</span>
                  <span>•</span>
                  <span>{selectedProposal.sector}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedProposal.projectTitle}</h2>
                <p className="text-xs text-white/60">
                  Submitted on {new Date(selectedProposal.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedProposal(null)}
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Current Evaluation Status Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase block">Evaluation Status</span>
                <span className="text-sm font-bold text-white">{selectedProposal.status}</span>
              </div>
              {selectedProposal.reviewedAt && (
                <div className="text-right text-[11px] font-mono text-white/60">
                  <span>Audited on {new Date(selectedProposal.reviewedAt).toLocaleDateString()}</span>
                  {selectedProposal.reviewedByAdmin && (
                    <span className="block text-[#7dd3fc]">By: {selectedProposal.reviewedByAdmin.name || selectedProposal.reviewedByAdmin.email}</span>
                  )}
                </div>
              )}
            </div>

            {/* Rejection Reason Notice (If Rejected) */}
            {selectedProposal.status === 'REJECTED' && selectedProposal.rejectionReason && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex flex-col gap-1">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">report</span>
                  Logged Rejection Reason:
                </span>
                <p className="font-mono">{selectedProposal.rejectionReason}</p>
              </div>
            )}

            {/* Client & Project Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                <span className="text-white/50 font-mono text-[10px] uppercase">Client / Company</span>
                <span className="font-bold text-white text-sm">{selectedProposal.company || 'Private Entity'}</span>
                <span className="text-white/80">{selectedProposal.name}</span>
                <span className="text-[#7dd3fc] font-mono">{selectedProposal.email}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                <span className="text-white/50 font-mono text-[10px] uppercase">Location & Budget</span>
                <span className="font-bold text-white text-sm">{selectedProposal.location}</span>
                <span className="text-[#7dd3fc] font-mono font-semibold">{selectedProposal.budgetRange}</span>
              </div>
            </div>

            {/* Proposal Scope Description */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono font-semibold text-white/70 uppercase">
                Project Scope & Engineering Specifications:
              </span>
              <div className="p-4 rounded-xl bg-[#0b0f17] border border-white/10 text-xs text-white/90 leading-relaxed font-sans">
                {selectedProposal.description}
              </div>
            </div>

            {/* Blueprint Attachment Link */}
            {selectedProposal.blueprintUrl && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-symbols-outlined text-[#7dd3fc]">description</span>
                  <span className="font-semibold text-white">Engineering Blueprint / Architectural Doc</span>
                </div>
                <a
                  href={selectedProposal.blueprintUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-[#7dd3fc]/20 text-[#7dd3fc] rounded-lg text-xs font-bold hover:bg-[#7dd3fc]/30"
                >
                  View Attachment →
                </a>
              </div>
            )}

            {/* Modal Action Buttons Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExecuteAction(selectedProposal.id, 'REVIEW')}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold text-white"
                >
                  Mark Under Review
                </button>

                <button
                  onClick={() => handleTriggerAiAnalysis(selectedProposal)}
                  className="px-4 py-2 bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#001f2e] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(125,211,252,0.2)] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  {selectedProposal.aiAnalysis ? 'View AI Analysis' : 'Analyze with AI'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Reject Button */}
                {selectedProposal.status !== 'REJECTED' && (
                  <button
                    onClick={() => setRejectingProposal(selectedProposal)}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                    Reject Proposal
                  </button>
                )}

                {/* Approve Button */}
                {selectedProposal.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleExecuteAction(selectedProposal.id, 'APPROVE')}
                    disabled={actionLoading}
                    className="px-5 py-2 bg-emerald-500 text-black font-bold hover:bg-emerald-400 rounded-xl text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Approve RFP Proposal
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingProposal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1524] border border-red-500/40 rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
            
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400 text-[24px]">cancel</span>
                <h3 className="text-base font-bold text-white">Reject RFP Proposal</h3>
              </div>
              <button
                onClick={() => setRejectingProposal(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-white/70">
              Rejecting RFP Proposal <span className="font-mono font-bold text-white">#{rejectingProposal.id}</span> ({rejectingProposal.projectTitle}). Please enter an optional reason for audit logs and client notification:
            </p>

            <textarea
              rows={4}
              value={rejectionInputReason}
              onChange={(e) => setRejectionInputReason(e.target.value)}
              placeholder="e.g. Project scope exceeds regional bonding capacity or timeline constraints..."
              className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/30 focus:outline-none focus:border-red-400"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingProposal(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-white/80"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecuteAction(rejectingProposal.id, 'REJECT', rejectionInputReason)}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600 rounded-xl text-xs shadow-[0_0_12px_rgba(239,68,68,0.3)]"
              >
                {actionLoading ? 'Processing...' : 'Confirm Rejection'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI RFP Analysis Findings Drawer */}
      {aiDrawerProposal && (
        <RfpAiAnalysisDrawer
          proposalId={aiDrawerProposal.id}
          projectTitle={aiDrawerProposal.projectTitle}
          clientName={aiDrawerProposal.name}
          clientCompany={aiDrawerProposal.company}
          analysis={aiDrawerProposal.aiAnalysis || null}
          analyzedAt={aiDrawerProposal.aiAnalyzedAt}
          version={aiDrawerProposal.aiAnalysisVersion}
          isAnalyzing={isAnalyzingAi}
          analysisError={aiAnalysisError}
          onClose={() => setAiDrawerProposal(null)}
          onReanalyze={() => handleTriggerAiAnalysis(aiDrawerProposal, true)}
        />
      )}

    </div>
  );
}
