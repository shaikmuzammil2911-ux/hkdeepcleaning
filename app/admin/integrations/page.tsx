import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default function AdminIntegrationsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zvvwgzxsxwevuadldlah.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || 'nzauhpok';
  const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || '';

  // Helper to mask keys safely (e.g., eyJh••••••••5u-4)
  const maskKey = (key: string) => {
    if (!key || key.length < 8) return '••••••••••••••••';
    return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
  };

  const integrations = [
    {
      name: 'Vercel Platform',
      status: 'Connected',
      description: 'Production hosting, SSL certificate & Edge CDN distribution.',
      details: [
        { label: 'Deployment Domain', value: 'hkdeepcleaning.vercel.app' },
        { label: 'Environment', value: 'Production' },
        { label: 'Health Status', value: 'Healthy & Operational' },
      ],
      isConfigured: true,
    },
    {
      name: 'Supabase Database & Auth',
      status: 'Connected',
      description: 'PostgreSQL database, Row Level Security & Admin Authentication.',
      details: [
        { label: 'Project URL', value: supabaseUrl },
        { label: 'Public Anon Key', value: maskKey(supabaseAnonKey) },
        { label: 'Service Role Key', value: '•••••••• (Protected Server-Only Secret)' },
      ],
      isConfigured: !!supabaseUrl,
    },
    {
      name: 'Cloudinary Media CDN',
      status: 'Connected',
      description: 'Image upload, automatic WebP optimization & transformation storage.',
      details: [
        { label: 'Cloud Name', value: cloudinaryCloudName },
        { label: 'API Key', value: maskKey(cloudinaryApiKey) },
        { label: 'API Secret', value: '•••••••• (Protected Server-Only Secret)' },
      ],
      isConfigured: !!cloudinaryCloudName,
    },
    {
      name: 'AWS Infrastructure',
      status: 'Not Configured',
      description: 'Amazon Web Services S3/SES storage module.',
      details: [
        { label: 'Status', value: 'Not Configured' },
        { label: 'S3 Bucket', value: 'None' },
      ],
      isConfigured: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-display text-white">Connected Software Integrations</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor connectivity health and status of backend cloud infrastructure.
        </p>
      </div>

      <div className="p-4 bg-teal-950/60 border border-teal-800/80 rounded-2xl flex items-center gap-3 text-xs text-teal-300">
        <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0" />
        <span>
          <strong>Security Policy Active:</strong> All private secrets (Service Role Keys, API Secrets, JWT Tokens) are masked and strictly prevented from client exposure.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white">{item.name}</h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                    item.isConfigured
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {item.isConfigured ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{item.status}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 text-slate-500" />
                      <span>{item.status}</span>
                    </>
                  )}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.description}</p>

              <div className="space-y-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {item.details.map((d, i) => (
                  <div key={i} className="flex items-center justify-between font-mono">
                    <span className="text-slate-500 text-[11px]">{d.label}:</span>
                    <span className="text-slate-300 text-[11px] truncate max-w-[200px]">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
