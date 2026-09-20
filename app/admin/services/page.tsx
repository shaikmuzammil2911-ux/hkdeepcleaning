'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ServiceItem } from '@/lib/types';
import { Plus, Edit, Trash2, CheckCircle, RefreshCw, Loader2, Sparkles } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      setServices(data as ServiceItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
      showToast(`Service set to ${newStatus ? 'Active' : 'Inactive'}.`);
      fetchServices();
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900 border border-emerald-700 text-emerald-100 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Services CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage 8+ cleaning services offered on the public website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
            <span>Loading services...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Sort</th>
                  <th className="p-4">Service Name</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Short Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-gold-400">{svc.sort_order}</td>
                    <td className="p-4 font-bold text-white">{svc.name}</td>
                    <td className="p-4 font-mono text-slate-400 text-[10px]">/{svc.slug}</td>
                    <td className="p-4 max-w-xs text-slate-400 truncate">{svc.short_description}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(svc)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          svc.is_active
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {svc.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleActive(svc)}
                        className="p-2 rounded-lg bg-teal-900/60 hover:bg-teal-800 text-teal-200 text-xs font-semibold"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
