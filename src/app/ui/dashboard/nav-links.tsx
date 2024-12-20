'use client'

import { HomeIcon, ChartBarIcon, UserGroupIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export default function NavLinks({ signedIn}: { signedIn: boolean}) {
  const pathname = usePathname()
  const links = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Rankings',
      href: '/dashboard/rankings',
      icon: ChartBarIcon,
    },
    {
      name: 'Streamers',
      href: '/dashboard/streamers',
      icon: UserGroupIcon,
    },
    {
      name: 'Edit Profile',
      href: '/dashboard/profile',
      icon: PencilIcon,
    },
  ]

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        const isDisabled = !signedIn && link.name === 'Edit Profile'
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : undefined}
            className={clsx(
              'flex flex-row grow md:grow-0 gap-x-3 items-center justify-center sm:justify-start rounded-sm p-3 hover:bg-main hover:opacity-60 text-card_heading',
              {
                'bg-main': pathname === link.href,
                'bg-card_background': pathname !== link.href,
                'pointer-events-none opacity-50': isDisabled
              }
            )}
          >
            <LinkIcon className="size-6" />
            <p className="text-sm hidden sm:block md:text-lg">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
