'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ServiceItem } from '@/lib/types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  RefreshCw,
  Loader2,
  Sparkles,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  EyeOff,
  X,
  Layers,
  Save,
  AlertTriangle,
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setServices(data as ServiceItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingService({
      name: '',
      slug: '',
      short_description: '',
      description: '',
      hero_image_url: '/images/hero-cleaner.jpg',
      is_active: true,
      sort_order: (services.length + 1) * 1,
      seo_title: '',
      seo_description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'hari-krishna-cleaning/services');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setEditingService((prev) => prev ? {
          ...prev,
          hero_image_url: data.url,
          hero_image_public_id: data.public_id,
        } : null);
        showToast('Image uploaded successfully to Cloudinary!');
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleToggleActive = async (service: ServiceItem) => {
    const supabase = createClient();
    const newStatus = !service.is_active;

    const { error } = await supabase
      .from('services')
      .update({ is_active: newStatus, updated_at: new Date().toISOString() })
      .eq('id', service.id);

    if (!error) {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/services' }),
      });
      showToast(`Service "${service.name}" set to ${newStatus ? 'Active' : 'Inactive'}.`);
      fetchServices();
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.name || !editingService?.slug) {
      alert('Please provide at least a service name and slug.');
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      name: editingService.name,
      slug: editingService.slug,
      short_description: editingService.short_description || '',
      description: editingService.description || '',
      hero_image_url: editingService.hero_image_url || '/images/hero-cleaner.jpg',
      hero_image_public_id: editingService.hero_image_public_id || null,
      is_active: editingService.is_active ?? true,
      sort_order: Number(editingService.sort_order) || 0,
      seo_title: editingService.seo_title || `${editingService.name} in Hyderabad | Hari Krishna Deep Cleaning`,
      seo_description: editingService.seo_description || editingService.short_description || '',
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingService.id) {
      // Update existing
      const res = await supabase
        .from('services')
        .update(payload)
        .eq('id', editingService.id);
      error = res.error;
    } else {
      // Insert new
      const res = await supabase
        .from('services')
        .insert([payload]);
      error = res.error;
    }

    if (error) {
      alert('Error saving service: ' + error.message);
      setSaving(false);
      return;
    }

    // Trigger instant ISR revalidation for live site
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      });
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/services' }),
      });
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: `/services/${editingService.slug}` }),
      });
    } catch {}

    setSaving(false);
    handleCloseModal();
    showToast(`Service "${payload.name}" saved! Live website updated.`);
    fetchServices();
  };

  const handleDeleteService = async (id: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) {
      alert('Failed to delete service: ' + error.message);
      return;
    }

    setDeleteConfirmId(null);
    showToast(`Service "${name}" deleted.`);
    fetchServices();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950 border border-emerald-600 text-emerald-100 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-teal-950 text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-teal-800">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Live Products &amp; Services CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Services Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit text, prices, descriptions, and hero images for all cleaning products shown on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Services List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid/Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
            <span>Fetching live services from database...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
            <Layers className="w-8 h-8 text-slate-600" />
            <span>No services found in database. Click &quot;Add New Service&quot; above to create one.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4 w-12 text-center">#</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Service / Product Name</th>
                  <th className="p-4">Live URL Slug</th>
                  <th className="p-4">Short Description</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-center font-mono font-bold text-gold-400">
                      {svc.sort_order}
                    </td>
                    <td className="p-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 relative">
                        <img
                          src={svc.hero_image_url || '/images/hero-cleaner.jpg'}
                          alt={svc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{svc.name}</div>
                      <div className="text-[10px] text-slate-500">Order: {svc.sort_order}</div>
                    </td>
                    <td className="p-4 font-mono text-teal-400 text-[11px]">
                      <a
                        href={`/services/${svc.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>/{svc.slug}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    </td>
                    <td className="p-4 max-w-xs text-slate-400 text-xs truncate">
                      {svc.short_description || '—'}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(svc)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                          svc.is_active
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                            : 'bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {svc.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(svc)}
                          className="p-2 rounded-lg bg-teal-900/60 hover:bg-teal-800 text-teal-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Edit Service Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(svc.id)}
                          className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT SERVICE MODAL */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display text-white">
                  {editingService.id ? 'Edit Cleaning Service / Product' : 'Add New Service / Product'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Changes made here will instantly reflect on the live website.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Service Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name || ''}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingService((prev) => prev ? {
                        ...prev,
                        name,
                        slug: prev.id ? prev.slug : generateSlug(name),
                      } : null);
                    }}
                    placeholder="e.g. Home Deep Cleaning"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    URL Slug * (Live Page: /services/slug)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.slug || ''}
                    onChange={(e) =>
                      setEditingService((prev) => prev ? { ...prev, slug: generateSlug(e.target.value) } : null)
                    }
                    placeholder="e.g. home-deep-cleaning"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-teal-400 font-mono text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Short Description (Shown on Homepage Card)
                </label>
                <textarea
                  rows={2}
                  value={editingService.short_description || ''}
                  onChange={(e) =>
                    setEditingService((prev) => prev ? { ...prev, short_description: e.target.value } : null)
                  }
                  placeholder="Brief 1-2 sentence overview of this service..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Detailed Description (Shown on Single Service Page)
                </label>
                <textarea
                  rows={4}
                  value={editingService.description || ''}
                  onChange={(e) =>
                    setEditingService((prev) => prev ? { ...prev, description: e.target.value } : null)
                  }
                  placeholder="Comprehensive description of process, equipment, and cleaning guarantees..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Hero Image & Cloudinary Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Service Hero Image (Cloudinary or Direct URL)
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-16 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                    <img
                      src={editingService.hero_image_url || '/images/hero-cleaner.jpg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Upload button or URL input */}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={editingService.hero_image_url || ''}
                      onChange={(e) =>
                        setEditingService((prev) => prev ? { ...prev, hero_image_url: e.target.value } : null)
                      }
                      placeholder="Image URL or Cloudinary Link"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:border-gold-500 focus:outline-none"
                    />

                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
                      {uploadingImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-gold-400" />
                      )}
                      <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload New Image to Cloudinary'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Sort Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Sort Order (Number)
                  </label>
                  <input
                    type="number"
                    value={editingService.sort_order || 1}
                    onChange={(e) =>
                      setEditingService((prev) => prev ? { ...prev, sort_order: parseInt(e.target.value) || 0 } : null)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Visibility Status
                  </label>
                  <select
                    value={editingService.is_active ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingService((prev) => prev ? { ...prev, is_active: e.target.value === 'true' } : null)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  >
                    <option value="true">Active (Visible on Website)</option>
                    <option value="false">Inactive (Hidden from Website)</option>
                  </select>
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Search Engine Optimization (SEO)
                </h3>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Meta Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingService.seo_title || ''}
                    onChange={(e) =>
                      setEditingService((prev) => prev ? { ...prev, seo_title: e.target.value } : null)
                    }
                    placeholder="e.g. Home Deep Cleaning Services in Hyderabad | Hari Krishna"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Meta Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingService.seo_description || ''}
                    onChange={(e) =>
                      setEditingService((prev) => prev ? { ...prev, seo_description: e.target.value } : null)
                    }
                    placeholder="SEO meta summary for Google search snippet"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving &amp; Updating Live Site...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Service &amp; Update Live Site</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">Delete Cleaning Service?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete this service? This action will immediately remove it from your live website.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const s = services.find((x) => x.id === deleteConfirmId);
                  if (s) handleDeleteService(s.id, s.name);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
