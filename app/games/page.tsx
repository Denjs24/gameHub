import { fetchGames } from "../lib/api";
import Select from "../ui/components/games/Select";
import WrapperProducts from "../ui/components/home/WrapperProducts";

export default async function Home({searchParams}: {searchParams: {page?: string, sort?: string, itemsPerPage?: string}}) {
  const params = await searchParams
  
  return (
    <div className="min-w-full h-full bg-white/5 -mx-5 p-5 rounded-3xl md:p-6 md:mx-0">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold md:text-[48px]">Games</h1>
        <p className="text-base text-white/80">Base games</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <Select />
      </div>
      <WrapperProducts page={params.page || '1'} sort={params.sort || ''} itemsPerPage={params.itemsPerPage || '20'} />
    </div>
  );
}
