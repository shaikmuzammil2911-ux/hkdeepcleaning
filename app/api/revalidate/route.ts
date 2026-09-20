import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { path } = await req.json();

    if (path) {
      revalidatePath(path);
      revalidatePath('/'); // Always revalidate homepage as well
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    // Default revalidate core pages
    revalidatePath('/');
    revalidatePath('/posts');
    revalidatePath('/services');
    revalidatePath('/gallery');
    revalidatePath('/faq');
    revalidatePath('/testimonials');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Revalidation failed' }, { status: 500 });
  }
}
