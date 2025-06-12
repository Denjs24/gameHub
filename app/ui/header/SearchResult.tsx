'use client'
import { GameType } from "@/app/lib/definition";
import Image from "next/image";

export function SearchResult ({resultItems, handleClick} : {resultItems : GameType[], handleClick: (slug: string) => void}) {
    if (!resultItems || resultItems.length === 0) return null;


    return (
        <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto flex flex-col gap-y-3 ">
            {resultItems.map((item) => (
                <button type="button" key={item.id} onClick={() => handleClick(item.slug)} className="flex items-center gap-x-4 px-4 py-2 rounded-md hover:bg-black/5 cursor-pointer">
                    <Image src={item.background_image} alt={item.name} width={50} height={50} className="w-15 h-15 basis-15 object-cover rounded-md" />
                    <h3 className="text-sm text-black/65 text-left">{item.name}</h3>
                </button>
            ))}
        </div>
    )
}