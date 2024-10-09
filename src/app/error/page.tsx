'use client'

import Link from 'next/link'

export default function ErrorPage() {
  const message = 'Sorry, something went wrong during the process'

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{message}</p>
      <Link href="/">Come back to home</Link>
    </div>
  )
}
