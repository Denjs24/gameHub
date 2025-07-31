import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage () {
    const session = await auth()
    if (session) {
        redirect('/')
    }

    return(
        <div className="w-full h-full">
            <form
                action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/" })                    
                }}
                >
                <button type="submit" className="px-4 py-2 rounded-md bg-white text-black text-base text-center cursor-pointer hover:bg-white/80 transition-colors">Login with Google</button>
            </form>
        </div>
    )
}