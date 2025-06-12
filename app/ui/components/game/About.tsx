'use client'
import { btnDefaultClasses } from "../../classNamesStyle";
import clsx from "clsx";
import { useState } from "react";

export default function About({description} : {description: string}) {
    const [isReadMore, setIsReadMore] = useState(false)

    return (
        <div className="flex flex-col gap-y-3">
            <h3 className="text-2xl text-white font-bold ">About the game:</h3>
            <p className={clsx(
                "text-base text-white/80 text-ellipsis overflow-hidden ", 
                {
                    "line-clamp-none": isReadMore,
                    "line-clamp-3": !isReadMore
                }
            )}>{description}</p>
            <button type="button" onClick={() => setIsReadMore(!isReadMore)} className={`${btnDefaultClasses} w-fit`}>{isReadMore ? "Read less" : "Read more"}</button>
        </div>
    )
}