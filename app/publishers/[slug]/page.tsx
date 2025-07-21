import { fetchPublisherBySlug } from "@/app/lib/api"
import { BreadCumbs } from "@/app/ui/components/BreadCrumbs"
import { Table } from "@/app/ui/components/home/Table"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function PublisherPage(props: {params: Promise<{slug: string}>, searchParams: Promise<{page?: string, sort?: string, itemsPerPage?: string}>}) {
    const searchParams = await props.searchParams
    const slug = (await props.params).slug
    const publisher = await fetchPublisherBySlug(slug)

    if(!publisher) {
        notFound()
    }

    return (
        <div className="w-full h-full bg-white/5 px-6 py-6 rounded-3xl">
            <BreadCumbs breadcrumbs={[{name: 'Home', href: '/'}, {name: 'Publishers', href: '/publishers'}, {name: publisher.name, href: `/developers/${publisher.slug}`, active: true}]} />
            <div className="w-full mb-6 aspect-video relative rounded-2xl overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:to-black/40 before:from-transparent before:z-1">
                <Image src={publisher.image_background} alt={publisher.name} width={1600} height={900} className="w-full h-full object-cover"/>
                <h1 className="text-[24px] font-bold absolute bottom-3 left-3  text-white z-20 md:text-[48px] md:bottom-4 md:left-4">{publisher.name}</h1>
            </div>
            <div className="flex flex-col gap-y-8">
                <h3 className="text-2xl text-white font-bold ">Games published by {publisher.name}</h3>
                <Table page={searchParams.page} itemsPerPage={searchParams.itemsPerPage} publisher={slug} />
            </div>
        </div>
    )
}