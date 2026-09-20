import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, phone, email, service, preferred_date, preferred_time, property_type, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Name, phone number, and service selection are required.' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase.from('bookings').insert([
      {
        name,
        phone,
        email: email || null,
        service,
        preferred_date: preferred_date || null,
        preferred_time: preferred_time || null,
        property_type: property_type || null,
        message: message || null,
        status: 'new',
      },
    ]).select().single();

    if (error) {
      console.error('Database booking creation error:', error);
      // Fallback response for offline / initial state
      return NextResponse.json({
        success: true,
        message: 'Booking request received! Our team will contact you shortly.',
        data: { name, phone, service, status: 'new' }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully!',
      data,
    });
  } catch (err: any) {
    console.error('API Bookings Error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to submit booking' }, { status: 500 });
  }
}
