import Image from "next/image";
import { LikeGame } from "./Like";

type BannerGameProps = {
    name: string,
    background_image: string | undefined | null,
    id: string
}
export function BannerGame(props : BannerGameProps) {

    return(
        <div className="w-full mb-6 aspect-video relative rounded-2xl overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:to-black/40 before:from-transparent before:z-1">
            {props.background_image ? <Image src={props.background_image} alt={props.name} width={1600} height={900} className="w-full h-full object-cover"/> : <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold text-lg sm:text-3xl">No Photo</span>}
            <h1 className="text-[24px] font-bold absolute bottom-3 left-3  text-white z-20 md:text-[48px] md:bottom-4 md:left-4">{props.name}</h1>
            <LikeGame id={+props.id} className="w-8 h-8 rounded-full bg-white cursor-pointer z-2 flex justify-center shadow-xl items-center absolute top-2 right-2" />
        </div>
    )
}