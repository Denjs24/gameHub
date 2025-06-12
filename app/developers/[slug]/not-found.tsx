import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-full bg-white/5 px-6 py-6 rounded-3xl">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-[48px] font-bold">Developer not found</h1>
                <Link href="/" className="text-white/70 hover:text-white font-medium transition-colors px-4 py-2 self-start rounded-md bg-white/10">Go back to home</Link>
            </div>
        </div>
    )
}