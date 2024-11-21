'use client'

import { PowerIcon } from '@heroicons/react/24/outline'

export default function LogInOut({ signedIn, logOut }: { signedIn: boolean, logOut: () => void }) {
  function handleClick() {
    if (signedIn) {
      logOut()
    } else {
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-row items-center justify-center grow md:grow-0 gap-x-3 bg-card_background select-none cursor-pointer sm:justify-start rounded-sm p-3 hover:bg-main hover:opacity-60 text-card_heading"
    >
      <PowerIcon className="size-6" />
      <p className="text-sm hidden sm:block md:text-lg">{signedIn ? 'Sign out' : 'Log in'}</p>
    </button>
  )
}
