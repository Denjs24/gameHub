import Link from "next/link";
import {Search} from "../../header/Search"
import { onest } from "../../fonts";
import { Suspense } from "react";
import { HeaderProfile } from "./HeaderProfile";

const beforeBlur = `before:absolute before:inset-0 before:rounded-4xl before:bg-black/40 before:inline-block before:z-0 before:backdrop-blur-sm`

export function Header () {
    return(
        <header className={`${beforeBlur} container fixed z-5 top-3 left-1/2 -translate-x-1/2 mx-auto rounded-4xl h-16 px-5 py-3 justify-between shadow-md flex items-center gap-x-2 md:gap-x-8 md:top-5 sm:gap-x-4`}>
            <Link href={'/'} className="relative z-1">
                <h1 style={onest.style} className="text-base font-bold text-white md:text-3xl">GameHub</h1>
            </Link>
            <Link href={'/favorite'} className="relative z-1 ml-auto w-6 h-6 basis-6 grow-0 shrink-0 rounded-full bg-white flex items-center justify-center sm:w-8 sm:h-8 sm:basis-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 basis-5 sm:w-66 sm:h-6 sm:basis-6">
                <path d="M19.9381 5.61454C19.46 5.1312 18.8905 4.74782 18.2628 4.48672C17.635 4.22562 16.9617 4.09202 16.2818 4.0937C15.602 4.09202 14.9617 4.90553 14.334 5.16663C13.7063 5.42773 13.3849 5.68329 12.9068 6.16663L12.334 6.66663L11.8026 5.91662C10.8357 4.94975 9.76382 4.11491 8.39639 4.11491C7.02896 4.11491 5.71753 4.65808 4.75056 5.62495C3.79625 6.59854 3.26172 7.90749 3.26172 9.27079C3.26172 10.6341 3.79625 11.943 4.75056 12.9166L11.8026 19.9895C11.9491 20.1358 12.1477 20.218 12.3547 20.218C12.5618 20.218 12.7603 20.1358 12.9068 19.9895L19.9589 12.9166C20.9136 11.9398 21.4463 10.6271 21.4424 9.26132C21.4385 7.89549 20.8983 6.58586 19.9381 5.61454Z" fill="#000"/>
                    <path d="M5.24 12.25C4.84461 11.8572 4.53134 11.3897 4.31845 10.8746C4.10556 10.3596 3.99731 9.8073 4 9.24999C4 8.12282 4.44777 7.04181 5.2448 6.24478C6.04183 5.44775 7.12283 4.99999 8.25 4.99999C9.83 4.99999 11.21 5.85999 11.94 7.13999H13.06C13.4311 6.48905 13.9681 5.94808 14.6163 5.57216C15.2645 5.19625 16.0007 4.99883 16.75 4.99999C17.8772 4.99999 18.9582 5.44775 19.7552 6.24478C20.5522 7.04181 21 8.12282 21 9.24999C21 10.42 20.5 11.5 19.76 12.25L12.5 19.5L5.24 12.25ZM20.46 12.96C21.41 12 22 10.7 22 9.24999C22 7.8576 21.4469 6.52224 20.4623 5.53768C19.4777 4.55311 18.1424 3.99999 16.75 3.99999C15 3.99999 13.45 4.84999 12.5 6.16999C12.0151 5.49649 11.3766 4.94831 10.6375 4.57092C9.89835 4.19353 9.0799 3.99781 8.25 3.99999C6.85761 3.99999 5.52226 4.55311 4.53769 5.53768C3.55312 6.52224 3 7.8576 3 9.24999C3 10.7 3.59 12 4.54 12.96L12.5 20.92L20.46 12.96Z" fill="#000"/>
                </svg>
            </Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Search />
            </Suspense>
           <HeaderProfile />
        </header>
    )
}