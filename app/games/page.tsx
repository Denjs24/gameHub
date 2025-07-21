import { Suspense } from "react";
import Select from "../ui/components/games/Select";
import { Table } from "../ui/components/home/Table";
import SelectPlatforms from "../ui/components/games/SelectPlatforms";

export default async function Home({searchParams}: {searchParams: Promise<{page?: string, sort?: string, itemsPerPage?: string, platforms?: string,}>}) {
  const params = await searchParams
  
  return (
    <div className="min-w-full h-full bg-white/5 -mx-5 p-5 rounded-3xl md:p-6 md:mx-0">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold md:text-[48px]">Games</h1>
        <p className="text-base text-white/80">Base games</p>
      </div>
      <div className="flex justify-between flex-wrap items-center mt-2 mb-2">
        <Suspense fallback={<div>Loading...</div>}>
          <Select />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SelectPlatforms />
        </Suspense>
      </div>
      <Table page={params.page} sort={params.sort} itemsPerPage={params.itemsPerPage} platforms={params.platforms} />
    </div>
  );
}
