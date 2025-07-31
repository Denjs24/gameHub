import { Table } from "../ui/components/favorite/Table";

export default async function FavoritePage(props: {searchParams: Promise<{page?: string, sort?: string, itemsPerPage?: string}>}) {
    const params = await props.searchParams

    return (
        <div className="min-w-full h-full bg-white/5 -mx-5 p-5 rounded-3xl md:p-6 md:mx-0">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-4xl font-bold md:text-[48px]">Favorite</h1>
            </div>
            <Table page={params.page} itemsPerPage={params.itemsPerPage} />
        </div>
    )
}