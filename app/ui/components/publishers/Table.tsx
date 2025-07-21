"use client";

import { DeveloperType, PublisherType } from "@/app/lib/definition";
import { fetchPublishers } from "@/app/lib/api";
import Pagination from "../home/Pagination";
import SelectItemsPerPage from "../games/SelectItemsPerPage";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Table ({page = '1', itemsPerPage = '20'}: {page?: string, itemsPerPage?: string}) {
    const [publishers, setPublishers] = useState<PublisherType[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {results: publishers, count} = await fetchPublishers(Number(page), itemsPerPage);
                setPublishers(publishers);
                setCount(count);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [page, itemsPerPage]);

    const perPage = Number(itemsPerPage) || 20;

    if(loading) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm animate-pulse">Rendering new data...</span>
            </div>
        )
    }
    
    if(publishers && publishers.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm">No one publisher not found</span>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2">
                {publishers.map((publisher: DeveloperType) => (
                    <Link key={publisher.id} href={`/publishers/${publisher.slug}`} className='flex flex-col gap-y-2 relative rounded-2xl overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:to-black/40 before:from-transparent before:z-1 aspect-video'>
                        <Image src={publisher.image_background} alt={publisher.name} width={1600} height={900} className="w-full h-full object-cover"/>
                        <h1 className="text-lg font-bold absolute bottom-3 left-3  text-white z-20 md:left-4">{publisher.name}</h1>
                        <span className="text-white text-sm absolute top-1 right-1 px-1 py-0.5 bg-black/40 rounded-md">Games: {publisher.games_count}</span>
                    </Link>
                ))}
            </div>
            <Suspense fallback={<div>Rendering pagination...</div>}>
                <div className="flex flex-col  justify-center items-center mt-8 gap-x-2 flex-wrap gap-y-2 md:flex-row md:justify-between">
                    {(count / perPage) > 1 ? <SelectItemsPerPage /> : <span className="text-white/80 text-sm">You can see only {count} publishers</span>}
                    <Pagination totalPages={Math.ceil(count / perPage)} />
                    <span className="text-white/80 text-sm">Total publishers: {count}</span>
                </div>
            </Suspense>
        </div>
    )
}