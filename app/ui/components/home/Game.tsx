import { GameType } from "@/app/lib/definition";
import Image from "next/image";
import Link from "next/link";

export function Game({gameInfo}: {gameInfo: GameType}) {
   
    return (
        <div className="flex flex-col gap-y-4 rounded-md overflow-hidden">
            <Link href={`/games/${gameInfo.slug}`} className="w-full aspect-video rounded-md overflow-hidden hover:*:scale-105">
                {gameInfo.background_image ? (
                    <Image src={gameInfo.background_image} alt={gameInfo.name} width={1000} height={400} className="w-full h-full object-cover transition-all"/>
                ) : (
                    <div className="w-full h-full bg-white/5 rounded-md flex items-center justify-center text-base font-semibold">
                        <span>No image</span>
                    </div>
                )}
            </Link>
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