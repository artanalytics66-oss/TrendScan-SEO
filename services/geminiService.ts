
import { GoogleGenAI, Type } from "@google/genai";
import { TrendAnalysisResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const fetchTrendAnalysis = async (niche?: string): Promise<TrendAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    Ты — аналитическая система мониторинга актуальных тем и поискового спроса.
    Твоя цель: найти до 10 актуальных тем (не старше 30 дней) в нише: ${niche || 'Общие тренды (бизнес, технологии, лайфстайл)'}.
    
    Используй Google Search для поиска данных в: Google Trends, Exploding Topics, Reddit, TGStat, новостных лентах.
    
    ДЛЯ КАЖДОЙ ТЕМЫ:
    1. Проверь наличие реального поискового спроса.
    2. Определи интент (Информационный, Коммерческий, Навигационный, Транзакционный).
    3. Оцени конкурентность и SEO-потенциал.
    
    ВЕРНИ ОТВЕТ СТРОГО В JSON ФОРМАТЕ, соответствующем схеме.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: "Выполни глубокий анализ трендов и SEO-потенциала за последние 30 дней.",
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                link: { type: Type.STRING },
                source: { type: Type.STRING },
                publishDate: { type: Type.STRING },
                announcement: { type: Type.STRING },
                seoAnalysis: {
                  type: Type.OBJECT,
                  properties: {
                    keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    intent: { type: Type.STRING, enum: ['Информационный', 'Коммерческий', 'Навигационный', 'Транзакционный'] },
                    dynamics: { type: Type.STRING },
                    competition: { type: Type.STRING, enum: ['Низкая', 'Средняя', 'Высокая'] },
                    potential: { type: Type.STRING, enum: ['Высокий', 'Средний', 'Низкий'] }
                  },
                  required: ['keywords', 'intent', 'dynamics', 'competition', 'potential']
                },
                whyAttractive: {
                  type: Type.OBJECT,
                  properties: {
                    painPoints: { type: Type.STRING },
                    readabilityReason: { type: Type.STRING },
                    discussionPotential: { type: Type.STRING },
                    commercialPotential: { type: Type.BOOLEAN }
                  },
                  required: ['painPoints', 'readabilityReason', 'discussionPotential', 'commercialPotential']
                }
              },
              required: ['title', 'link', 'source', 'publishDate', 'announcement', 'seoAnalysis', 'whyAttractive']
            }
          },
          summary: {
            type: Type.OBJECT,
            properties: {
              dominantTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
              nicheCompetitionLevel: { type: Type.STRING },
              maxSeoPotentialTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
              priorityRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['dominantTrends', 'nicheCompetitionLevel', 'maxSeoPotentialTopics', 'priorityRecommendations']
          }
        },
        required: ['topics', 'summary']
      }
    }
  });

  try {
    let text = response.text || "";
    // Robustly clean up potential markdown wrapping if it slips through
    text = text.replace(/```json\n?/, "").replace(/\n?```/, "").trim();
    const result = JSON.parse(text);
    return result as TrendAnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Ошибка при обработке данных от нейросети. Получен некорректный JSON.");
  }
};
