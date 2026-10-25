import React, { useState } from 'react';
import { submitEnquiry, defaultServicesData } from '../services/api';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

const Contact = ({ services = [] }) => {
  const activeServices = services.length > 0 ? services : defaultServicesData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: activeServices[0]?.title || 'Live Broadcast / Live Streaming',
    budget: 'Standard Commercial (₹50,000 - ₹2,00,000)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitEnquiry(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: activeServices[0]?.title || 'Live Broadcast / Live Streaming',
        budget: 'Standard Commercial (₹50,000 - ₹2,00,000)',
        message: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `*New Project Consultation - Siddhidatri TV*\n` +
      `*Name:* ${formData.name || 'Visitor'}\n` +
      `*Service:* ${formData.service}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Details:* Looking to discuss studio or engineering solutions.`
    );
    window.open(`https://wa.me/917999237528?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[var(--surface)] text-[var(--content)] py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Direct Consultation
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Let’s Build Your Project
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          Connect with our technical director and production leads for live broadcasts, post-production pipelines, or custom software architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Direct Agency Channels */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-white">Direct Communication</h3>
            
            <div className="space-y-4">
              <a
                href="tel:+917999237528"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--surface-soft)] hover:bg-[#ba0f18]/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ba0f18]/20 text-[#ba0f18] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[var(--muted)]">Direct Phone / Hotline</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#f5b400] transition-colors">+91 79992 37528</p>
                </div>
              </a>

              <a
                href="mailto:info@siddhidatritv.com"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--surface-soft)] hover:bg-[#ba0f18]/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ba0f18]/20 text-[#ba0f18] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[var(--muted)]">Official Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#f5b400] transition-colors">info@siddhidatritv.com</p>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[var(--surface-soft)]">
                <div className="w-10 h-10 rounded-lg bg-[#ba0f18]/20 text-[#ba0f18] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[var(--muted)]">Operations Base</p>
                  <p className="text-sm font-semibold text-white">Broadcast Studio & Cloud Engineering Center</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">Rajasthan, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[var(--surface-soft)]">
                <div className="w-10 h-10 rounded-lg bg-[#f5b400]/20 text-[#f5b400] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[var(--muted)]">Operating Hours</p>
                  <p className="text-sm font-semibold text-white">Monday – Saturday: 09:00 AM – 08:00 PM</p>
                  <p className="text-xs text-emerald-400 mt-0.5">24/7 SLA emergency standby for live streams</p>
                </div>
              </div>
            </div>

            <button
              onClick={openWhatsApp}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4" /> Message on WhatsApp (+91 79992 37528)
            </button>
          </div>

        </div>

        {/* Right Column: Inquiry Submission Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--card)] border border-[var(--line)] shadow-xl text-left space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Project Scope & Proposal Request</h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                Fill out the specifications below and our technical leads will follow up within 24 hours.
              </p>
            </div>

            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white">Proposal Request Received!</h4>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Thank you for submitting your requirements. Our project director will review the scope and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-[var(--surface-soft)] text-xs text-white border border-[var(--line)] hover:border-[#f5b400] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 79992 37528"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                      Service Domain *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                    >
                      {activeServices.map((s) => (
                        <option key={s.slug} value={s.title} className="bg-[#12121a]">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                    Estimated Budget Scope
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-sm focus:outline-none focus:border-[#ba0f18] transition-colors"
                  >
                    <option value="Starter Pilot (Under ₹50k)">Starter Pilot (Under ₹50,000)</option>
                    <option value="Standard Commercial (₹50,000 - ₹2,00,000)">Standard Commercial (₹50,000 - ₹2,00,000)</option>
                    <option value="Enterprise Production (₹2,00,000 - ₹10,00,000+)">Enterprise Production (₹2,00,000 - ₹10,00,000+)</option>
                    <option value="Custom Consultation">Custom Retainer / Needs Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                    Project Requirements *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about the broadcast dates, camera requirements, software features, or production goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ba0f18] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-[#ba0f18] hover:bg-[#e22630] py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
                >
                  {loading ? 'Submitting Proposal Request...' : 'Send Project Proposal Request'}
                  <Send className="w-4 h-4 text-[#f5b400]" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;