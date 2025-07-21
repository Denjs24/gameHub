'use client'
import { fetchPlatforms } from "@/app/lib/api";
import { Platform, PlatformList } from "@/app/lib/definition";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SelectPlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

  useEffect(() => {
    const getPlatforms = async () => {
      const platforms: PlatformList = await fetchPlatforms();
      if (platforms.count > 0) {
        setPlatforms(platforms.results)
      }
    }
    getPlatforms();
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
        params.set('platform', e.target.value);
        params.set('page', '1');
    } else {
        params.delete('platform');
        params.set('page', '1');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }
  
  
  return (
    <div className="flex flex-col items-start gap-x-2 my-4 flex-wrap gap-y-2 sm:flex-row sm:items-center">
        <span className="text-white/80 text-sm font-semibold">Platforms:</span>
        <select onChange={onChange} defaultValue={searchParams.get('platform') || ""} className="text-black bg-white px-2 py-1 rounded-md w-full sm:w-auto">
            <option value="">All</option>
            {platforms.length > 0
            &&
            platforms.map(platform => <option value={platform.id} key={platform.id}>{platform.name}</option>)
            }
            {/* {platforms.length > 0
            &&
            platforms.sort((a, b) => a.games_count > b.games_count ? a.games_count : b.games_count).slice(0, 7).map(platform => <option value={platform.id} key={platform.id}>{platform.name}</option>)
            } */}
        </select>
    </div>
  );
}

// // name, released, added, created, updated, rating, metacritic
