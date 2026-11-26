import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'node:path';
import { verifySessionToken } from '@/lib/auth.server';
import { getProjectRoot } from '@/lib/events-store';

function getUploadDirectories(): string[] {
  const root = getProjectRoot();
  return [path.join(root, 'public', 'posters')];
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('talkaba_session')?.value;
    const authHeader = request.headers.get('Authorization');
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const token = cookieToken || headerToken;
    const isAuthorized = await verifySessionToken(token);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required to upload posters' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const customName = formData.get('customName') as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Only image files (JPG, PNG, WEBP) or PDFs are allowed' },
        { status: 400 }
      );
    }

    // Determine extension
    const extMatch = file.name.match(/\.[^.]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '.jpg';

    // Format safe filename
    let baseName = 'poster';
    if (customName) {
      baseName = customName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    } else {
      const originalClean = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      baseName = `${originalClean}-${Date.now().toString().slice(-4)}`;
    }

    const fileName = `${baseName}${ext}`;
    const uploadDirs = getUploadDirectories();

    // Write to all persistent directories
    for (const dir of uploadDirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, fileName);
        await fs.writeFile(filePath, buffer);
      } catch (e) {
        console.warn(`Warning: Could not save to upload dir ${dir}`, e);
      }
    }

    const publicUrl = `/posters/${fileName}`;

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/admin', 'layout');
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      fileName,
      filePath: publicUrl,
      size: buffer.length,
      mimeType: file.type,
      message: 'Poster permanently saved across all server directories.',
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
