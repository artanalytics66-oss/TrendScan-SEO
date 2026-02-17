
import React from 'react';
import { Topic } from '../types';

interface Props {
  topic: Topic;
}

const TopicCard: React.FC<Props> = ({ topic }) => {
  const getBadgeColor = (val?: string) => {
    if (!val) return 'bg-gray-100 text-gray-800 border-gray-200';
    switch (val) {
      case 'Высокий': case 'Высокая': return 'bg-green-100 text-green-800 border-green-200';
      case 'Средний': case 'Средняя': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Низкий': case 'Низкая': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const seo = topic.seoAnalysis || {
    keywords: [],
    intent: 'Информационный',
    dynamics: 'Неизвестно',
    competition: 'Средняя',
    potential: 'Средний'
  };

  const attractive = topic.whyAttractive || {
    painPoints: 'Нет данных',
    readabilityReason: 'Нет данных',
    discussionPotential: 'Нет данных',
    commercialPotential: false
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">
            {topic.title || 'Без названия'}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-globe"></i> {topic.source || 'Источник не указан'}
            </span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-calendar"></i> {topic.publishDate || 'Дата неизвестна'}
            </span>
          </div>
        </div>
        {topic.link && (
          <a 
            href={topic.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-4 p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Открыть источник"
          >
            <i className="fa-solid fa-external-link-alt text-lg"></i>
          </a>
        )}
      </div>

      <p className="text-slate-600 text-sm mb-6 line-clamp-3 italic">
        {topic.announcement ? `"${topic.announcement}"` : 'Анонс отсутствует'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass-chart text-indigo-500"></i>
            SEO-анализ
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Интент:</span>
              <span className="font-medium text-slate-700">{seo.intent}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Динамика:</span>
              <span className="font-medium text-slate-700">{seo.dynamics}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Конкурентность:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs border ${getBadgeColor(seo.competition)}`}>
                {seo.competition}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Потенциал трафика:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs border ${getBadgeColor(seo.potential)}`}>
                {seo.potential}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {seo.keywords?.map((kw, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded border border-slate-200">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-lightbulb text-amber-500"></i>
            Почему это взлетит?
          </h4>
          <ul className="text-sm text-slate-600 space-y-2">
            <li className="flex gap-2">
              <i className="fa-solid fa-circle-check text-green-500 mt-1 flex-shrink-0"></i>
              <span><strong>Боли:</strong> {attractive.painPoints}</span>
            </li>
            <li className="flex gap-2">
              <i className="fa-solid fa-comments text-indigo-400 mt-1 flex-shrink-0"></i>
              <span><strong>Дискуссия:</strong> {attractive.discussionPotential}</span>
            </li>
            {attractive.commercialPotential && (
              <li className="flex gap-2">
                <i className="fa-solid fa-dollar-sign text-emerald-500 mt-1 flex-shrink-0"></i>
                <span className="text-emerald-700 font-medium">Есть коммерческий потенциал</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
