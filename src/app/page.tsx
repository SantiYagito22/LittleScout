import AuthenticateButton from './ui/landing-page/authenticate-button'
import Link from 'next/link'
import { checkUserToken } from '@/services/cookies-service'
import { redirect } from 'next/navigation'

export default function Home() {
  const hasToken = checkUserToken()
  if(hasToken){
    redirect('/dashboard')
  }
  return (
    <div className="flex flex-col items-center justify-center gap-y-20">
      <h1 className="text-headline text-7xl font-bold">Little Scout</h1>
      <AuthenticateButton />
      <Link
        href={'dashboard'}
        className="text-xl font-bold rounded-lg bg-button text-button_text p-3 hover:opacity-90 hover:bg-secondary_color"
      >
        Start without authentication
      </Link>
    </div>
  )
}
