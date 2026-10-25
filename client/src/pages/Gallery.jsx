import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';
import { ExternalLink, Filter, Sparkles } from 'lucide-react';

const categories = [
  { slug: 'all', name: 'All Works' },
  { slug: 'live-broadcast-streaming', name: 'Live Broadcast' },
  { slug: 'video-photo-editing', name: 'Video & Editing' },
  { slug: 'website-development', name: 'Web Dev' },
  { slug: 'cloud-services', name: 'Cloud & DevOps' },
  { slug: 'podcast-production', name: 'Podcast' },
  { slug: 'social-media-management', name: 'Social Media' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const data = await fetchGallery(selectedCategory);
        setItems(data || []);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--content)] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title & Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ba0f18]/15 border border-[#ba0f18]/30 text-[#ba0f18] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#f5b400]" />
          Portfolio & Case Studies
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Crafted with Broadcast Precision & Engineering Rigor
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          Explore our production portfolio covering 4K multi-cam live broadcasts, cinematic post-production, high-performance web systems, and cloud infrastructure.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              selectedCategory === cat.slug
                ? 'bg-[#ba0f18] text-white shadow-[#ba0f18]/20'
                : 'bg-[var(--card)] text-[var(--muted)] border border-[var(--line)] hover:text-white hover:border-[#ba0f18]/50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs text-[var(--muted)] flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-[#ba0f18] border-t-transparent rounded-full animate-spin" />
          Loading showcase case studies...
        </div>
      ) : items.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[var(--card)] border border-[var(--line)] text-gray-400 text-sm max-w-lg mx-auto">
          No projects found in this category yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="group rounded-3xl bg-[var(--card)] border border-[var(--line)] overflow-hidden shadow-xl flex flex-col justify-between text-left hover:border-[#ba0f18]/50 transition-all hover:-translate-y-1 duration-300"
            >
              {/* Image & Category Tag */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#f5b400] uppercase tracking-wider">
                  {item.categoryName || item.category.replace(/-/g, ' ')}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-6 space-y-3 flex flex-col justify-between grow">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f5b400] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer / Work Link */}
                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between mt-auto">
                  <div className="text-[11px] text-gray-400">
                    <span className="font-semibold text-gray-300">{item.client}</span> • {item.year || '2026'}
                  </div>

                  {item.projectUrl ? (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ba0f18] hover:bg-[#e22630] text-white text-xs font-bold transition-all shadow-md hover:shadow-[#ba0f18]/30"
                    >
                      View Work <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">Direct Delivery</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Gallery;