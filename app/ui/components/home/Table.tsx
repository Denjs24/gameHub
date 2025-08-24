"use client";

import { useEffect, useState } from "react";
import { Game } from "./Game";
import Pagination from "./Pagination";
import SelectItemsPerPage from "../games/SelectItemsPerPage";
import { GameType } from "@/app/lib/definition";
import { fetchGames } from "@/app/lib/api";

type Props = {
  page?: string;
  sort?: string;
  itemsPerPage?: string;
  developer?: string;
  publisher?: string;
  platforms?: string;
  tags?: string;
};

export function Table(props: Props) {
  const [games, setGames] = useState<GameType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    page = '1',
    sort = '',
    itemsPerPage = '20',
    developer = '',
    publisher = '',
    platforms = '',
    tags = ''
  } = props;

  const perPage = Number(itemsPerPage) || 20;

  useEffect(() => {
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {results: games, count} = await fetchGames(Number(page), itemsPerPage, sort, developer, publisher, platforms, tags);
            setGames(games);
            setCount(count);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        
    };
    fetchData();
  }, [page, sort, itemsPerPage, developer, publisher, platforms, tags]);


  if (isLoading) {
    return <div className="text-white/80 text-sm animate-pulse">Loading...</div>;
  }

  if (!games || games.length === 0) {
    return <div className="text-white/80 text-sm">No games found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 sm:grid-cols-2">
        {games.map((game: GameType) => (
          <Game key={game.id} gameInfo={game} />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center mt-8 gap-x-2 flex-wrap gap-y-2 md:flex-row md:justify-between">
        {(count / perPage) > 1
          ? <SelectItemsPerPage />
          : <span className="text-white/80 text-sm">You can see only {count} games</span>}
        <Pagination totalPages={Math.ceil(count / perPage)} />
        <span className="text-white/80 text-sm">Total games: {count}</span>
      </div>
    </div>
  );
}