'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookingItem } from '@/lib/types';
import { Phone, MessageSquare, Mail, Calendar, CheckCircle, RefreshCw, Loader2, Eye, X } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchBookings = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data as BookingItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = async (id: string, newStatus: BookingItem['status']) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      showToast(`Booking status updated to ${newStatus}.`);
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
      fetchBookings();
    } else {
      showToast('Failed to update status.');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900 border border-emerald-700 text-emerald-100 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Customer Booking Requests</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming cleaning service reservations and update status pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="new">New Requests</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={fetchBookings}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
            <span>Loading booking requests...</span>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No bookings found matching filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Pref Date / Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-white">{b.name}</td>
                    <td className="p-4 font-mono text-slate-300">{b.phone}</td>
                    <td className="p-4">
                      <span className="bg-teal-950 text-teal-300 px-2.5 py-1 rounded-full text-[10px] font-semibold border border-teal-800">
                        {b.service}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {b.preferred_date || 'Flexible'} {b.preferred_time ? `(${b.preferred_time})` : ''}
                    </td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value as any)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border cursor-pointer ${
                          b.status === 'new'
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : b.status === 'confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : b.status === 'completed'
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-400 text-[10px]">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${b.phone}`}
                          className="p-2 rounded-lg bg-teal-900/60 hover:bg-teal-800 text-teal-200"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="View Full Booking Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-slate-500 font-semibold">Customer Name</div>
                  <div className="text-white font-bold">{selectedBooking.name}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Phone Number</div>
                  <div className="text-gold-400 font-bold font-mono">{selectedBooking.phone}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-slate-500 font-semibold">Email</div>
                  <div className="text-slate-300">{selectedBooking.email || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Service Required</div>
                  <div className="text-teal-400 font-bold">{selectedBooking.service}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-slate-500 font-semibold">Preferred Slot</div>
                  <div className="text-slate-300">{selectedBooking.preferred_date || 'Flexible'} {selectedBooking.preferred_time}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Property Type</div>
                  <div className="text-slate-300">{selectedBooking.property_type || 'Residential'}</div>
                </div>
              </div>

              {selectedBooking.message && (
                <div>
                  <div className="text-slate-500 font-semibold mb-1">Customer Note / Message</div>
                  <div className="p-3 bg-slate-950 rounded-xl text-slate-300 border border-slate-800">
                    {selectedBooking.message}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedBooking.phone}`}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
