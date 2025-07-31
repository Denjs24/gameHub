import { auth, signOut } from "@/auth"
import Image from "next/image";
import { redirect } from "next/navigation";
import { Form } from "../ui/components/profile/Form";

export default async function ProfilePage() {
    const connect = await auth();

    if (!connect) {
        redirect('/login')
    }

    

    return (
        <div className="min-w-full h-full bg-white/5 -mx-5 p-5 rounded-3xl md:p-6 md:mx-0">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-4xl font-bold md:text-[48px]">My Profile</h1>
            </div>
            <div className="flex flex-col mt-6">
                <div className="flex items-center gap-x-8 flex-wrap">
                    <div className="block w-25 h-25 relative overflow-hidden rounded-md">
                        <Image src={connect?.user?.image || ''} width={100} height={100} alt="Photo" className="absolute inset-0 w-full h-full object-cover"></Image>
                    </div>
                    <button type="button" onClick={async () => {
                    "use server"
                    await signOut({redirectTo: '/login'})                    
                }} className="px-4 py-2 flex items-center justify-center text-black bg-white rounded-md hover:bg-white/80 transition-colors cursor-pointer">Log Out</button>
                </div>
                <Form data={connect}/>
            </div>
        </div>
    )
}