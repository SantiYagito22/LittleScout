'use client'

export default function AuthenticateButton() {
  function handleTwitchAuth() {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL

    const twitchUrlAuthentication = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=user:read:email`

    window.location.href = twitchUrlAuthentication
  }

  return (
    <button
        className="text-xl font-bold rounded-lg bg-button text-button_text p-3 hover:opacity-90 hover:bg-secondary_color"
        onClick={handleTwitchAuth}
      >
        Authenticate with Twitch
      </button>
  )
}