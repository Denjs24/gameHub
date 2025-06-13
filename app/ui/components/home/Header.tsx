import Link from "next/link";
import {Search} from "../../header/Search"
import { onest } from "../../fonts";
import { Suspense } from "react";

const beforeBlur = `before:absolute before:inset-0 before:rounded-4xl before:bg-black/40 before:inline-block before:z-0 before:backdrop-blur-sm`

export function Header () {
    return(
        <header className={`${beforeBlur} container fixed z-5 top-3 left-1/2 -translate-x-1/2 mx-auto rounded-4xl h-16 px-5 py-3 justify-between shadow-md flex items-center gap-x-4 md:gap-x-8 md:top-5`}>
            <Link href={'/'} className="relative z-1">
                <h1 style={onest.style} className="text-base font-bold text-white md:text-3xl">GameHub</h1>
            </Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Search />
            </Suspense>
            {/* <NavLinks /> */}
        </header>
    )
}