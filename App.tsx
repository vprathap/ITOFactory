
import React, { useState } from 'react';
import { generateSiteManifest } from './geminiService';
import { SiteManifest } from './types';
import SitePreview from './components/SitePreview';

const App: React.FC = () => {
  const [docContent, setDocContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [manifest, setManifest] = useState<SiteManifest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!docContent.trim()) {
      setError("Please paste the document content first.");
      return;
    }
    setError(null);
    setIsGenerating(true);
    try {
      const result = await generateSiteManifest(docContent);
      setManifest(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate site. Please check your document content and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setManifest(null);
    setDocContent('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-outfit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
            Gemini Site Architect
          </h1>
          <p className="text-gray-500 text-sm mt-1">Transform documents into production-ready websites</p>
        </div>
        {manifest && (
          <button 
            onClick={handleReset}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            ← Start a new project
          </button>
        )}
      </header>

      <main className="flex-1 px-6 md:px-10 pb-20">
        {!manifest ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass p-8 rounded-3xl shadow-2xl">
              <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                Paste Document Content
              </label>
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                placeholder="Paste the text from your Google Doc or describe your website vision in detail..."
                className="w-full h-80 bg-black/40 border border-white/10 rounded-2xl p-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-light leading-relaxed"
              />
              
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                  {isGenerating ? 'Architect is reasoning about your request...' : 'Ready for generation'}
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !docContent.trim()}
                  className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${
                    isGenerating || !docContent.trim()
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Building Site...
                    </>
                  ) : 'Architect My Site'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
              <div className="p-6 glass rounded-2xl">
                <h4 className="font-bold mb-2">Gemini 3 Pro Power</h4>
                <p className="text-sm text-gray-400">Deep reasoning ensures your site is structured logically for your specific business goals.</p>
              </div>
              <div className="p-6 glass rounded-2xl">
                <h4 className="font-bold mb-2">Dynamic Theming</h4>
                <p className="text-sm text-gray-400">Automatically extracts brand colors and styles from your document's tone.</p>
              </div>
              <div className="p-6 glass rounded-2xl">
                <h4 className="font-bold mb-2">Instant Preview</h4>
                <p className="text-sm text-gray-400">View your generated site immediately with professional responsive components.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Live Preview</span>
                <h2 className="text-xl font-bold">{manifest.name}</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                >
                  Save as PDF
                </button>
                <button 
                   onClick={() => setManifest(null)}
                   className="px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 rounded-lg text-sm transition-colors"
                >
                  Refine Document
                </button>
              </div>
            </div>
            <SitePreview manifest={manifest} />
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full py-4 bg-black/80 backdrop-blur-md border-t border-white/5 px-10 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest pointer-events-none">
        <div>Architecture v1.0.4</div>
        <div>Model: Gemini-3-Pro-Preview</div>
        <div>Processing via Google GenAI SDK</div>
      </footer>
    </div>
  );
};

export default App;
