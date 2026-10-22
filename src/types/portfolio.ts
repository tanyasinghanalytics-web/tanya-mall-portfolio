export interface KpiItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  sentence: string;
  trend: number[]; // 8 points for sparkline
}

export interface ProfileRow {
  col: string;
  type: string;
  value: string;
  details?: string;
}

export interface Milestone {
  id: string;
  x: number;
  y: number;
  year: string;
  title: string;
  subtitle: string;
  body: string;
  toolsUsed: string[];
  keyWin: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  short: string;
  headline: string;
  story: string;
  comment: string;
  code: string;
  output: string;
  simulatedResult?: {
    headers: string[];
    rows: (string | number)[][];
    summaryText: string;
  };
}

export interface ToolMatrixItem {
  name: string;
  group: string;
  use: number[]; // 1 or 0 for each of the 5 stages
  experience: string;
  favoriteFeature: string;
}

export interface CaseFile {
  id: string;
  title: string;
  domain: string;
  tagline: string;
  tags: string[];
  acts: {
    hook: string;
    evidence: string;
    twist: string;
    ending: string;
  };
  chartTitle: string;
  heights: number[];
  twistIndex: number;
  twistLabel: string;
  impact: string;
  impactLabel: string;
  sqlSnippet: string;
  csvData: string;
  dashboardMetrics: {
    label: string;
    value: string;
    change: string;
  }[];
}

export interface Credential {
  id: string;
  kind: 'cert' | 'degree';
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  skills: string[];
}

export interface Quote {
  id: string;
  text: string;
  who: string;
  role: string;
  company: string;
}

export interface PortfolioData {
  name: string;
  initials: string;
  role: string;
  city: string;
  email: string;
  linkedin: string;
  github?: string;
  phone?: string;
  company?: string;
  resumeFileName: string;
  resumePdfPath?: string;
  status: string;
  skillsSummary: string;
  rotateFrom: string[];
  rotateTo: string[];
  kpis: KpiItem[];
  profile: ProfileRow[];
  milestones: Milestone[];
  nowLog: string[];
  stages: PipelineStage[];
  tools: ToolMatrixItem[];
  cases: CaseFile[];
  credentials: Credential[];
  quotes: Quote[];
}

export interface InquiryRecord {
  id: string;
  timestamp: string;
  who: string;
  email: string;
  intent: string;
  role: string;
  timeline: string;
  message: string;
  status: string;
}
