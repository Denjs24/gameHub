import { fetchGameBySlug } from "@/app/lib/api"
import { DeveloperType, GenreType, ParentPlatformType, PlatformsType, PublisherType, TagType } from "@/app/lib/definition";
import { BreadCumbs } from "@/app/ui/components/BreadCrumbs";
import About from "@/app/ui/components/game/About";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GamePage({params}: {params: {slug: string}}) {
    const slug = params.slug
    const game = await fetchGameBySlug(slug)
    
    if (!game || !game.name || !game.id) {
        notFound()
    }
    return (
        <div className="w-full h-full bg-white/5 px-6 py-6 rounded-3xl">
            <BreadCumbs breadcrumbs={[{name: 'Home', href: '/'}, {name: 'Games', href: '/games'}, {name: game.name, href: `/games/${game.slug}`, active: true}]} />
            <div className="w-full mb-6 aspect-video relative rounded-2xl overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:to-black/40 before:from-transparent before:z-1">
                <Image src={game.background_image} alt={game.name} width={1600} height={900} className="w-full h-full object-cover"/>
                <h1 className="text-[24px] font-bold absolute bottom-3 left-3  text-white z-20 md:text-[48px] md:bottom-4 md:left-4">{game.name}</h1>
            </div>
            <div className="flex flex-col gap-y-8">
                <About description={game.description_raw} />
                <div className="flex gap-x-4 flex-wrap gap-y-4 items-center">
                    <span className="text-black/80 rounded-md bg-white px-2 py-1 font-semibold text-sm ">Date released: {new Date(game.released).toLocaleDateString()}</span>
                    <span className="text-white px-2 py-1 font-semibold text-sm uppercase">
                        Average playtime: 
                        <span className={clsx(
                            `font-bold`,
                            {
                                "text-green-700": game.playtime < 9,
                                "text-yellow-700": game.playtime > 9,
                                "text-red-700": game.playtime > 25,
                            }
                        )}> {game.playtime} hours</span>
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-x-3 gap-y-4 lg:grid-cols-4 md:grid-cols-3 md:gap-x-5 sm:grid-cols-2">
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Platforms:</h5>
                        <ul className="flex gap-x-2 flex-wrap">
                            {game?.platforms?.length > 0 ? game.platforms?.map((platform: PlatformsType, index: number) => (
                                <li key={platform.platform.id}>
                                    {platform.platform.name}{index < game.platforms.length - 1 && ","}
                                </li>
                            )) : <li>No platforms</li>}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Metascore:</h5>
                        <span className={clsx(
                            'px-2 py-1 border-2 rounded-md font-bold text-base inline-flex items-center justify-center text-center w-fit', 
                            {
                                "border-green-700 text-green-700": game.metacritic >= 80,
                                "border-yellow-700 text-yellow-700": game.metacritic >= 50 && game.metacritic < 80,
                                "border-red-700 text-red-700": game.metacritic < 50 && game.metacritic > 0,
                                "after:content-['NaN'] border-white text-white": !game.metacritic,
                            }
                        )}>{game?.metacritic}</span>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">System platforms:</h5>
                        <ul className="flex gap-x-2 flex-wrap items-center gap-x-3">
                            {game?.parent_platforms?.length > 0 ? game.parent_platforms?.map((parentPlatform: ParentPlatformType, index: number) => {
                                const icon = parentPlatform.platform.slug === "pc" ? '/platforms/windows.svg' 
                                : parentPlatform.platform.slug === "playstation" ? '/platforms/ps.svg' 
                                : parentPlatform.platform.slug === "xbox" ? '/platforms/xbox.svg' 
                                : parentPlatform.platform.slug === "nintendo" ? '/platforms/nintendo.svg' 
                                : parentPlatform.platform.slug === "mac" ? '/platforms/mac.svg' 
                                : parentPlatform.platform.slug === "linux" ? '/platforms/linux.svg' 
                                : parentPlatform.platform.slug === "android" ? '/platforms/android.svg' 
                                : parentPlatform.platform.slug === "web" ? '/platforms/web.svg' 
                                : null;
                                return (
                                    <li key={parentPlatform.platform.id} className="w-6 h-6 flex items-center justify-center">
                                        {icon ? <Image src={icon} alt={parentPlatform.platform.name} width={24} height={24} className="w-full h-full object-contain" /> : <span className="text-white text-sm font-semibold uppercase">{parentPlatform.platform.name}</span>}
                                    </li>
                                )
                            }) : <li>No system platforms</li>}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Release date:</h5>
                        <span className="text-white text-base">{new Date(game.released).toLocaleDateString()}</span>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Genre</h5>
                        <ul className="flex gap-x-2 flex-wrap">
                            {game?.genres?.length > 0 ? game.genres.map((genre: GenreType, index: number) => (
                                <li key={genre.id}>
                                    {genre.name}{index < game.genres.length - 1 && ","}
                                </li>
                            )) : <li>No genres</li>}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Developer:</h5>
                        <ul className="flex gap-x-2 flex-wrap">
                            {game?.developers?.length > 0 ? game.developers?.map((developer: DeveloperType, index: number) => (
                                <li key={developer.id}>
                                    <Link href={`/developers/${developer.slug}`} className="text-white hover:underline">{developer.name}</Link>{index < game.developers.length - 1 && ","}
                                </li>
                            )) : <li>No developers</li>}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Publishers:</h5>
                        <ul className="inline">
                            {game?.publishers.length > 0 ? game.publishers?.map((publisher: PublisherType, index: number) => (
                                <li key={publisher.id}>
                                    {publisher.name}{index < game.publishers.length - 1 && ","}
                                </li>
                            )) : <li>No publishers</li>}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Last update:</h5>
                        <span className="text-white text-base">{new Date(game.updated.split("T")[0]).toLocaleDateString()}</span>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2 lg:col-span-4 md:col-span-3 sm:col-span-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Tags:</h5>
                        <ul className="flex gap-x-2 flex-wrap">
                            {game.tags.length > 0 ? game.tags?.map((tag: TagType, index: number) => (
                                <li key={tag.id}>
                                    {tag.name}{index < game.tags.length - 1 && ","}
                                </li>
                            )) : <li>No tags</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}