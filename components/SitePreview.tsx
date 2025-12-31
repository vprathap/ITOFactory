
import React from 'react';
import { SiteManifest, SiteSection } from '../types';

interface SitePreviewProps {
  manifest: SiteManifest;
}

const SectionRenderer: React.FC<{ section: SiteSection; theme: any }> = ({ section, theme }) => {
  const primaryBg = { backgroundColor: theme.primary };
  const accentBg = { backgroundColor: theme.accent };
  const accentText = { color: theme.accent };

  switch (section.type) {
    case 'hero':
      return (
        <section className="py-24 px-6 text-center border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
          <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6" style={{ color: '#fff' }}>
            {section.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {section.subtitle}
          </p>
          {section.ctaText && (
            <button className="px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105" style={accentBg}>
              {section.ctaText}
            </button>
          )}
        </section>
      );

    case 'features':
      return (
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-outfit text-center mb-12">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.items?.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl" style={accentBg}>
                   {item.icon || '✦'}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'about':
      return (
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-outfit mb-6">{section.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {section.content}
              </p>
            </div>
            <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden glass flex items-center justify-center">
              <span className="text-gray-600 font-bold uppercase tracking-widest">Image Placeholder</span>
            </div>
          </div>
        </section>
      );

    case 'pricing':
      return (
        <section className="py-20 px-6">
          <h2 className="text-3xl font-bold font-outfit text-center mb-12">{section.title}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {section.items?.map((item, idx) => (
              <div key={idx} className="w-full md:w-80 p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <div className="text-4xl font-bold mb-6" style={accentText}>{item.price}</div>
                <p className="text-gray-400 text-center mb-8 flex-1">{item.description}</p>
                <button className="w-full py-3 rounded-xl font-bold text-white" style={accentBg}>Get Started</button>
              </div>
            ))}
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className="py-20 px-6 bg-black">
          <h2 className="text-3xl font-bold font-outfit text-center mb-12">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {section.items?.map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass italic text-gray-300">
                "{item.description}"
                <div className="mt-6 not-italic font-bold flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                  <div>
                    <div className="text-white">{item.author}</div>
                    <div className="text-sm text-gray-500">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'contact':
      return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl border border-white/10 bg-white/5 text-center">
            <h2 className="text-3xl font-bold font-outfit mb-4">{section.title}</h2>
            <p className="text-gray-400 mb-10">{section.subtitle}</p>
            <form className="max-w-md mx-auto grid grid-cols-1 gap-4">
              <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/30" />
              <input type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/30" />
              <textarea placeholder="How can we help?" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl h-32 focus:outline-none focus:border-white/30"></textarea>
              <button className="py-4 rounded-xl font-bold text-white" style={accentBg}>Send Message</button>
            </form>
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
          <div className="font-outfit font-bold text-white text-lg mb-4">{section.title || 'Brand'}</div>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </footer>
      );

    default:
      return null;
  }
};

const SitePreview: React.FC<SitePreviewProps> = ({ manifest }) => {
  return (
    <div className="w-full bg-black min-h-screen shadow-2xl overflow-hidden rounded-t-3xl border-t border-x border-white/10">
      <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-black/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="font-outfit text-2xl font-black tracking-tight" style={{ color: manifest.theme.accent }}>
          {manifest.name}
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          {manifest.sections.filter(s => s.type !== 'hero' && s.type !== 'footer').map((s, i) => (
            <a key={i} href="#" className="hover:text-white transition-colors capitalize">{s.type}</a>
          ))}
        </div>
        <button className="px-5 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: manifest.theme.accent }}>
          {manifest.tagline ? 'Launch' : 'Contact'}
        </button>
      </nav>

      <main>
        {manifest.sections.map((section, idx) => (
          <SectionRenderer key={idx} section={section} theme={manifest.theme} />
        ))}
      </main>
    </div>
  );
};

export default SitePreview;
