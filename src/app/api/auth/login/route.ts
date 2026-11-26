import { NextResponse } from 'next/server';
import { getStoredPassword, generateSessionToken } from '@/lib/auth.server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    const currentPassword = await getStoredPassword();

    if (password !== currentPassword) {
      // Intentionally generic error for security
      return NextResponse.json(
        { success: false, error: 'Access Denied: Invalid credentials.' },
        { status: 401 }
      );
    }

    const token = generateSessionToken(currentPassword);

    const response = NextResponse.json({
      success: true,
      message: 'Access granted.',
      token,
    });

    // Set secure cookie
    response.cookies.set({
      name: 'talkaba_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication service error' },
      { status: 500 }
    );
  }
}
