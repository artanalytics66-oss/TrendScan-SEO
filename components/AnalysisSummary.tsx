
import React from 'react';
import { AnalyticalBlock } from '../types';

interface Props {
  summary: AnalyticalBlock;
}

const AnalysisSummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="bg-indigo-900 text-white rounded-2xl p-8 shadow-xl mt-12 border border-indigo-800">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <i className="fa-solid fa-chart-line text-indigo-300"></i>
        Итоговый аналитический блок
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-indigo-200 font-semibold mb-3 uppercase tracking-wider text-xs">Доминирующие направления</h3>
          <ul className="space-y-2">
            {summary.dominantTrends.map((trend, i) => (
              <li key={i} className="flex items-center gap-2 text-indigo-50">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                {trend}
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <h3 className="text-indigo-200 font-semibold mb-1 uppercase tracking-wider text-xs">Уровень конкуренции в нише</h3>
            <p className="text-xl font-medium text-white">{summary.nicheCompetitionLevel}</p>
          </div>
        </div>

        <div>
          <h3 className="text-indigo-200 font-semibold mb-3 uppercase tracking-wider text-xs">Темы с макс. SEO-потенциалом</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {summary.maxSeoPotentialTopics.map((topic, i) => (
              <span key={i} className="bg-indigo-800/50 border border-indigo-700 px-3 py-1 rounded-lg text-sm">
                {topic}
              </span>
            ))}
          </div>

          <h3 className="text-indigo-200 font-semibold mb-3 uppercase tracking-wider text-xs">Рекомендация по приоритетам</h3>
          <ul className="space-y-3">
            {summary.priorityRecommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 bg-white/10 p-3 rounded-xl border border-white/5">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="text-sm leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSummary;
