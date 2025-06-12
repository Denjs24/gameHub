'use client'
import { LinkType } from "@/app/lib/definition"
import { DocumentMagnifyingGlassIcon, FireIcon, ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links: LinkType[] = [
    {label: 'Home', href: '/'},
    {label: 'All Games', href: '/games'},
    {label: 'Reviews', href: '/reviews'},
    {label: 'New Releases', childrens: [
        {label: 'Last 30 days', href: '/discover/new-releases/last-30-days', icon: <StarIcon />},
        {label: 'This week', href: '/discover/new-releases/this-week', icon: <FireIcon />},
        {label: 'Next week', href: '/discover/new-releases/next-week', icon: <ArrowRightIcon />},
    ]},
]

export function Sidebar () {
    const pathname = usePathname();
    
    return (
        <div className="flex flex-col gap-y-4">
            {links.map((link) => (
               <div key={link.label} className="flex flex-col gap-y-2">
                    {link.href ? <Link href={link.href} className={clsx(
                            'text-lg font-semibold transition-colors hover:text-white transition-colors',
                            {
                                'text-white *:text-white': pathname === link.href,
                                'text-white/50 hover:text-white hover:*:text-white': pathname !== link.href,
                            }
                            )}>{link.label}</Link> : <span className="text-lg font-semibold text-white/50">{link.label}</span>}
                    {link.childrens && link.childrens.map(children => 
                        children.href 
                        && 
                        <Link href={children.href} key={children.label} className={clsx(
                            'flex items-center gap-x-2 mb-3 text-sm last:mb-0 font-semibold transition-colors ',
                            {
                                'text-white *:text-white': pathname === children.href,
                                'text-white/50 hover:text-white hover:*:text-white': pathname !== children.href,
                            }
                            )}>
                            {children.icon && <div className="basis-6 h-6 flex items-center justify-center text-white/50 bg-white/20 rounded-md p-0.5">{children.icon}</div>}
                            {children.label}
                        </Link>
                    )}
               </div>
            ))}
        </div>
    )
}

