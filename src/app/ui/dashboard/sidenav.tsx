import ProfilePhoto from './profilephoto'
import NavLinks from './nav-links'
import LogInOut from './log-in-out'
import { checkUserToken, logOut } from '@/services/cookies-service'

export default function SideNav() {
  const hasToken = checkUserToken()

  return (
    <div className="flex flex-col h-full bg-background p-4 gap-y-2">
      <ProfilePhoto />
      <div className="flex grow flex-row md:flex-col gap-2">
        <NavLinks signedIn={hasToken}/>
        <div className="hidden md:block bg-card_background grow rounded-sm w-full h-auto"></div>
        <LogInOut signedIn={hasToken} logOut={logOut}/>
      </div>
    </div>
  )
}
