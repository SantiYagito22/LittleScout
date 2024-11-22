'use client'
import { handleTwitchAuth } from "@/lib/data"

export default function AuthenticateButton() {
  
  return (
    <button
        className="text-xl font-bold rounded-lg bg-button text-button_text p-3 hover:opacity-90 hover:bg-secondary_color"
        onClick={handleTwitchAuth}
      >
        Authenticate with Twitch
      </button>
  )
}