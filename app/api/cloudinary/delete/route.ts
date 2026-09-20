import { NextRequest, NextResponse } from 'next/server';
import { deleteFromCloudinary } from '@/lib/cloudinary/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
    }

    const deleted = await deleteFromCloudinary(public_id);

    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    console.error('API Cloudinary delete error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete asset from Cloudinary' },
      { status: 500 }
    );
  }
}
