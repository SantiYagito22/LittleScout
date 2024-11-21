import Image from 'next/image'
import { obtainProfilePhoto} from '@/lib/data'
import { obtainTokens } from '@/services/cookies-service'

export default async function ProfilePhoto() {
  const tokens = obtainTokens()
  const profilePhoto = await obtainProfilePhoto(tokens.userToken)
  return (
    <div className="flex flex-col items-center justify-center py-2 gap-y-2 rounded-sm bg-card_background">
      <Image
        className="rounded-full size-28 border-2 border-stroke"
        priority
        alt="Profile Photo"
        src={profilePhoto}
        width={300}
        height={300}
      />
    </div>
  )
}
