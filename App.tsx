
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { Loader } from './components/Loader';
import { analyzeContent } from './services/geminiService';
import { AppStatus, AnalysisResult, FileData } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<FileData | null>(null);

  const handleFileUpload = useCallback(async (fileData: FileData) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    setCurrentFile(fileData);

    try {
      const analysis = await analyzeContent(fileData);
      setResult(analysis);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
    setCurrentFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Optimize Your Social Reach
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your draft posts, screenshots, or strategy documents. 
            Our AI analyzes text and visuals to boost your engagement.
          </p>
        </div>

        {status === AppStatus.IDLE && (
          <div className="max-w-2xl mx-auto">
            <FileUploader onFileSelect={handleFileUpload} />
          </div>
        )}

        {(status === AppStatus.ANALYZING || status === AppStatus.PROCESSING) && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader message={status === AppStatus.PROCESSING ? "Extracting content..." : "Gemini is analyzing your content..."} />
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-red-500 mr-3" size={24} />
                <h3 className="text-lg font-bold text-red-800">Analysis Failed</h3>
              </div>
              <p className="text-red-700 mb-6">{error}</p>
              <button 
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {status === AppStatus.SUCCESS && result && (
          <AnalysisDashboard 
            result={result} 
            file={currentFile} 
            onNewAnalysis={handleReset} 
          />
        )}
      </main>

      <footer className="bg-white border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} SocialSense AI. Built for the Technical Assessment.
        </div>
      </footer>
    </div>
  );
};

export default App;
