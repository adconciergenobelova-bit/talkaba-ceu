import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { readEvents, saveEvent, deleteEvent } from '@/lib/events-store';
import { verifySessionToken } from '@/lib/auth.server';


export async function GET() {
  try {
    const events = await readEvents();
    return NextResponse.json(
      { success: true, events, timestamp: Date.now() },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Admin check
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('talkaba_session')?.value;
    const authHeader = request.headers.get('Authorization');
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const token = cookieToken || headerToken;
    const isAuthorized = await verifySessionToken(token);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body.title || !body.month) {
      return NextResponse.json(
        { success: false, error: 'Event title and month are required' },
        { status: 400 }
      );
    }

    const saved = await saveEvent(body);

    // Invalidate caches immediately across all routes
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/admin', 'layout');
    } catch (e) {
      // ignore
    }

    return NextResponse.json(
      { success: true, event: saved, message: 'Event saved and synchronized across all devices.' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Admin check
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('talkaba_session')?.value;
    const authHeader = request.headers.get('Authorization');
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const token = cookieToken || headerToken;
    const isAuthorized = await verifySessionToken(token);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const deleted = await deleteEvent(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/admin', 'layout');
    } catch (e) {
      // ignore
    }

    return NextResponse.json(
      { success: true, message: 'Event deleted and synchronized across all devices.' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
