import Image from 'next/image'

export default async function ProfilePhoto() {
  return (
    <div className="flex flex-col items-center justify-center py-2 gap-y-2 rounded-sm bg-card_background">
      <Image
        className="rounded-full size-28 border-2 border-stroke"
        alt="Profile Photo"
        src="/default-avatar.png"
        width={300}
        height={300}
      />

    </div>
  )
}
