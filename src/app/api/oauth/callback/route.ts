'use server'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { obtainExpiryDate } from '@/lib/utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  try {
    if (error) {
      throw new Error(searchParams.get('error_description') || 'Unknown error')
    }

    if (!code) {
      throw new Error('Authorization code is missing')
    }

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL!,
        scope: 'user:read:email'
      }),
    })

    const data = await response.json()
    const redirectUrl = new URL('/dashboard', request.url).toString()
    const newResponse = NextResponse.redirect(redirectUrl)
    const expiryDate = obtainExpiryDate(data.expires_in)

    newResponse.cookies.set({
      name: 'user_token',
      value: data.access_token,
      httpOnly: true,
      sameSite: 'lax',
      expires: expiryDate
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

    
    return newResponse
  } catch (error) {
    console.error(
      'OAuth Error:',
      error instanceof Error ? error.message : String(error)
    )
    const redirectUrl = new URL('/error', request.url).toString()
    return NextResponse.redirect(redirectUrl)
  }
}
