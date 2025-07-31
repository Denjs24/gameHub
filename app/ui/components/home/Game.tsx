'use client'

import { GameType } from "@/app/lib/definition";
import { addFavorite, isFavorite, removeFavorite } from "@/app/lib/favorite";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Game({gameInfo}: {gameInfo: GameType}) {
    const [isFav, setIsFav] = useState<boolean>(false)

    useEffect(() => {
        setIsFav(isFavorite(gameInfo.id));
    }, [gameInfo.id]);
    

   
    return (
        <div className="flex flex-col gap-y-4 rounded-md overflow-hidden relative">
            <Link href={`/games/${gameInfo.slug}`} className="w-full aspect-video rounded-md overflow-hidden hover:*:scale-105">
                {gameInfo.background_image ? (
                    <Image src={gameInfo.background_image} alt={gameInfo.name} width={1000} height={400} className="w-full h-full object-cover transition-all"/>
                ) : (
                    <div className="w-full h-full bg-white/5 rounded-md flex items-center justify-center text-base font-semibold">
                        <span>No image</span>
                    </div>
                )}
            </Link>
            <button type="button" onClick={() => {
                if (isFav) {
                    removeFavorite(gameInfo.id);
                    setIsFav(false);
                } else {
                    addFavorite(gameInfo.id);
                    setIsFav(true);
                }
                }} 
                className="w-8 h-8 rounded-full bg-white cursor-pointer z-1 flex justify-center shadow-xl items-center absolute top-2 right-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    {isFav && <path d="M19.9381 5.61454C19.46 5.1312 18.8905 4.74782 18.2628 4.48672C17.635 4.22562 16.9617 4.09202 16.2818 4.0937C15.602 4.09202 14.9617 4.90553 14.334 5.16663C13.7063 5.42773 13.3849 5.68329 12.9068 6.16663L12.334 6.66663L11.8026 5.91662C10.8357 4.94975 9.76382 4.11491 8.39639 4.11491C7.02896 4.11491 5.71753 4.65808 4.75056 5.62495C3.79625 6.59854 3.26172 7.90749 3.26172 9.27079C3.26172 10.6341 3.79625 11.943 4.75056 12.9166L11.8026 19.9895C11.9491 20.1358 12.1477 20.218 12.3547 20.218C12.5618 20.218 12.7603 20.1358 12.9068 19.9895L19.9589 12.9166C20.9136 11.9398 21.4463 10.6271 21.4424 9.26132C21.4385 7.89549 20.8983 6.58586 19.9381 5.61454Z" fill="#000"/>}
                    <path d="M5.24 12.25C4.84461 11.8572 4.53134 11.3897 4.31845 10.8746C4.10556 10.3596 3.99731 9.8073 4 9.24999C4 8.12282 4.44777 7.04181 5.2448 6.24478C6.04183 5.44775 7.12283 4.99999 8.25 4.99999C9.83 4.99999 11.21 5.85999 11.94 7.13999H13.06C13.4311 6.48905 13.9681 5.94808 14.6163 5.57216C15.2645 5.19625 16.0007 4.99883 16.75 4.99999C17.8772 4.99999 18.9582 5.44775 19.7552 6.24478C20.5522 7.04181 21 8.12282 21 9.24999C21 10.42 20.5 11.5 19.76 12.25L12.5 19.5L5.24 12.25ZM20.46 12.96C21.41 12 22 10.7 22 9.24999C22 7.8576 21.4469 6.52224 20.4623 5.53768C19.4777 4.55311 18.1424 3.99999 16.75 3.99999C15 3.99999 13.45 4.84999 12.5 6.16999C12.0151 5.49649 11.3766 4.94831 10.6375 4.57092C9.89835 4.19353 9.0799 3.99781 8.25 3.99999C6.85761 3.99999 5.52226 4.55311 4.53769 5.53768C3.55312 6.52224 3 7.8576 3 9.24999C3 10.7 3.59 12 4.54 12.96L12.5 20.92L20.46 12.96Z" fill="#000"/>
                </svg>
            </button>
            <div className="flex flex-col gap-y-2">
                <p className="text-sm text-white/70">{gameInfo.released}</p>
                <h3 className="text-lg text-white/70 font-semibold hover:text-white transition-colors">
                    <Link href={`/games/${gameInfo.slug}`}>
                        {gameInfo.name}
                    </Link>
                </h3>
            </div>
        </div>
    )
}