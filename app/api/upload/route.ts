import { NextRequest, NextResponse } from 'next/server';
import { uploadImageServer, StorageCategory } from '@/lib/storage/upload';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Admin Session
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to the Admin Panel.' },
        { status: 401 }
      );
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as StorageCategory) || (formData.get('folder') as StorageCategory) || 'services';

    if (!file) {
      return NextResponse.json({ error: 'No image file selected.' }, { status: 400 });
    }

    // 3. Validate File Size (Maximum 10 MB)
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Image size must be less than 10 MB.' },
        { status: 400 }
      );
    }

    // 4. Validate MIME Type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
      'image/avif',
    ];

    if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Please upload a valid JPG, PNG, or WEBP image.' },
        { status: 400 }
      );
    }

    // 5. Convert to Buffer & Upload Server-Side
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadImageServer(buffer, file.name, category);

    return NextResponse.json({
      success: true,
      url: result.url,
      secure_url: result.url,
      public_id: result.storage_id,
      storage_id: result.storage_id,
    });
  } catch (error: any) {
    console.error('Server upload API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Image upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
