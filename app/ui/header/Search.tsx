'use client'
import { searchGames } from '@/app/lib/api';
import { btnDefaultClasses } from '../classNamesStyle';
import { useState, useRef } from 'react';
import { GameType } from '@/app/lib/definition';
import { useDebouncedCallback } from 'use-debounce';
import { SearchResult } from './SearchResult';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Search () {
    const [searchItems, setSearchItems] = useState<GameType[]>([])
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();


    const handlerChange = useDebouncedCallback(async (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
          params.set('search', query);
          if (query.length > 2 && isFocus) {
            const response = await searchGames(query);
            setSearchItems(response.results);
          } else {
            setSearchItems([]);
          }
        } else {
          params.delete('search');
          setSearchItems([]);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);
    
    const handleClick = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        setSearchItems([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        router.push(`/games/${slug}`);
    }

    return (
        <form className="flex items-center gap-x-2 relative z-1 flex-auto relative max-w-md">
            {/* <DocumentMagnifyingGlassIcon className="size-6 text-black/50"/> */}
            <input 
                ref={inputRef}
                type="text" 
                name='search' 
                onFocus={() => setIsFocus(true)} 
                onBlur={() => {
                    setIsFocus(false)
                    handlerChange('')
                }} 
                defaultValue={searchParams.get('search')?.toString() || ''} 
                onChange={e => handlerChange(e.target.value)} 
                placeholder="Search"
                className="w-full rounded-4xl border-none bg-white px-4 py-2 text-sm text-black outline-2 outline-black/10 placeholder:text-black/50 focus:outline-black min-w-0 w-full max-w-full" 
            />
            {/* <button type="submit" className={`${btnDefaultClasses} flex-none`}>Search</button> */}
            <SearchResult handleClick={handleClick} resultItems={searchItems} />
        </form>
    )
}