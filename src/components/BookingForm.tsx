'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Phone, Calendar, Clock, User, Mail, Sparkles, Loader2 } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { companyInfo } from '../data/companyInfo';

interface BookingFormProps {
  initialService?: string;
  isModal?: boolean;
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialService = '',
  isModal = false,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || servicesData[0].slug,
    date: '',
    time: 'Morning (9:00 AM - 1:00 PM)',
    propertyType: 'Apartment / Flat',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      errs.date = 'Please select a preferred date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Send to server API endpoint storing into Supabase bookings table
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          preferred_date: formData.date,
          preferred_time: formData.time,
          property_type: formData.propertyType,
          message: formData.message,
        }),
      });

      const resData = await response.json();
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0D5C5B', '#C89B3C', '#16A34A', '#F3E7BE'],
        });
      } catch (err) {
        // Safe fallback
      }

      if (onSuccess) {
        setTimeout(onSuccess, 4000);
      }
    } catch (error) {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: servicesData[0].slug,
      date: '',
      time: 'Morning (9:00 AM - 1:00 PM)',
      propertyType: 'Apartment / Flat',
      message: '',
    });
  };

  if (isSubmitted) {
    const selectedServiceObj = servicesData.find((s) => s.slug === formData.service);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : 'Deep Cleaning Service';

    const whatsappDirectBooking = `https://wa.me/${companyInfo.whatsappClean}?text=${encodeURIComponent(
      `Hello Hari Krishna Deep Cleaning Services,\nI have submitted a booking request for ${serviceName}.\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nProperty: ${formData.propertyType}\nMessage: ${formData.message || 'None'}`
    )}`;

    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-teal-100 shadow-xl animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-teal-950 mb-2">
          Booking Request Received!
        </h3>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Thank you <strong className="text-slate-900">{formData.name}</strong>. Our Hyderabad team will contact you shortly at <strong className="text-teal-800">{formData.phone}</strong> to confirm your slot for <strong className="text-slate-900">{serviceName}</strong>.
        </p>

        <div className="bg-teal-50/70 rounded-xl p-4 mb-6 text-left text-xs border border-teal-100 space-y-1.5 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-bold text-teal-900">{serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Preferred Date:</span>
            <span className="font-bold text-slate-800">{formData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Time Slot:</span>
            <span className="font-bold text-slate-800">{formData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Location:</span>
            <span className="font-bold text-slate-800">Hyderabad, Telangana</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappDirectBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>Send Details via WhatsApp</span>
          </a>

          <button
            onClick={resetForm}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              name="name"
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all ${
                errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              name="email"
              placeholder="e.g. name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Select Cleaning Service <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all"
          >
            {servicesData.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all ${
              errors.date ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
            }`}
          />
          {errors.date && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.date}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Time Slot
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all"
          >
            <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
            <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
            <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
            <option value="Flexible / ASAP">Flexible / ASAP</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Property Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Apartment / Flat', 'Independent Villa', 'Office / Commercial', 'Post-Construction'].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFormData({ ...formData, propertyType: type })}
              className={`py-2 px-2.5 text-center text-xs font-semibold rounded-xl border transition-all ${
                formData.propertyType === type
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Message / Specific Requirements <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          rows={isModal ? 2 : 3}
          placeholder="E.g. 3BHK flat in Kavuri Hills, need chimney and 3 bathrooms deep cleaned..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        id="booking-form-submit-btn"
        className="btn-gold w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-75 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Processing Booking...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Request a Cleaning Service</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-slate-500">
        🔒 Your details are safe with us. We will contact you to confirm the final estimate and arrival time.
      </p>
    </form>
  );
};
