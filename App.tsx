
import React, { useState } from 'react';
import { fetchTrendAnalysis } from './services/geminiService';
import { TrendAnalysisResult } from './types';
import TopicCard from './components/TopicCard';
import AnalysisSummary from './components/AnalysisSummary';

const App: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrendAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await fetchTrendAnalysis(niche);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при анализе данных.");
    } finally {
      setLoading(false);
    }
  };

  const exportToTxt = () => {
    if (!result) return;

    let content = `ОТЧЕТ ПО ТРЕНДАМ И SEO: ${niche || 'Общие темы'}\n`;
    content += `Дата формирования: ${new Date().toLocaleString('ru-RU')}\n`;
    content += `==========================================\n\n`;

    result.topics.forEach((topic, index) => {
      content += `${index + 1}. Название статьи: ${topic.title}\n`;
      content += `   Ссылка: ${topic.link}\n`;
      content += `   Источник: ${topic.source}\n`;
      content += `   Дата публикации: ${topic.publishDate}\n`;
      content += `   Анонс: ${topic.announcement}\n\n`;
      content += `   SEO-анализ:\n`;
      content += `   - Ключевые слова: ${topic.seoAnalysis.keywords.join(', ')}\n`;
      content += `   - Тип интента: ${topic.seoAnalysis.intent}\n`;
      content += `   - Динамика: ${topic.seoAnalysis.dynamics}\n`;
      content += `   - Конкурентность: ${topic.seoAnalysis.competition}\n`;
      content += `   - Потенциал: ${topic.seoAnalysis.potential}\n\n`;
      content += `   Почему привлекательна:\n`;
      content += `   - Боли: ${topic.whyAttractive.painPoints}\n`;
      content += `   - Читаемость: ${topic.whyAttractive.readabilityReason}\n`;
      content += `   - Дискуссия: ${topic.whyAttractive.discussionPotential}\n`;
      content += `   - Коммерческий потенциал: ${topic.whyAttractive.commercialPotential ? 'Да' : 'Нет'}\n`;
      content += `------------------------------------------\n\n`;
    });

    content += `ИТОГОВЫЙ АНАЛИТИЧЕСКИЙ БЛОК\n`;
    content += `Доминирующие тренды: ${result.summary.dominantTrends.join(', ')}\n`;
    content += `Уровень конкуренции: ${result.summary.nicheCompetitionLevel}\n`;
    content += `Рекомендации: ${result.summary.priorityRecommendations.join('; ')}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trend-scan-${niche || 'general'}-${new Date().toISOString().slice(0,10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm no-print">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              TrendScan <span className="text-indigo-600">SEO</span>
            </h1>
          </div>
          <div className="hidden md:block text-slate-500 text-sm font-medium">
            Аналитическая система мониторинга трендов
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12">
        <div className="text-center mb-12 no-print">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Найдите SEO-потенциал в текущих трендах
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Глубокий анализ открытых источников, Google Trends и Reddit. 
            Только актуальные темы с подтвержденным поисковым спросом.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16 no-print">
          <form onSubmit={handleAnalyze} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-32 py-4 bg-white border border-slate-300 rounded-2xl text-slate-900 text-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Укажите нишу (напр. Складская логистика, AI, Крипто)..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Анализ...</span>
                </>
              ) : (
                <>
                  <span>Запуск</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
          {loading && (
            <div className="mt-4 flex items-center justify-center gap-3 text-slate-500 animate-pulse">
              <span className="text-sm">Сканируем Google Trends, Reddit и новостные агрегаторы...</span>
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl flex items-center gap-4 mb-12 no-print">
            <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            <div>
              <p className="font-bold">Ошибка сканирования</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-2xl font-bold text-slate-900">
                Найдено тем: {result.topics.length}
              </h3>
              
              <div className="flex items-center gap-3 no-print">
                <button 
                  onClick={exportToTxt}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors text-sm"
                >
                  <i className="fa-solid fa-file-lines"></i>
                  TXT
                </button>
                <button 
                  onClick={exportToPdf}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {result.topics.map((topic, index) => (
                <TopicCard key={index} topic={topic} />
              ))}
            </div>

            {result.summary && <AnalysisSummary summary={result.summary} />}
          </div>
        )}

        {!result && !loading && !error && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 placeholder-state">
            <div className="text-slate-300 text-6xl mb-4">
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <h4 className="text-slate-900 font-bold text-xl mb-1">Готов к работе</h4>
            <p className="text-slate-500">Введите поисковый запрос или оставьте пустым для общего анализа</p>
          </div>
        )}
      </main>
      
      <footer className="mt-20 border-t border-slate-200 pt-10 text-center text-slate-500 text-sm no-print">
        &copy; 2024 TrendScan SEO Analyzer. Работает на базе Gemini 3 Pro с Google Search Grounding.
      </footer>
    </div>
  );
};

export default App;
