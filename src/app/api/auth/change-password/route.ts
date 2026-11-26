import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getStoredPassword, setStoredPassword, verifySessionToken } from '@/lib/auth.server';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('talkaba_session')?.value;
    const authHeader = request.headers.get('Authorization');
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const token = cookieToken || headerToken;
    const isAuthorized = await verifySessionToken(token);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Please log in to change password' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const stored = await getStoredPassword();
    if (currentPassword !== stored) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 403 }
      );
    }

    const success = await setStoredPassword(newPassword);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to update password' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully! Keep it private.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error updating password' },
      { status: 500 }
    );
  }
}
