'use server'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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
        grant_type: 'client_credentials',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL!,
      }),
    })

    const data = await response.json()
    const cookieStore = cookies()
    const twoWeeks = 24 * 60 * 60 * 14 * 1000 //Expiration Date

    cookieStore.set({
      name: 'access_token',
      value: data.access_token,
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + twoWeeks),
    })

    const redirectUrl = new URL('/dashboard', request.url).toString()
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error(
      'OAuth Error:',
      error instanceof Error ? error.message : String(error)
    )
    const redirectUrl = new URL('/error', request.url).toString()
    return NextResponse.redirect(redirectUrl)
  }
}
