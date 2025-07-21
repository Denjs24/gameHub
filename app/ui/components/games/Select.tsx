'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Select() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
        params.set('sort', e.target.value);
        params.set('page', '1');
    } else {
        params.delete('sort');
        params.set('page', '1');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }
  
  
  return (
    <div className="flex flex-col items-start gap-x-2 my-4 flex-wrap gap-y-2 sm:flex-row sm:items-center">
        <span className="text-white/80 text-sm font-semibold">Sort by:</span>
        <select onChange={onChange} defaultValue={searchParams.get('sort') || ""} className="text-black bg-white px-2 py-1 rounded-md">
            <option value="">Default</option>
            <option value="rating">Rating(from highest)</option>
            <option value="-rating">Rating(from lowest)</option>
            <option value="metacritic">Metacritic(from highest)</option>
            <option value="-metacritic">Metacritic(from lowest)</option>
            <option value="name">Name</option>
            <option value="created">Created</option>
            <option value="released">Released</option>
            <option value="added">Added</option>
        </select>
    </div>
  );
}

// // name, released, added, created, updated, rating, metacritic
