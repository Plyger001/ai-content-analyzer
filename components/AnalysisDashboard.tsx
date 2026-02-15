
import React from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  ArrowLeft,
  Quote,
  Hash,
  Activity,
  Zap
} from 'lucide-react';
import { AnalysisResult, FileData } from '../types';

interface Props {
  result: AnalysisResult;
  file: FileData | null;
  onNewAnalysis: () => void;
}

export const AnalysisDashboard: React.FC<Props> = ({ result, file, onNewAnalysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={onNewAnalysis}
        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Upload
      </button>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Engagement Score</span>
            <Activity className="text-indigo-600" size={20} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">{result.engagementScore}</span>
            <span className="text-slate-400 font-medium">/100</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${result.engagementScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Overall Sentiment</span>
            <BarChart3 className="text-indigo-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-slate-900">{result.sentiment}</div>
          <p className="text-sm text-slate-500 mt-2">
            Analysis of text tone and visual mood.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Post Insight</span>
            <TrendingUp className="text-indigo-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {result.engagementScore > 70 ? 'High Potential' : result.engagementScore > 40 ? 'Moderate' : 'Low Reach'}
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Predicted performance based on trends.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Extraction & Visual */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" />
              <h3 className="font-semibold">Extracted Content (OCR)</h3>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 text-slate-700 whitespace-pre-wrap italic text-sm leading-relaxed border border-slate-100">
                <Quote size={12} className="text-indigo-300 mb-1" />
                {result.extractedText}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Hash size={18} className="text-indigo-600" />
              <h3 className="font-semibold">Recommended Hashtags</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                    #{tag.replace('#', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Suggestions & Rewrites */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-indigo-600 text-white flex items-center gap-2">
              <CheckCircle2 size={18} />
              <h3 className="font-semibold">Strategic Improvements</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Core Strengths</h4>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-amber-600">Actionable Tweaks</h4>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Zap size={18} className="text-indigo-600" />
              <h3 className="font-semibold">Suggested Rewrites</h3>
            </div>
            <div className="p-6 space-y-4">
              {result.suggestedRewrites.map((rewrite, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Variant {i + 1}</span>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{rewrite}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
