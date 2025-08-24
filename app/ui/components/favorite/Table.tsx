"use client";
import { GameType } from "@/app/lib/definition";
import { fetchGameBySlug } from "@/app/lib/api";
import Pagination from "../home/Pagination";
import SelectItemsPerPage from "../games/SelectItemsPerPage";
import { Suspense, useEffect, useState, useMemo } from "react";
import { Game } from "../home/Game";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export function Table ({page = '1', itemsPerPage = '20'}: {page?: string, itemsPerPage?: string, userId?: string, userFavs?: string[]}) {
    const favoritesFromStore = useSelector((state: RootState) => state.favorites.games);
    const favorites = useMemo(() => favoritesFromStore || [], [favoritesFromStore]);
    const [games, setGames] = useState<GameType[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await Promise.all(
                    favorites.slice(Number(itemsPerPage) * (Number(page) - 1), Number(itemsPerPage) * Number(page)).map(async (id) => {
                        // fetchGameBySlug returns the game object or undefined/null on error
                        try {
                            const res = await fetchGameBySlug(id);
                            // If fetchGameBySlug returns null/undefined, skip
                            if (!res || !res.id) return null;
                            return res;
                        } catch (e) {
                            console.log(e);
                            return null;
                        }
                    })
                );
                // Filter out nulls
                const filteredGames = result.filter((game): game is GameType => !!game && !!game.id);
                setGames(filteredGames);
                setCount(favorites.length);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (favorites.length > 0) {
            fetchData();
        } else {
            setGames([]);
            setCount(0);
        }
    }, [favorites, page, itemsPerPage]);

    const perPage = Number(itemsPerPage);

    if(loading) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm animate-pulse">Rendering new data...</span>
            </div>
        )
    }

    if(games && games.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm">You have not favorite game!</span>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2">
                {games.map((game: GameType) => (
                    game && game.id ? <Game key={game.id} gameInfo={game} /> : null
                ))}
            </div>
            <Suspense fallback={<div>Rendering pagination...</div>}>
                <div className="flex flex-col  justify-center items-center mt-8 gap-x-2 flex-wrap gap-y-2 md:flex-row md:justify-between">
                    <SelectItemsPerPage />
                    {/* {(count / perPage) > 1 ? <SelectItemsPerPage /> : <span className="text-white/80 text-sm">You can see only {count} games</span>} */}
                    <Pagination totalPages={Math.ceil(count / perPage)} />
                    <span className="text-white/80 text-sm">Total games: {count}</span>
                </div>
            </Suspense>
        </div>
    )
}