export interface ProjectPhaseContext {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED' | string;
  sortOrder: number;
}

export interface FeedUpdateContext {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface AssetContext {
  id: string;
  url: string;
  mimeType: string;
  assetType: string;
}

export interface LinkedRfpContext {
  id: string;
  projectTitle: string;
  sector: string;
  budgetRange: string;
  location: string;
  status: string;
  aiPriorityLevel?: string | null;
  aiOpportunityScore?: number | null;
  aiRiskScore?: number | null;
}

export interface ProjectContextData {
  project: {
    id: string;
    title: string;
    description: string;
    sector: string;
    location: string;
    status: string;
    budget: string;
    squareFootage: number;
    startDate: string;
    endDate: string | null;
    completionRate: number;
    emrScore: number;
    bondingLimit: string | null;
    projectManager: {
      name: string;
      email: string;
    };
    clients: Array<{
      name?: string | null;
      email: string;
    }>;
  };
  phases: ProjectPhaseContext[];
  feedUpdates: FeedUpdateContext[];
  assets: AssetContext[];
  linkedRfp?: LinkedRfpContext | null;
}

export interface ProjectAiChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ProjectAiChatRequest {
  message: string;
  history?: ProjectAiChatMessage[];
}

export interface ProjectAiChatResponse {
  reply: string;
  providerUsed: string;
  timestamp: string;
  projectId: string;
  projectTitle: string;
}
