import React, { useState, useEffect } from 'react';
import { 
  fetchAdminQueries, 
  updateQueryStatus, 
  deleteQueryApi,
  fetchGallery,
  createGalleryItemApi,
  deleteGalleryItemApi,
  fetchServices,
  adminLogout,
  fetchAdminMe
} from '../../services/api';
import AdminServicesTab from './AdminServicesTab';
import AdminLogin from './AdminLogin';
import { 
  Mail, 
  Phone, 
  Trash2, 
  Filter, 
  Download, 
  MessageSquare, 
  RefreshCw,
  LogOut,
  Image as ImageIcon,
  Plus,
  Inbox,
  Layers,
  ExternalLink,
  Link as LinkIcon,
  UploadCloud
} from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('queries'); // 'queries' | 'gallery' | 'services'

  // Queries State
  const [queries, setQueries] = useState([]);
  const [loadingQueries, setLoadingQueries] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Gallery State
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'live-broadcast-streaming',
    categoryName: 'Live Broadcast',
    client: '',
    year: new Date().getFullYear().toString(),
    projectUrl: '',
    description: '',
  });

  // Services State
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  const checkAuth = async () => {
    try {
      await fetchAdminMe();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loadQueries = async () => {
    setLoadingQueries(true);
    try {
      const data = await fetchAdminQueries(statusFilter === 'all' ? null : statusFilter);
      setQueries(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQueries(false);
    }
  };

  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const data = await fetchGallery('all');
      setGalleryItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const loadServices = async () => {
    setLoadingServices(true);
    try {
      const data = await fetchServices();
      setServices(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'queries') loadQueries();
      if (activeTab === 'gallery') loadGallery();
      if (activeTab === 'services') loadServices();
    }
  }, [isAuthenticated, activeTab, statusFilter]);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      setIsAuthenticated(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateQueryStatus(id, newStatus);
      setQueries(queries.map(q => q._id === id ? { ...q, status: newStatus } : q));
    } catch {
      alert('Failed to update query status.');
    }
  };

  const handleDeleteQuery = async (id) => {
    if (!window.confirm('Delete this client inquiry permanently?')) return;
    try {
      await deleteQueryApi(id);
      setQueries(queries.filter(q => q._id !== id));
    } catch {
      alert('Failed to delete inquiry.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      return alert('Please select an image file from your device.');
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', newItem.title);
      formData.append('category', newItem.category);
      formData.append('categoryName', newItem.categoryName);
      formData.append('client', newItem.client);
      formData.append('year', newItem.year || '2026');
      formData.append('projectUrl', newItem.projectUrl);
      formData.append('description', newItem.description);
      formData.append('image', selectedFile);

      const created = await createGalleryItemApi(formData);
      setGalleryItems([created, ...galleryItems]);
      setShowAddModal(false);
      setSelectedFile(null);
      setFilePreview('');
      setNewItem({
        title: '',
        category: 'live-broadcast-streaming',
        categoryName: 'Live Broadcast',
        client: '',
        year: '2026',
        projectUrl: '',
        description: '',
      });
    } catch (err) {
      alert('Failed to upload project: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Remove this project from the live portfolio?')) return;
    try {
      await deleteGalleryItemApi(id);
      setGalleryItems(galleryItems.filter(g => g._id !== id));
    } catch {
      alert('Failed to delete gallery item.');
    }
  };

  const exportCSV = () => {
    if (!queries.length) return alert('No inquiries available to export.');
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Message'];
    const escapeCSVCell = (value) => {
      const text = String(value ?? '');
      const safeText = /^[\s\ufeff]*[=+\-@]/.test(text)
        ? `'${text}`
        : text;
      return `"${safeText.replace(/"/g, '""')}"`;
    };
    const rows = queries.map(q => [
      new Date(q.createdAt).toLocaleDateString(),
      q.name,
      q.email,
      q.phone,
      q.service,
      q.budget,
      q.status || 'new',
      q.message,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [
      headers.join(','),
      ...rows.map(row => row.map(escapeCSVCell).join(',')),
    ].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `siddhidatri_tv_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#ba0f18] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--content)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-xs font-bold text-[#f5b400] uppercase tracking-wider">
            Management Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Siddhidatri TV Studio Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-[var(--card)] p-1 rounded-xl border border-[var(--line)]">
            <button
              onClick={() => setActiveTab('queries')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'queries' ? 'bg-[#ba0f18] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" /> Inquiries ({queries.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'gallery' ? 'bg-[#ba0f18] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Portfolio Items
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'services' ? 'bg-[#ba0f18] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Services ({services.length})
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-[var(--card)] border border-[var(--line)] hover:text-red-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= TAB 1: INQUIRIES ================= */}
      {activeTab === 'queries' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-[var(--muted)] shrink-0" />
              {['all', 'new', 'contacted', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#ba0f18] text-white'
                      : 'bg-[var(--card)] text-[var(--muted)] border border-[var(--line)]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadQueries}
                className="p-2 rounded-xl bg-[var(--card)] border border-[var(--line)] text-gray-300 hover:text-white cursor-pointer"
                title="Refresh List"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingQueries ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--card)] border border-[var(--line)] hover:border-[#f5b400]/40 text-xs font-semibold text-white cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#f5b400]" /> Export CSV
              </button>
            </div>
          </div>

          {loadingQueries ? (
            <div className="py-20 text-center text-xs text-[var(--muted)]">Loading inquiries...</div>
          ) : queries.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[var(--card)] border border-[var(--line)] text-gray-400 text-xs">
              No inquiries found for this filter.
            </div>
          ) : (
            <div className="space-y-4">
              {queries.map((q) => (
                <div key={q._id} className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--line)] space-y-3 text-left">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{q.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          q.status === 'closed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : q.status === 'contacted'
                            ? 'bg-[#f5b400]/10 text-[#f5b400] border border-[#f5b400]/30'
                            : 'bg-[#ba0f18]/15 text-[#ff6b6b] border border-[#ba0f18]/30'
                        }`}>
                          {q.status || 'new'}
                        </span>
                      </div>
                      <p className="text-xs text-[#f5b400] font-medium">{q.service}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={q.status || 'new'}
                        onChange={(e) => handleStatusChange(q._id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-[var(--surface-soft)] border border-[var(--line)] text-xs text-white"
                      >
                        <option value="new">Mark as New</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="closed">Mark Closed</option>
                      </select>
                      <button onClick={() => handleDeleteQuery(q._id)} className="p-2 text-gray-500 hover:text-red-400 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 bg-[var(--surface-soft)] p-3 rounded-xl border border-[var(--line)] leading-relaxed">
                    "{q.message}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)] pt-1">
                    <div className="flex flex-wrap items-center gap-4">
                      <span><Mail className="w-3.5 h-3.5 text-[#ba0f18] inline mr-1" /><a href={`mailto:${q.email}`} className="text-white hover:underline">{q.email}</a></span>
                      <span><Phone className="w-3.5 h-3.5 text-emerald-400 inline mr-1" /><a href={`tel:${q.phone}`} className="text-white hover:underline">{q.phone}</a></span>
                      <span>Budget: <strong className="text-gray-200">{q.budget}</strong></span>
                    </div>

                    <a
                      href={`https://wa.me/${(q.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${q.name}, thank you for reaching out to Siddhidatri TV regarding ${q.service}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 font-semibold inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Reply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: PORTFOLIO & GALLERY MANAGEMENT ================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-[var(--muted)]">Manage public portfolio projects displayed on `/gallery`.</p>
            <button
              onClick={() => {
                setSelectedFile(null);
                setFilePreview('');
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ba0f18] hover:bg-[#e22630] text-xs font-bold text-white shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>

          {loadingGallery ? (
            <div className="py-20 text-center text-xs text-[var(--muted)]">Loading portfolio items...</div>
          ) : galleryItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[var(--card)] border border-[var(--line)] text-gray-400 text-xs">
              No gallery items in database. Click "Add Project" to add one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryItems.map((item) => (
                <div key={item._id} className="rounded-2xl bg-[var(--card)] border border-[var(--line)] overflow-hidden shadow-xs flex flex-col justify-between text-left">
                  <div className="relative aspect-video">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-[#f5b400] uppercase">{item.categoryName || item.category}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-[var(--muted)] line-clamp-2">{item.description}</p>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-[var(--line)] text-[11px] text-gray-400">
                      <span>{item.client} ({item.year})</span>
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#f5b400] hover:underline inline-flex items-center gap-1"
                        >
                          Work Link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: SERVICES MANAGEMENT ================= */}
      {activeTab === 'services' && (
        <AdminServicesTab
          services={services}
          setServices={setServices}
          loading={loadingServices}
        />
      )}

      {/* Add Project Modal with File Chooser */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-[var(--card)] border border-[var(--line)] p-6 space-y-4 text-left my-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add New Portfolio Case Study</h3>
            <form onSubmit={handleCreateGallery} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4K Live Broadcast for Annual Gala"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => {
                      const names = {
                        'live-broadcast-streaming': 'Live Broadcast',
                        'video-photo-editing': 'Video Editing',
                        'website-development': 'Web Development',
                        'cloud-services': 'Cloud & DevOps',
                        'podcast-production': 'Podcast Production',
                        'social-media-management': 'Social Media',
                      };
                      setNewItem({ ...newItem, category: e.target.value, categoryName: names[e.target.value] || 'Broadcast' });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  >
                    <option value="live-broadcast-streaming">Live Broadcast</option>
                    <option value="video-photo-editing">Video Editing</option>
                    <option value="website-development">Web Dev</option>
                    <option value="cloud-services">Cloud & DevOps</option>
                    <option value="podcast-production">Podcast Production</option>
                    <option value="social-media-management">Social Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Media"
                    value={newItem.client}
                    onChange={(e) => setNewItem({ ...newItem, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>
              </div>

              {/* Local File Selector for Image */}
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                  Project Image * (Choose from Device)
                </label>
                <div className="relative border-2 border-dashed border-[var(--line)] hover:border-[#ba0f18] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[var(--surface-soft)]">
                  <input
                    type="file"
                    accept="image/*"
                    required={!selectedFile}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {filePreview ? (
                    <div className="relative aspect-video max-h-40 mx-auto rounded-xl overflow-hidden border border-[var(--line)]">
                      <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black/75 px-2 py-0.5 rounded text-[10px] text-white">
                        Click to change image
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 space-y-1 text-center">
                      <div className="w-10 h-10 rounded-xl bg-[#ba0f18]/15 text-[#ba0f18] flex items-center justify-center mx-auto mb-2">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-white">Click or drag image file here</p>
                      <p className="text-[10px] text-[var(--muted)]">PNG, JPG, JPEG, WEBP (up to 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Work / Project Link Input */}
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">
                  Work / Project Link (YouTube, Live Site, GitHub, etc.)
                </label>
                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or https://example.com"
                    value={newItem.projectUrl}
                    onChange={(e) => setNewItem({ ...newItem, projectUrl: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted)] uppercase mb-1">Description *</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Technical deliverables, cameras used, or architecture..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-white text-xs focus:outline-none focus:border-[#ba0f18]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[var(--surface-soft)] text-xs text-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl bg-[#ba0f18] hover:bg-[#e22630] font-bold text-xs text-white cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading to Cloudinary...
                    </>
                  ) : (
                    'Publish to Gallery'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;