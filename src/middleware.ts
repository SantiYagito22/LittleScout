import { NextRequest, NextResponse } from 'next/server'
import { obtainExpiryDate } from './lib/utils'

export async function middleware(req: NextRequest) {
  const newResponse = NextResponse.next()
  let newCookies = false

  const appTokenExpiry = new Date(req.cookies.get('app_token_expiry')?.value ?? '')
  const currentDate = new Date()

  //App token renovation
  if (!req.cookies.has('app_access_token') || currentDate >= appTokenExpiry) {
    newCookies = true
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
    const expiryDate = obtainExpiryDate(data.expires_in)

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
  }
  const userTokenExpiry: Date = new Date(req.cookies.get('user_token_expiry')?.value ?? '')

  //User token renovation
  if (req.cookies.has('user_token') && req.cookies.has('user_refresh_token') && currentDate >= userTokenExpiry) {
    newCookies = true

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        refresh_token: req.cookies.get('user_refresh_token')?.value!,
        grant_type: 'refresh_token',
      }),
    })

    const data = await response.json()
    const expiryDate = obtainExpiryDate(data.expires_in)

    newResponse.cookies.set({
      name: 'user_token',
      value: data.access_token,
      httpOnly: true,
      sameSite: 'lax',
      expires: expiryDate,
    })

    newResponse.cookies.set({
      name: 'user_refresh_token',
      value: data.refresh_token,
      httpOnly: true,
      sameSite: 'lax',
      expires: expiryDate,
    })

    newResponse.cookies.set({
      name: 'user_token_expiry',
      value: expiryDate.toString(),
      httpOnly: true,
      sameSite: 'lax',
      expires: expiryDate,
    })
  }

  return newCookies ? newResponse : NextResponse.next()
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
