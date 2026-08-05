'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from '../DashboardHeader';

export type LeadStatus =
  | 'New'
  | 'Reviewed'
  | 'Contacted'
  | 'Meeting Scheduled'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export interface LeadDocument {
  id: string;
  name: string;
  type: 'PDF' | 'Image' | 'CAD' | 'BOQ' | 'Specification';
  size: string;
  uploadedAt: string;
  url: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  author: string;
  icon: string;
}

export interface AdminNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  projectTitle: string;
  projectType: string;
  estimatedBudget: string;
  preferredStartDate: string;
  estimatedTimeline: string;
  description: string;
  status: LeadStatus;
  dateReceived: string;
  unread: boolean;
  assignedEmployee?: string;
  country: string;
  
  // AI Insights
  aiAnalysis: {
    complexity: 'High' | 'Medium' | 'Low' | 'Critical';
    contractValue: string;
    priority: 'High' | 'Medium' | 'Urgent';
    requestedServices: string[];
    suggestedSteps: string[];
  };

  // Associated Data
  documents: LeadDocument[];
  timeline: ActivityItem[];
  notes: AdminNote[];
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    companyName: 'Vanguard Structural Group',
    contactPerson: 'Marcus Vance',
    email: 'm.vance@vanguardgroup.com',
    phone: '+1 (555) 234-8901',
    website: 'https://vanguardgroup.com',
    location: 'Austin, Texas, USA',
    country: 'USA',
    projectTitle: 'Austin Tech Hub Deck Construction',
    projectType: 'Commercial Complex',
    estimatedBudget: '$12,500,000',
    preferredStartDate: 'Q3 2026',
    estimatedTimeline: '18 Months',
    description: 'Design-build structural execution for a 12-story high-density commercial tower with deep pile foundation and LEED Gold certification requirement.',
    status: 'New',
    dateReceived: '2026-08-05 14:32',
    unread: true,
    assignedEmployee: 'Elena Rostova',
    aiAnalysis: {
      complexity: 'High',
      contractValue: '$12.5M',
      priority: 'High',
      requestedServices: ['Structural Engineering', 'Design-Build', 'BIM Coordination', 'LEED Certification'],
      suggestedSteps: [
        'Schedule technical consultation with Marcus Vance',
        'Request CAD architectural drawings & geotechnical reports',
        'Prepare preliminary bill of quantities (BOQ)'
      ]
    },
    documents: [
      { id: 'doc-1', name: 'Geotechnical_Soil_Report_Rev2.pdf', type: 'PDF', size: '4.2 MB', uploadedAt: 'Aug 5, 2026', url: '#' },
      { id: 'doc-2', name: 'Structural_Elevation_Blueprint.dwg', type: 'CAD', size: '18.6 MB', uploadedAt: 'Aug 5, 2026', url: '#' },
      { id: 'doc-3', name: 'Preliminary_BOQ_Draft.xlsx', type: 'BOQ', size: '1.8 MB', uploadedAt: 'Aug 5, 2026', url: '#' }
    ],
    timeline: [
      { id: 'act-1', title: 'Lead Created', description: 'Submitted quote request via public portal', timestamp: 'Aug 5, 14:32', author: 'System', icon: 'inbox' },
      { id: 'act-2', title: 'AI Analysis Completed', description: 'Generated priority score and contract estimate', timestamp: 'Aug 5, 14:33', author: 'AtlasAI', icon: 'auto_awesome' }
    ],
    notes: [
      { id: 'note-1', author: 'Elena Rostova', timestamp: 'Aug 5, 15:10', content: 'Client requested an urgent turnaround for the structural feasibility report before Friday board review.' }
    ]
  },
  {
    id: 'lead-102',
    companyName: 'Metro Transit Infrastructure',
    contactPerson: 'Director James Sterling',
    email: 'j.sterling@metrotransit.gov',
    phone: '+1 (555) 890-1234',
    website: 'https://metrotransit.gov',
    location: 'Chicago, Illinois, USA',
    country: 'USA',
    projectTitle: 'Overhead Monorail Deck Expansion',
    projectType: 'Civil Infrastructure',
    estimatedBudget: '$45,000,000',
    preferredStartDate: 'Q4 2026',
    estimatedTimeline: '24 Months',
    description: 'Civil structural engineering for 4.2 km pre-stressed concrete monorail deck extension with seismic dampening systems.',
    status: 'Proposal Sent',
    dateReceived: '2026-08-04 09:15',
    unread: false,
    assignedEmployee: 'David Chen',
    aiAnalysis: {
      complexity: 'Critical',
      contractValue: '$45.0M',
      priority: 'Urgent',
      requestedServices: ['Civil Heavy Engineering', 'Pre-stressed Concrete', 'Seismic Analysis', 'Site Logistics'],
      suggestedSteps: [
        'Confirm attendance for city council procurement hearing',
        'Finalize insurance bonding limits with underwriters',
        'Submit revised milestone disbursement schedule'
      ]
    },
    documents: [
      { id: 'doc-4', name: 'RFP_Municipal_Specifications.pdf', type: 'Specification', size: '12.4 MB', uploadedAt: 'Aug 4, 2026', url: '#' },
      { id: 'doc-5', name: 'Alignment_Vector_Survey.dwg', type: 'CAD', size: '32.1 MB', uploadedAt: 'Aug 4, 2026', url: '#' }
    ],
    timeline: [
      { id: 'act-3', title: 'Lead Created', description: 'Municipal RFP uploaded to portal', timestamp: 'Aug 4, 09:15', author: 'System', icon: 'inbox' },
      { id: 'act-4', title: 'Admin Viewed', description: 'Assigned lead to David Chen', timestamp: 'Aug 4, 10:00', author: 'David Chen', icon: 'visibility' },
      { id: 'act-5', title: 'Proposal Uploaded', description: 'Submitted formal proposal document v1', timestamp: 'Aug 5, 11:30', author: 'David Chen', icon: 'send' }
    ],
    notes: [
      { id: 'note-2', author: 'David Chen', timestamp: 'Aug 4, 11:00', content: 'Bonding certificate limit verified with underwriting partner.' }
    ]
  },
  {
    id: 'lead-103',
    companyName: 'Apex Global Logistics',
    contactPerson: 'Sarah Connor',
    email: 's.connor@apexlogistics.com',
    phone: '+1 (555) 432-7654',
    website: 'https://apexlogistics.com',
    location: 'Seattle, Washington, USA',
    country: 'USA',
    projectTitle: 'Port Distribution Facility Phase 2',
    projectType: 'Industrial Warehouse',
    estimatedBudget: '$18,200,000',
    preferredStartDate: 'Q1 2027',
    estimatedTimeline: '14 Months',
    description: '350,000 sq ft logistics fulfillment center with heavy slab flooring, automated crane rails, and solar roof deck installation.',
    status: 'Meeting Scheduled',
    dateReceived: '2026-08-03 16:45',
    unread: false,
    assignedEmployee: 'Elena Rostova',
    aiAnalysis: {
      complexity: 'Medium',
      contractValue: '$18.2M',
      priority: 'High',
      requestedServices: ['Heavy Slab Foundation', 'Steel Framing', 'Automated Crane Rails'],
      suggestedSteps: [
        'Prepare presentation deck for Aug 8 Zoom meeting',
        'Verify local soil compaction load limits'
      ]
    },
    documents: [
      { id: 'doc-6', name: 'Warehouse_Site_Plan.pdf', type: 'PDF', size: '6.1 MB', uploadedAt: 'Aug 3, 2026', url: '#' }
    ],
    timeline: [
      { id: 'act-6', title: 'Lead Created', description: 'Quote form submitted', timestamp: 'Aug 3, 16:45', author: 'System', icon: 'inbox' },
      { id: 'act-7', title: 'Meeting Scheduled', description: 'Zoom meeting set for Aug 8 at 10:00 AM PST', timestamp: 'Aug 4, 09:30', author: 'Elena Rostova', icon: 'event' }
    ],
    notes: []
  },
  {
    id: 'lead-104',
    companyName: 'Horizon Energy Infrastructure',
    contactPerson: 'Michael Thorne',
    email: 'm.thorne@horizonenergy.io',
    phone: '+44 20 7946 0912',
    website: 'https://horizonenergy.io',
    location: 'London, United Kingdom',
    country: 'UK',
    projectTitle: 'Offshore Substation Concrete Caissons',
    projectType: 'Energy & Heavy Civil',
    estimatedBudget: '$28,000,000',
    preferredStartDate: 'Q2 2027',
    estimatedTimeline: '20 Months',
    description: 'Subsea concrete caisson foundations and structural deck mounts for offshore wind turbine transformer substation.',
    status: 'Negotiation',
    dateReceived: '2026-08-02 11:20',
    unread: false,
    assignedEmployee: 'Elena Rostova',
    aiAnalysis: {
      complexity: 'High',
      contractValue: '$28.0M',
      priority: 'High',
      requestedServices: ['Offshore Marine Engineering', 'Heavy Concrete Caissons', 'Subsea Logistics'],
      suggestedSteps: [
        'Draft final contract indemnification terms',
        'Coordinate dry dock reservation timeline'
      ]
    },
    documents: [
      { id: 'doc-7', name: 'Marine_Hydrodynamic_Study.pdf', type: 'PDF', size: '15.3 MB', uploadedAt: 'Aug 2, 2026', url: '#' }
    ],
    timeline: [
      { id: 'act-8', title: 'Lead Created', description: 'RFP inquiry submitted', timestamp: 'Aug 2, 11:20', author: 'System', icon: 'inbox' }
    ],
    notes: []
  },
  {
    id: 'lead-105',
    companyName: 'Pacific Retail REIT',
    contactPerson: 'Jennifer Lopez',
    email: 'j.lopez@pacificreit.com',
    phone: '+1 (555) 678-9012',
    website: 'https://pacificreit.com',
    location: 'San Jose, California, USA',
    country: 'USA',
    projectTitle: 'Silicon Valley Mixed-Use Pavilion',
    projectType: 'Commercial Complex',
    estimatedBudget: '$8,900,000',
    preferredStartDate: 'Q3 2026',
    estimatedTimeline: '10 Months',
    description: 'Glass-curtain structural atrium and high-contrast plaza deck construction.',
    status: 'Won',
    dateReceived: '2026-07-28 10:00',
    unread: false,
    assignedEmployee: 'David Chen',
    aiAnalysis: {
      complexity: 'Medium',
      contractValue: '$8.9M',
      priority: 'High',
      requestedServices: ['Glass Curtain Walls', 'Plaza Structural Deck'],
      suggestedSteps: ['Issue mobilization deposit invoice', 'Assign resident field engineer']
    },
    documents: [],
    timeline: [
      { id: 'act-9', title: 'Contract Signed', description: 'Deposit received. Project moved to active status.', timestamp: 'Aug 1, 16:00', author: 'System', icon: 'verified' }
    ],
    notes: []
  }
];

