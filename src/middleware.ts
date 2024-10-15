import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const tokenExpiry: number = parseInt(
    req.cookies.get('app_token_expiry')?.value ?? '0',
    10
  )
  if (!req.cookies.has('app_access_token') || Date.now() >= tokenExpiry) {
    console.log('We need new token')
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: 'client_credentials',
      }),
    })
    const data = await response.json()
    const expiryDate = new Date(Date.now() + data.expires_in)
    const newResponse = NextResponse.next()
    newResponse.cookies.set('app_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiryDate,
    })
    newResponse.cookies.set('app_token_expiry', expiryDate.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiryDate,
    })

    return newResponse
  }

  console.log('We already have token')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
}
