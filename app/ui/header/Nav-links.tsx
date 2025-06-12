'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: 'Swap', href: '/swap'},
  { name: 'Staking', href: '/staking'},
  { name: 'Incentives', href: '/incentives'},
  { name: 'airdrop', href: '/airdrop'},
];

export function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex-auto relative z-1">
            <ul className="flex items-center gap-x-3">
                {links.map(link => {
                    return(
                        <Link
                            href={link.href}
                            className={`${link.href === pathname ? 'bg-blue-200 text-blue-800' : 'text-stone-900 hover:bg-blue-100 hover:text-blue-800'} text-base  font-semibold transition-colors uppercase px-3 py-2 rounded-lg`}
                            key={link.name}>
                            {link.name}
                        </Link>
                    )
                })}
            </ul>
        </nav>
    );
}