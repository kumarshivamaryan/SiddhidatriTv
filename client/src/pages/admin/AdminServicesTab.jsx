import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { createServiceApi, updateServiceApi, deleteServiceApi } from '../../services/api';

const defaultForm = {
  title: '',
  slug: '',
  shortDesc: '',
  longDesc: '',
  icon: 'Radio',
  features: '',
  deliverables: '',
  tools: '',
  order: 1,
};

const AdminServicesTab = ({ services, setServices, loading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      ...defaultForm,
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || '',
      slug: service.slug || '',
      shortDesc: service.shortDesc || '',
      longDesc: service.longDesc || '',
      icon: service.icon || 'Radio',
      features: Array.isArray(service.features) ? service.features.join(', ') : '',
      deliverables: Array.isArray(service.deliverables) ? service.deliverables.join(', ') : '',
      tools: Array.isArray(service.tools) ? service.tools.join(', ') : '',
      order: service.order || 1,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val) => {
    if (!editingId) {
      const generatedSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
      setForm({ ...form, title: val, slug: generatedSlug });
    } else {
      setForm({ ...form, title: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      features: form.features ? form.features.split(',').map((s) => s.trim()).filter(Boolean) : [],
      deliverables: form.deliverables ? form.deliverables.split(',').map((s) => s.trim()).filter(Boolean) : [],
      tools: form.tools ? form.tools.split(',').map((s) => s.trim()).filter(Boolean) : [],
      order: Number(form.order) || 1,
    };

    try {
      if (editingId) {
        const updated = await updateServiceApi(editingId, payload);
        setServices(services.map((s) => (s._id === editingId ? updated : s)));
      } else {
        const created = await createServiceApi(payload);
        setServices([...services, created]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the service: "${title}"?`)) return;
    try {
      await deleteServiceApi(id);
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Agency Services Management</h2>
          <p className="text-xs text-[var(--muted)]">Edit descriptions, change deliverables, or remove services from the live site.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ba0f18] hover:bg-[#e22630] font-bold text-xs text-white shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-[var(--muted)]">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--card)] border border-[var(--line)] text-gray-400 text-xs">
          No services found. Run your seed script or add one above.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--line)] flex flex-col justify-between text-left space-y-4 hover:border-[#ba0f18]/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#f5b400] uppercase tracking-wider">
                      Order: {s.order} • /{s.slug}
                    </span>
                    <h3 className="text-base font-bold text-white">{s.title}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[var(--surface-soft)] transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id, s.title)}
                      className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-[var(--surface-soft)] transition-colors cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[var(--muted)] line-clamp-2">{s.shortDesc}</p>
              </div>

              <div className="border-t border-[var(--line)] pt-3 flex flex-wrap gap-1.5 text-[10px] text-gray-400">
                {s.tools && s.tools.slice(0, 4).map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-[var(--surface-soft)] text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[var(--card)] border border-[var(--line)] p-6 space-y-4 text-left my-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
              <h3 className="text-base font-bold text-white">
                {editingId ? `Edit Service: ${form.title}` : 'Add New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Cloud Security Audit"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Slug Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Lucide Icon Name
                  </label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="Radio, Video, Code2, Cloud, Terminal..."
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                  Short Description (Card Summary) *
                </label>
                <textarea
                  rows="2"
                  required
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  placeholder="One punchy sentence displayed on homepage cards..."
                  className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                  Detailed Description (Service Page)
                </label>
                <textarea
                  rows="3"
                  value={form.longDesc}
                  onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
                  placeholder="Detailed breakdown of the service offering..."
                  className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    placeholder="4K vision, low latency..."
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Deliverables (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.deliverables}
                    onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                    placeholder="Full recording, reels..."
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                    Tools (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.tools}
                    onChange={(e) => setForm({ ...form, tools: e.target.value })}
                    placeholder="vMix, OBS, ATEM..."
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[var(--surface-soft)] hover:bg-gray-800 text-xs text-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#ba0f18] hover:bg-[#e22630] font-bold text-xs text-white cursor-pointer shadow-md disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {saving ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesTab;