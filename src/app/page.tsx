'use client'
import Link from 'next/link'

export default function Home() {
  function handleTwitchAuth() {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL

    const twitchUrlAuthentication = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=user:read:email`

    window.location.href = twitchUrlAuthentication
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-headline text-7xl font-bold">Little Scout</h1>
      {/* <button
        className="text-xl font-bold rounded-lg bg-button text-button_text p-3 hover:opacity-90 hover:bg-secondary_color"
        onClick={handleTwitchAuth}
      >
        Authenticate with Twitch
      </button> */}
      <Link
        href={'dashboard'}
        className="text-xl font-bold rounded-lg bg-button text-button_text p-3 hover:opacity-90 hover:bg-secondary_color"
      >
        Start without authentication
      </Link>
    </div>
  )
}
