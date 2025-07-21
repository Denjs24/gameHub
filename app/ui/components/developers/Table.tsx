"use client";
import { DeveloperType } from "@/app/lib/definition";
import { fetchDevelopes } from "@/app/lib/api";
import Pagination from "../home/Pagination";
import SelectItemsPerPage from "../games/SelectItemsPerPage";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Table ({page = '1', itemsPerPage = '20'}: {page?: string, itemsPerPage?: string}) {
    const [developers, setDevelopers] = useState<DeveloperType[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {results: developers, count} = await fetchDevelopes(Number(page) || 1, itemsPerPage || '20');
                setDevelopers(developers);
                setCount(count);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [page, itemsPerPage]);

    const perPage = Number(itemsPerPage);
    

    if(loading) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm animate-pulse">Rendering new data...</span>
            </div>
        )
    }
    if(developers && developers.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-white/80 text-sm">No one developer not found</span>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2">
                {developers.map((developer: DeveloperType) => (
                    <Link key={developer.id} href={`/developers/${developer.slug}`} 
                    className='flex flex-col gap-y-2 relative rounded-2xl overflow-hidden before:absolute before:inset-0 
                    before:rounded-lg before:bg-gradient-to-b before:to-black/40 before:from-transparent before:z-1 aspect-video 
                    group'>
                        <Image src={developer.image_background} alt={developer.name} width={1600} height={900} className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-cover transition-all duration-300"/>
                        <h1 className="text-lg font-bold absolute bottom-3 left-3  text-white z-20 md:left-4">{developer.name}</h1>
                        <span className="text-white text-sm absolute top-1 right-1 px-1 py-0.5 bg-black/40 rounded-md">Developed games: {developer.games_count}</span>
                    </Link>
                ))}
            </div>
            <Suspense fallback={<div>Rendering pagination...</div>}>
                <div className="flex flex-col  justify-center items-center mt-8 gap-x-2 flex-wrap gap-y-2 md:flex-row md:justify-between">
                    {(count / perPage) > 1 ? <SelectItemsPerPage /> : <span className="text-white/80 text-sm">You can see only {count} developers</span>}
                    <Pagination totalPages={Math.ceil(count / perPage)} />
                    <span className="text-white/80 text-sm">Total developers: {count}</span>
                </div>
            </Suspense>
        </div>
    )
}