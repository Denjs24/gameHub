import WrapperProducts from "./ui/components/home/WrapperProducts";

export default function Home({searchParams}: {searchParams: {page?: string, sort?: string, itemsPerPage?: string}}) { 
  
  return (
    <div className="min-w-full h-full bg-white/5 -mx-5 p-5 rounded-3xl md:p-6 md:mx-0">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold md:text-[48px]">Home</h1>
        <p className="text-base text-white/80">Based on player counts and release date</p>
      </div>
      <WrapperProducts page={searchParams?.page || '1'} sort={searchParams?.sort || ''} itemsPerPage={searchParams?.itemsPerPage || '20'} />
    </div>
  );
}
