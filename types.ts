
export interface SeoAnalysis {
  keywords: string[];
  intent: 'Информационный' | 'Коммерческий' | 'Навигационный' | 'Транзакционный';
  dynamics: string;
  competition: 'Низкая' | 'Средняя' | 'Высокая';
  potential: 'Высокий' | 'Средний' | 'Низкий';
}

export interface Topic {
  title: string;
  link: string;
  source: string;
  publishDate: string;
  announcement: string;
  seoAnalysis: SeoAnalysis;
  whyAttractive: {
    painPoints: string;
    readabilityReason: string;
    discussionPotential: string;
    commercialPotential: boolean;
  };
}

export interface AnalyticalBlock {
  dominantTrends: string[];
  nicheCompetitionLevel: string;
  maxSeoPotentialTopics: string[];
  priorityRecommendations: string[];
}

export interface TrendAnalysisResult {
  topics: Topic[];
  summary: AnalyticalBlock;
}
