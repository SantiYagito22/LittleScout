import Link from 'next/link'
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const redirectRoute = cookieStore.has('access_token')
    ? '/dashboard'
    : '/login'

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-7xl font-bold">Little Scout</h1>
      <Link
        className="text-xl font-semibold rounded-lg bg-button text-button_text p-3 hover:opacity-90 hover:bg-secondary_color"
        href={redirectRoute}
      >
        Start exploring
      </Link>
    </div>
  )
}
