import { fetchDeveloperBySlug } from "@/app/lib/api"
import { BreadCumbs } from "@/app/ui/components/BreadCrumbs"
import { Table } from "@/app/ui/components/home/Table"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function DeveloperPage(props: {params: {slug: string}, searchParams: {page?: string, sort?: string, itemsPerPage?: string,}}) {
    const searchParams = await props.searchParams
    const slug = await props.params.slug
    const developer = await fetchDeveloperBySlug(props.params.slug)

    if(!developer) {
        notFound()
    }
    return (
        <div className="w-full h-full bg-white/5 px-6 py-6 rounded-3xl">
            <BreadCumbs breadcrumbs={[{name: 'Home', href: '/'}, {name: 'Developers', href: '/developers'}, {name: developer.name, href: `/developers/${developer.slug}`, active: true}]} />
            <div className="w-full mb-6 aspect-video relative rounded-2xl overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:to-black/40 before:from-transparent before:z-1">
                <Image src={developer.image_background} alt={developer.name} width={1600} height={900} className="w-full h-full object-cover"/>
                <h1 className="text-[24px] font-bold absolute bottom-3 left-3  text-white z-20 md:text-[48px] md:bottom-4 md:left-4">{developer.name}</h1>
            </div>
            <div className="flex flex-col gap-y-8">
                {/* <span className="text-lg text-white font-medium">Created games: {developer.games_count}</span> */}
                <Table page={searchParams.page} sort={searchParams.sort} itemsPerPage={searchParams.itemsPerPage} developer={slug || ''}/>
            </div>
        </div>
    )
}