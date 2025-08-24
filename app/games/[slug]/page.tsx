import { fetchGameBySlug } from "@/app/lib/api"
import { DeveloperType, GenreType, ParentPlatformType, PlatformsType, PublisherType, StoreType, TagType } from "@/app/lib/definition";
import { BreadCumbs } from "@/app/ui/components/BreadCrumbs";
import About from "@/app/ui/components/game/About";
import { BannerGame } from "@/app/ui/components/game/Banner";
import { LikeGame } from "@/app/ui/components/game/Like";
import { ReviewsSection } from "@/app/ui/components/game/Reviews";
import { SliderCard } from "@/app/ui/components/game/Slider";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GamePage({params}: {params: Promise<{slug: string}>}) {
    const slug = (await params).slug
    const game = await fetchGameBySlug(slug)
    
    if (!game || !game.name || !game.id) {
        notFound()
    }
    
    return (
        <div className="w-full h-full bg-white/5 p-4 rounded-3xl md:p-6">
            <BreadCumbs breadcrumbs={[{name: 'Home', href: '/'}, {name: 'Games', href: '/games'}, {name: game.name, href: `/games/${game.slug}`, active: true}]} />
            
            {game.screenshots_count 
            ? 
            <div className="w-full mb-6 relative">
                <LikeGame id={game.id} className="w-8 h-8 rounded-full bg-white cursor-pointer z-2 flex justify-center shadow-xl items-center absolute top-2 right-2" />
                <SliderCard id={game.id} />
            </div>
            :
            <BannerGame name={game.name} background_image={game.background_image} id={game.id} />
            }
            
            

            <div className="flex flex-col gap-y-8">
                <About description={game.description_raw} title="About the game" />
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
                            {game?.parent_platforms?.length > 0 ? game.parent_platforms?.map((parentPlatform: ParentPlatformType) => {
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
                                    <Link href={`/publishers/${publisher.slug}`} className="text-white hover:underline">{publisher.name}</Link>{index < game.publishers.length - 1 && ","}
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
                                    <Link href={`/games?tags=${tag.slug}`} className="text-white hover:underline">{tag.name}</Link>{index < game.tags.length - 1 && ","}
                                </li>
                            )) : <li>No tags</li>}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-2 lg:col-span-4 md:col-span-3 sm:col-span-2">
                        <h5 className="text-white/65 text-sm font-semibold uppercase">Stores:</h5>
                        <ul className="flex gap-x-2 flex-wrap">
                            {game.stores.length > 0 ? game.stores?.map((store: StoreType, index: number) => {
                                const rawUrl = store.url || store?.store?.domain || '';
                                const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
                                return (
                                    <li key={store.id}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:underline"
                                        >
                                            {store?.store?.name}
                                        </a>{index < game.stores.length - 1 && ","}
                                    </li>
                                )
                            }) : <li>No stores</li>}
                        </ul>
                    </div>
                </div>
                <ReviewsSection slug={game.slug}/>
            </div>
        </div>
    )
}