'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function SelectItemsPerPage() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
        params.set('itemsPerPage', e.target.value);
        params.set('page', '1');
    } else {
        params.delete('itemsPerPage');
        params.set('page', '1');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }
  
  
  return (
    <div className="flex items-center gap-x-2 my-4 flex-wrap gap-y-2">
        <span className="text-white/80 text-sm font-semibold">Items per page:</span>
        <select onChange={onChange} defaultValue={searchParams.get('itemsPerPage') || "20"} className="text-black bg-white px-2 py-1 rounded-md">
            <option value="20">20/per page</option>
            <option value="40">40/per page</option>
        </select>
    </div>
  );
}

// // name, released, added, created, updated, rating, metacritic
