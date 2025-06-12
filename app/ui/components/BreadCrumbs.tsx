import clsx from "clsx";
import Link from "next/link";

export function BreadCumbs ({breadcrumbs}: {breadcrumbs: {name: string, href: string, active?: boolean}[]}) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol className={'inline text-xl md:text-2xl'}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={clsx(
                            'inline',
                        breadcrumb.active ? 'text-white' : 'text-white/60 hover:text-white/80',
                    )}>
                        <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
                        {index < breadcrumbs.length - 1 ? (
                        <span className="mx-3 inline">/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    )
}