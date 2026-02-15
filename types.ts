
export interface AnalysisResult {
  extractedText: string;
  engagementScore: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  strengths: string[];
  improvements: string[];
  suggestedRewrites: string[];
  hashtags: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface FileData {
  base64: string;
  mimeType: string;
  name: string;
}
