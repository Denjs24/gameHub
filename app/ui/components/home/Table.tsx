import { GameType } from "@/app/lib/definition";
import { fetchGames } from "@/app/lib/api";
import { Game } from "./Game";
import Pagination from "./Pagination";
import SelectItemsPerPage from "../games/SelectItemsPerPage";
import { Suspense } from "react";

export async function Table ({page, sort, itemsPerPage, developer}: {page?: string, sort?: string, itemsPerPage?: string, developer?: string}) {
    const {results: games, count} = await fetchGames(Number(page) || 1, itemsPerPage || '20', sort || '', developer || '');
    const perPage = Number(itemsPerPage) || 20;
    
    if(games && games.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm">No games found</span>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2">
                {games.map((game: GameType) => (
                    <Game key={game.id} gameInfo={game} />
                ))}
            </div>
            <Suspense fallback={<div>Rendering pagination...</div>}>
                <div className="flex flex-col  justify-center items-center mt-8 gap-x-2 flex-wrap gap-y-2 md:flex-row md:justify-between">
                    {(count / perPage) > 1 ? <SelectItemsPerPage /> : <span className="text-white/80 text-sm">You can see only {count} games</span>}
                    <Pagination totalPages={Math.ceil(count / perPage)} />
                    <span className="text-white/80 text-sm">Total games: {count}</span>
                </div>
            </Suspense>
        </div>
    )
}