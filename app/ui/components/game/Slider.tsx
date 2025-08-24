'use client'

import { fetchScreenshots } from "@/app/lib/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { ScreenShotType } from "@/app/lib/definition";
import Image from "next/image";


export function SliderCard ({id} : {id: string}){
    const [screenshots, setScreenshots] = useState<ScreenShotType[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadScreenshots = async () => {
            try {
                const result = await fetchScreenshots(id);
                if (result && result.results) {
                    setScreenshots(result.results);
                }
            } catch (error) {
                console.error('Error loading screenshots:', error);
            } finally {
                setLoading(false);
            }
        };

        loadScreenshots();
    }, [id]);

    if (loading) {
        return <div>Loading screenshots...</div>;
    }

    if (screenshots.length === 0) {
        return <></>;
    }

    return(
        <>
            <Swiper 
                slidesPerView={1} 
                spaceBetween={20}
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation
                pagination={{ clickable: true }}
                className="main-swiper-card mb-3"
                loop={true}
            >
                {screenshots.map((screenshot : ScreenShotType) => {
                    return(
                        <SwiperSlide key={screenshot.id} className="rounded-md overflow-hidden aspect-[4/3] md:aspect-video relative">
                            <Image src={screenshot.image} alt="Image" width={screenshot.width} height={screenshot.height} className="w-full h-full absolute inset-0 object-cover" />
                        </SwiperSlide>
                    )
                })}
                
            </Swiper>
            {screenshots.length > 1 
            && 
            <Swiper
                onSwiper={(swiper: SwiperType) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="thumbs-swiper-card mb-5"
                breakpoints={{
                    1330: {
                        slidesPerView: 5
                    },
                    480: {
                        slidesPerView: 4
                    },
                    320: {
                        slidesPerView: 3
                    }
                }}
            >
                {screenshots.map((screenshot : ScreenShotType) => {
                    return(
                        <SwiperSlide key={screenshot.id} className="rounded-md overflow-hidden transition-opacity cursor-pointer relative aspect-[4/3] md:aspect-video">
                            <Image src={screenshot.image} alt="Image" width={screenshot.width} height={screenshot.height} className="w-full h-full absolute inset-0 object-cover"/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>}
            
        </>
    )
}