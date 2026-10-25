import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { submitEnquiry } from '../services/api';

const EnquiryModal = ({ isOpen, onClose, preselectedService = '', services = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || (services[0]?.title || 'Live Broadcast / Live Streaming'),
    budget: 'Standard Commercial (₹50,000 - ₹2,00,000)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitEnquiry(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `*New Project Enquiry - Siddhidatri TV*\n` +
      `*Name:* ${formData.name || 'Visitor'}\n` +
      `*Service:* ${formData.service}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Details:* ${formData.message || 'Looking for details.'}`
    );
    window.open(`https://wa.me/917999237528?text=${text}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[var(--card)] border border-[var(--line)] shadow-2xl p-5 sm:p-7 overscroll-contain animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button - Stays easily clickable */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-[var(--muted)] hover:text-white hover:bg-[var(--surface-soft)] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 sm:mb-5 pr-8 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-[10px] sm:text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> Project Consultation
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Request a Custom Quote
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Tell us about your production or engineering needs. Our team replies within 24 hours.
          </p>
        </div>

        {success ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Enquiry Received!</h4>
            <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
              Thank you for reaching out to Siddhidatri TV. We will review your requirements and reach out promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {error && (
              <div className="p-2.5 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs sm:text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 79992 37528"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs sm:text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs sm:text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                  Service Required *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs sm:text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                >
                  {services.length > 0 ? (
                    services.map((s) => (
                      <option key={s.slug} value={s.title} className="bg-[#12121a]">
                        {s.title}
                      </option>
                    ))
                  ) : (
                    <option value="Live Broadcast / Live Streaming">Live Broadcast / Live Streaming</option>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                Estimated Budget Scope
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs sm:text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
              >
                <option value="Starter Pilot (Under ₹50k)">Starter Pilot (Under ₹50,000)</option>
                <option value="Standard Commercial (₹50,000 - ₹2,00,000)">Standard Commercial (₹50,000 - ₹2,00,000)</option>
                <option value="Enterprise Production (₹2,00,000 - ₹10,00,000+)">Enterprise Production (₹2,00,000 - ₹10,00,000+)</option>
                <option value="Custom Consultation">Custom Retainer / Needs Discussion</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                Project Details *
              </label>
              <textarea
                rows="2"
                required
                placeholder="Give us a brief overview of your event, dates, or technical goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#ba0f18] transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 text-white bg-[#ba0f18] hover:bg-[#e22630] py-3 px-5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
              >
                {loading ? 'Submitting...' : 'Send Enquiry'}
                <Send className="w-3.5 h-3.5 text-[#f5b400]" />
              </button>

              <button
                type="button"
                onClick={openWhatsAppDirect}
                className="px-4 py-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Quick WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;