export default function LeadInboxPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>('lead-101');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'budget_high'>('newest');
  const [isLoading, setIsLoading] = useState(false);

  // Note creation
  const [newNoteText, setNewNoteText] = useState('');
  const [aiModalAction, setAiModalAction] = useState<string | null>(null);

  // Active Lead Object
  const activeLead = useMemo(() => {
    return leads.find(l => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  // Statistics
  const stats = useMemo(() => {
    return {
      newLeads: leads.filter(l => l.status === 'New').length,
      contacted: leads.filter(l => l.status === 'Contacted' || l.status === 'Reviewed').length,
      proposalSent: leads.filter(l => l.status === 'Proposal Sent' || l.status === 'Meeting Scheduled').length,
      wonProjects: leads.filter(l => l.status === 'Won').length,
      lostLeads: leads.filter(l => l.status === 'Lost').length,
    };
  }, [leads]);

  // Filtered & Sorted Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter(l => {
        const matchesSearch =
          l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
        const matchesType = typeFilter === 'All' || l.projectType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.dateReceived).getTime() - new Date(a.dateReceived).getTime();
        if (sortBy === 'oldest') return new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime();
        if (sortBy === 'budget_high') {
          const valA = parseFloat(a.estimatedBudget.replace(/[^0-9.]/g, '')) || 0;
          const valB = parseFloat(b.estimatedBudget.replace(/[^0-9.]/g, '')) || 0;
          return valB - valA;
        }
        return 0;
      });
  }, [leads, searchQuery, statusFilter, typeFilter, sortBy]);

  // Handlers
  const handleSelectLead = (id: string) => {
    setSelectedLeadId(id);
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, unread: false } : l)));
  };

  const handleUpdateStatus = (newStatus: LeadStatus) => {
    if (!selectedLeadId) return;
    setLeads(prev =>
      prev.map(l => {
        if (l.id === selectedLeadId) {
          const updatedTimeline: ActivityItem = {
            id: `act-${Date.now()}`,
            title: `Status Changed to ${newStatus}`,
            description: `Lead status updated in Admin Dashboard`,
            timestamp: 'Just now',
            author: 'Elena Rostova',
            icon: 'sync'
          };
          return {
            ...l,
            status: newStatus,
            timeline: [updatedTimeline, ...l.timeline]
          };
        }
        return l;
      })
    );
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLeadId) return;
    
    const newNoteObj: AdminNote = {
      id: `note-${Date.now()}`,
      author: 'Elena Rostova',
      timestamp: 'Just now',
      content: newNoteText.trim()
    };

    setLeads(prev =>
      prev.map(l => (l.id === selectedLeadId ? { ...l, notes: [newNoteObj, ...l.notes] } : l))
    );
    setNewNoteText('');
  };

  const handleDeleteNote = (noteId: string) => {
    if (!selectedLeadId) return;
    setLeads(prev =>
      prev.map(l =>
        l.id === selectedLeadId ? { ...l, notes: l.notes.filter(n => n.id !== noteId) } : l
      )
    );
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // Helper function for status badges
  const getStatusBadgeStyle = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Reviewed':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Meeting Scheduled':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Proposal Sent':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Negotiation':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Won':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Lost':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="font-body relative min-h-screen text-white bg-[#0a0e1a] selection:bg-[#7dd3fc] selection:text-[#001f2e]">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7dd3fc]/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#f59e0b]/5 rounded-full blur-[140px]"></div>
      </div>

      {/* Top Fixed Header */}
      <DashboardHeader onSearchChange={setSearchQuery} />

      {/* Main Container */}
      <div className="flex">
        
        {/* Left Sidebar */}
        <aside className="w-[220px] bg-[#0f1524]/80 backdrop-blur-[24px] border-r border-[#7dd3fc]/20 flex flex-col justify-between h-screen fixed left-0 top-0 z-50 pt-4 pb-6">
          <div className="flex flex-col gap-6">
            <div className="px-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <img src="/images/logo.png" alt="AtlasBuild Logo" className="h-7 w-auto object-contain" />
                <span className="text-lg font-headline font-bold tracking-tight text-white">
                  Atlas<span className="text-[#7dd3fc]">Build</span>
                </span>
              </Link>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              <Link href="/dashboard" className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm">
                <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
                Dashboard
              </Link>

              <Link href="/dashboard/leads" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#7dd3fc]/20 text-[#7dd3fc] font-semibold border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.15)] transition-all">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-3 text-[20px]">inbox</span>
                  Lead Inbox
                </div>
                <span className="bg-[#7dd3fc] text-[#001f2e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {stats.newLeads}
                </span>
              </Link>

              <Link href="/portfolio" className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm">
                <span className="material-symbols-outlined mr-3 text-[20px]">account_tree</span>
                Portfolio
              </Link>

              <Link href="/quotes" className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm">
                <span className="material-symbols-outlined mr-3 text-[20px]">request_quote</span>
                Build Quotes
              </Link>

              <Link href="/dashboard/roles" className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm">
                <span className="material-symbols-outlined mr-3 text-[20px]">admin_panel_settings</span>
                Access Roles
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="pl-[220px] w-full pt-16 min-h-screen flex flex-col">
          
          <main className="p-6 lg:p-8 flex-1 flex flex-col gap-6 max-w-[1700px] w-full mx-auto">
            
            {/* PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f1524]/60 backdrop-blur-[24px] border border-[#7dd3fc]/20 p-6 rounded-2xl shadow-xl">
              <div>
                <h1 className="text-2xl font-headline font-bold tracking-tight text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#7dd3fc] text-[28px]">inbox</span>
                  Lead Inbox
                </h1>
                <p className="text-xs text-white/70 mt-1">
                  Manage incoming client inquiries, quote requests, engineering build requests, and RFP submissions.
                </p>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/50 text-[18px]">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leads, companies..."
                    className="pl-9 pr-4 py-2 bg-[#0a0e1a]/80 border border-[#7dd3fc]/30 rounded-xl text-xs text-white placeholder-white/40 focus:border-[#7dd3fc] outline-none transition-all w-48 sm:w-60"
                  />
                </div>

                {/* Filter Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0a0e1a]/80 border border-[#7dd3fc]/30 rounded-xl text-xs text-white outline-none cursor-pointer hover:border-[#7dd3fc] transition-colors"
                >
                  <option value="All" className="bg-[#0f1524]">All Statuses</option>
                  <option value="New" className="bg-[#0f1524]">New</option>
                  <option value="Reviewed" className="bg-[#0f1524]">Reviewed</option>
                  <option value="Contacted" className="bg-[#0f1524]">Contacted</option>
                  <option value="Meeting Scheduled" className="bg-[#0f1524]">Meeting Scheduled</option>
                  <option value="Proposal Sent" className="bg-[#0f1524]">Proposal Sent</option>
                  <option value="Negotiation" className="bg-[#0f1524]">Negotiation</option>
                  <option value="Won" className="bg-[#0f1524]">Won</option>
                  <option value="Lost" className="bg-[#0f1524]">Lost</option>
                </select>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-[#0a0e1a]/80 border border-[#7dd3fc]/30 rounded-xl text-xs text-white outline-none cursor-pointer hover:border-[#7dd3fc] transition-colors"
                >
                  <option value="newest" className="bg-[#0f1524]">Newest First</option>
                  <option value="oldest" className="bg-[#0f1524]">Oldest First</option>
                  <option value="budget_high" className="bg-[#0f1524]">Highest Budget</option>
                </select>

                {/* Refresh Button */}
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="p-2 bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 text-[#7dd3fc] rounded-xl hover:bg-[#7dd3fc]/20 transition-all flex items-center justify-center"
                  title="Refresh Leads"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isLoading ? 'animate-spin' : ''}`}>
                    refresh
                  </span>
                </button>
              </div>
            </div>

            {/* TOP STATISTICS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              <motion.div whileHover={{ y: -3 }} className="bg-[#0f1524]/60 border border-blue-500/30 p-4 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-blue-400">
                  <span className="material-symbols-outlined text-[24px]">inbox</span>
                  <span className="text-[10px] font-mono font-bold bg-blue-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +18%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-headline font-bold text-white">{stats.newLeads}</span>
                  <p className="text-[11px] text-white/60 font-medium">New Leads</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="bg-[#0f1524]/60 border border-amber-500/30 p-4 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-amber-400">
                  <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +8%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-headline font-bold text-white">{stats.contacted}</span>
                  <p className="text-[11px] text-white/60 font-medium">Contacted</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="bg-[#0f1524]/60 border border-cyan-500/30 p-4 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-cyan-300">
                  <span className="material-symbols-outlined text-[24px]">send</span>
                  <span className="text-[10px] font-mono font-bold bg-cyan-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +12%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-headline font-bold text-white">{stats.proposalSent}</span>
                  <p className="text-[11px] text-white/60 font-medium">Proposals Sent</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="bg-[#0f1524]/60 border border-emerald-500/30 p-4 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="material-symbols-outlined text-[24px]">emoji_events</span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +24%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-headline font-bold text-white">{stats.wonProjects}</span>
                  <p className="text-[11px] text-white/60 font-medium">Won Projects</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="bg-[#0f1524]/60 border border-rose-500/30 p-4 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-rose-400">
                  <span className="material-symbols-outlined text-[24px]">highlight_off</span>
                  <span className="text-[10px] font-mono font-bold bg-rose-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">trending_down</span> -5%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-headline font-bold text-white">{stats.lostLeads}</span>
                  <p className="text-[11px] text-white/60 font-medium">Lost Leads</p>
                </div>
              </motion.div>

            </div>

            {/* MAIN TWO-COLUMN SPLIT CRM CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
              
              {/* LEFT COLUMN (40% - 5 Cols on lg) - LEAD LIST */}
              <div className="lg:col-span-5 flex flex-col gap-4 bg-[#0f1524]/60 backdrop-blur-[24px] border border-[#7dd3fc]/20 p-4 rounded-2xl h-full min-h-[600px]">
                
                <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7dd3fc]">Inquiries</span>
                    <span className="bg-[#7dd3fc]/20 text-[#7dd3fc] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                      {filteredLeads.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/50">Click card to open details</span>
                </div>

                {/* Skeleton Loader during Refresh */}
                {isLoading ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-28 bg-white/5 animate-pulse rounded-xl border border-white/5"></div>
                    ))}
                  </div>
                ) : filteredLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-white/40 my-auto">
                    <span className="material-symbols-outlined text-[48px] mb-2">search_off</span>
                    <p className="text-sm font-semibold">No leads match your filter</p>
                    <p className="text-xs mt-1">Try clearing your search query or status filter.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 overflow-y-auto max-h-[700px] pr-1">
                    {filteredLeads.map((lead) => {
                      const isSelected = lead.id === selectedLeadId;
                      return (
                        <motion.div
                          key={lead.id}
                          layout
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleSelectLead(lead.id)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border relative flex flex-col gap-2.5 ${
                            isSelected
                              ? 'bg-[#7dd3fc]/15 border-[#7dd3fc] shadow-[0_0_20px_rgba(125,211,252,0.15)]'
                              : 'bg-[#0a0e1a]/80 border-white/10 hover:border-[#7dd3fc]/40 hover:bg-[#0a0e1a]'
                          }`}
                        >
                          {/* Unread Indicator */}
                          {lead.unread && (
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#7dd3fc] animate-pulse"></span>
                          )}

                          {/* Top Row: Company & Status */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-bold text-white group-hover:text-[#7dd3fc] transition-colors">
                                {lead.companyName}
                              </h3>
                              <p className="text-xs text-white/70 font-medium">{lead.contactPerson}</p>
                            </div>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadgeStyle(lead.status)}`}>
                              {lead.status}
                            </span>
                          </div>

                          {/* Middle Row: Project Type & Budget */}
                          <div className="flex items-center justify-between text-xs text-white/60 pt-1 border-t border-white/5">
                            <span className="flex items-center gap-1 font-mono text-[11px]">
                              <span className="material-symbols-outlined text-[14px] text-[#7dd3fc]">business</span>
                              {lead.projectType}
                            </span>
                            <span className="font-bold font-mono text-[#f59e0b]">
                              {lead.estimatedBudget}
                            </span>
                          </div>

                          {/* Bottom Row: Location & Date */}
                          <div className="flex items-center justify-between text-[10px] text-white/40">
                            <span className="flex items-center gap-1 truncate max-w-[180px]">
                              <span className="material-symbols-outlined text-[12px]">location_on</span>
                              {lead.location}
                            </span>
                            <span>{lead.dateReceived.split(' ')[0]}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN (60% - 7 Cols on lg) - LEAD DETAILS */}
              <div className="lg:col-span-7 bg-[#0f1524]/60 backdrop-blur-[24px] border border-[#7dd3fc]/20 p-6 rounded-2xl min-h-[600px] flex flex-col gap-6">
                
                {!activeLead ? (
                  /* EMPTY STATE */
                  <div className="flex flex-col items-center justify-center my-auto p-12 text-center text-white/40 gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc]">
                      <span className="material-symbols-outlined text-[40px]">inbox_customize</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">No Lead Selected</h3>
                      <p className="text-xs text-white/60 mt-1 max-w-sm">
                        Select an incoming client inquiry from the lead list on the left to view detailed project specifications, AI analysis, documents, and notes.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ACTIVE LEAD DETAILS PANEL */
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-6"
                    >
                      
                      {/* ACTION BUTTONS & WORKFLOW HEADER */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                        
                        {/* Status Change Workflow Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono uppercase text-white/60">Status:</span>
                          <select
                            value={activeLead.status}
                            onChange={(e) => handleUpdateStatus(e.target.value as LeadStatus)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold outline-none border cursor-pointer transition-all ${getStatusBadgeStyle(activeLead.status)}`}
                          >
                            <option value="New" className="bg-[#0f1524] text-white">New</option>
                            <option value="Reviewed" className="bg-[#0f1524] text-white">Reviewed</option>
                            <option value="Contacted" className="bg-[#0f1524] text-white">Contacted</option>
                            <option value="Meeting Scheduled" className="bg-[#0f1524] text-white">Meeting Scheduled</option>
                            <option value="Proposal Sent" className="bg-[#0f1524] text-white">Proposal Sent</option>
                            <option value="Negotiation" className="bg-[#0f1524] text-white">Negotiation</option>
                            <option value="Won" className="bg-[#0f1524] text-white">Won</option>
                            <option value="Lost" className="bg-[#0f1524] text-white">Lost</option>
                          </select>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => alert(`Email interface opened for ${activeLead.email}`)}
                            className="px-3 py-1.5 bg-[#7dd3fc]/15 border border-[#7dd3fc]/30 text-[#7dd3fc] text-xs font-semibold rounded-lg hover:bg-[#7dd3fc]/25 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">mail</span>
                            Send Email
                          </button>

                          <button
                            type="button"
                            onClick={() => alert(`Meeting scheduler opened for ${activeLead.companyName}`)}
                            className="px-3 py-1.5 bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-lg hover:bg-purple-500/25 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">event</span>
                            Schedule Meeting
                          </button>

                          <button
                            type="button"
                            onClick={() => alert(`RFP Proposal Generator launched for ${activeLead.projectTitle}`)}
                            className="px-3 py-1.5 bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-semibold rounded-lg hover:bg-[#f59e0b]/25 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">description</span>
                            Generate Proposal
                          </button>
                        </div>

                      </div>

                      {/* CLIENT INFORMATION CARD */}
                      <div className="bg-[#0a0e1a]/80 border border-white/10 p-5 rounded-xl flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7dd3fc] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">domain</span>
                          Client Information
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs pt-1">
                          <div>
                            <span className="text-white/50 text-[10px] block">COMPANY NAME</span>
                            <span className="font-bold text-white text-sm">{activeLead.companyName}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">CONTACT PERSON</span>
                            <span className="font-semibold text-white">{activeLead.contactPerson}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">EMAIL</span>
                            <a href={`mailto:${activeLead.email}`} className="text-[#7dd3fc] hover:underline font-mono">
                              {activeLead.email}
                            </a>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">PHONE</span>
                            <span className="font-mono text-white/90">{activeLead.phone}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">WEBSITE</span>
                            <a href={activeLead.website} target="_blank" rel="noreferrer" className="text-[#7dd3fc] hover:underline font-mono">
                              {activeLead.website}
                            </a>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">LOCATION</span>
                            <span className="text-white/90">{activeLead.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* PROJECT INFORMATION CARD */}
                      <div className="bg-[#0a0e1a]/80 border border-white/10 p-5 rounded-xl flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7dd3fc] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">architecture</span>
                          Project Specifications
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-white/50 text-[10px] block">PROJECT TITLE</span>
                            <span className="font-bold text-white">{activeLead.projectTitle}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">PROJECT SECTOR / TYPE</span>
                            <span className="font-medium text-white">{activeLead.projectType}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">ESTIMATED BUDGET</span>
                            <span className="font-bold text-[#f59e0b] font-mono text-sm">{activeLead.estimatedBudget}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">PREFERRED START DATE</span>
                            <span className="text-white">{activeLead.preferredStartDate}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">ESTIMATED TIMELINE</span>
                            <span className="text-white font-mono">{activeLead.estimatedTimeline}</span>
                          </div>

                          <div>
                            <span className="text-white/50 text-[10px] block">ASSIGNED PM</span>
                            <span className="text-white font-medium">{activeLead.assignedEmployee || 'Unassigned'}</span>
                          </div>
                        </div>

                        <div className="mt-2 pt-3 border-t border-white/5">
                          <span className="text-white/50 text-[10px] block mb-1">PROJECT SCOPE DESCRIPTION</span>
                          <p className="text-xs text-white/80 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                            {activeLead.description}
                          </p>
                        </div>
                      </div>

                      {/* AI PROJECT ANALYSIS CARD */}
                      <div className="bg-gradient-to-r from-[#0f1524] via-[#151c30] to-[#0f1524] border border-[#7dd3fc]/40 p-5 rounded-xl flex flex-col gap-4 shadow-[0_0_25px_rgba(125,211,252,0.1)] relative overflow-hidden">
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#7dd3fc] text-[20px] animate-pulse">auto_awesome</span>
                            <h3 className="text-sm font-bold text-white tracking-wide font-headline">AI Project Analysis</h3>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-[#7dd3fc]/20 text-[#7dd3fc] px-2 py-0.5 rounded-full border border-[#7dd3fc]/30">
                            AtlasAI Engine v2.4
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-[#0a0e1a]/90 p-3 rounded-lg border border-white/10">
                            <span className="text-[10px] text-white/50 block">PROJECT COMPLEXITY</span>
                            <span className="text-xs font-bold text-purple-300 font-mono">{activeLead.aiAnalysis.complexity}</span>
                          </div>

                          <div className="bg-[#0a0e1a]/90 p-3 rounded-lg border border-white/10">
                            <span className="text-[10px] text-white/50 block">EST. CONTRACT VALUE</span>
                            <span className="text-xs font-bold text-[#f59e0b] font-mono">{activeLead.aiAnalysis.contractValue}</span>
                          </div>

                          <div className="bg-[#0a0e1a]/90 p-3 rounded-lg border border-white/10">
                            <span className="text-[10px] text-white/50 block">RECOMMENDED PRIORITY</span>
                            <span className="text-xs font-bold text-[#7dd3fc] font-mono">{activeLead.aiAnalysis.priority}</span>
                          </div>
                        </div>

                        {/* Requested Services Tags */}
                        <div>
                          <span className="text-[10px] text-white/50 block mb-1.5 font-mono">REQUESTED ENGINEERING SERVICES</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {activeLead.aiAnalysis.requestedServices.map((srv, idx) => (
                              <span key={idx} className="bg-white/10 text-white text-[11px] px-2.5 py-1 rounded-md border border-white/10 font-medium">
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Suggested Next Steps */}
                        <div className="bg-[#0a0e1a]/90 p-3 rounded-lg border border-white/10">
                          <span className="text-[10px] font-mono text-[#7dd3fc] block mb-1 font-bold">SUGGESTED NEXT STEPS</span>
                          <ul className="space-y-1 text-xs text-white/80">
                            {activeLead.aiAnalysis.suggestedSteps.map((step, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[14px] text-[#7dd3fc]">check_circle</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* AI Quick Actions */}
                        <div className="flex items-center gap-2 flex-wrap pt-1">
                          <button
                            type="button"
                            onClick={() => setAiModalAction('Follow-up email draft generated for client.')}
                            className="px-3 py-1.5 bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-[#7dd3fc] text-xs font-bold rounded-lg hover:bg-[#7dd3fc]/30 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                            Generate Follow-up Email
                          </button>

                          <button
                            type="button"
                            onClick={() => setAiModalAction('RFP Summary: High complexity build requiring deep piling foundation & LEED Gold specs.')}
                            className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">summarize</span>
                            Summarize RFP
                          </button>

                          <button
                            type="button"
                            onClick={() => setAiModalAction('Extracted Requirements: 12-Story Tower, 18 Month Duration, $12.5M Budget, LEED Gold.')}
                            className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                            Extract Requirements
                          </button>
                        </div>

                        {/* AI Modal Result Notification */}
                        {aiModalAction && (
                          <div className="mt-2 p-3 bg-[#7dd3fc]/15 border border-[#7dd3fc]/30 rounded-lg text-xs text-[#7dd3fc] flex items-center justify-between">
                            <span>{aiModalAction}</span>
                            <button type="button" onClick={() => setAiModalAction(null)} className="text-white hover:text-[#7dd3fc]">
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        )}

                      </div>

                      {/* UPLOADED DOCUMENTS SECTION */}
                      <div className="bg-[#0a0e1a]/80 border border-white/10 p-5 rounded-xl flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#7dd3fc] flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">folder_open</span>
                            Uploaded Documents & Drawings ({activeLead.documents.length})
                          </span>
                        </div>

                        {activeLead.documents.length === 0 ? (
                          <p className="text-xs text-white/40 py-2 italic">No documents attached with this lead submission.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activeLead.documents.map((doc) => (
                              <div key={doc.id} className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5 truncate">
                                  <span className="material-symbols-outlined text-[#7dd3fc] text-[22px]">
                                    {doc.type === 'CAD' ? 'architecture' : doc.type === 'PDF' ? 'picture_as_pdf' : 'description'}
                                  </span>
                                  <div className="truncate">
                                    <span className="text-xs font-bold text-white truncate block">{doc.name}</span>
                                    <span className="text-[10px] text-white/40 font-mono">{doc.type} • {doc.size}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => alert(`Previewing ${doc.name}`)}
                                    className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"
                                    title="Preview"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => alert(`Downloading ${doc.name}`)}
                                    className="p-1 text-[#7dd3fc] hover:bg-[#7dd3fc]/10 rounded"
                                    title="Download"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ACTIVITY TIMELINE */}
                      <div className="bg-[#0a0e1a]/80 border border-white/10 p-5 rounded-xl flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7dd3fc] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">history</span>
                          Activity Timeline
                        </span>

                        <div className="relative pl-6 space-y-4 border-l border-white/10 ml-2 pt-1">
                          {activeLead.timeline.map((act) => (
                            <div key={act.id} className="relative">
                              <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-[#0f1524] border border-[#7dd3fc] flex items-center justify-center text-[#7dd3fc]">
                                <span className="material-symbols-outlined text-[14px]">{act.icon}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white">{act.title}</span>
                                  <span className="text-[10px] font-mono text-white/40">• {act.timestamp}</span>
                                </div>
                                <p className="text-xs text-white/70 mt-0.5">{act.description}</p>
                                <span className="text-[10px] text-white/40 font-mono">By {act.author}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ADMIN NOTES SECTION */}
                      <div className="bg-[#0a0e1a]/80 border border-white/10 p-5 rounded-xl flex flex-col gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7dd3fc] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">edit_note</span>
                          Admin Notes & Internal Audit
                        </span>

                        {/* Add Note Input */}
                        <form onSubmit={handleAddNote} className="flex gap-2">
                          <input
                            type="text"
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            placeholder="Add an internal note or meeting summary..."
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:border-[#7dd3fc] outline-none transition-all"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#7dd3fc] text-[#001f2e] text-xs font-bold rounded-xl hover:bg-[#38bdf8] transition-all shadow-[0_0_12px_rgba(125,211,252,0.3)]"
                          >
                            Add Note
                          </button>
                        </form>

                        {/* Notes List */}
                        <div className="space-y-3">
                          {activeLead.notes.length === 0 ? (
                            <p className="text-xs text-white/40 italic">No notes added yet for this lead.</p>
                          ) : (
                            activeLead.notes.map((note) => (
                              <div key={note.id} className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-white">{note.author}</span>
                                    <span className="text-[10px] text-white/40 font-mono">{note.timestamp}</span>
                                  </div>
                                  <p className="text-xs text-white/80">{note.content}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNote(note.id)}
                                  className="text-white/40 hover:text-rose-400 p-1"
                                  title="Delete Note"
                                >
                                  <span className="material-symbols-outlined text-[16px]">delete</span>
                                </button>
                              </div>
                            ))
                          )}
                        </div>

                      </div>

                    </motion.div>
                  </AnimatePresence>
                )}

              </div>

            </div>

          </main>
        </div>

      </div>
    </div>
  );
}
