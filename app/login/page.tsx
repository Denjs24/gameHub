import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
// import { FormLogin } from '@/app/ui/login/Form'

export default async function LoginPage () {
    const session = await auth()
    if (session) {
        redirect('/')
    }

    return(
        <div className="w-full h-full flex items-start justify-center">
            <form className="w-full max-w-lg rounded-2xl bg-white/10 p-6 flex flex-col gap-y-4">
                <h4 className="text-2xl text-white font-bold text-center">Login</h4>
                <div className="flex flex-col gap-y-5 mt-4">
                    <div className="flex flex-col gap-y-1">
                    <label htmlFor="emailLogin" className="text-white/80 text-base focus:text-white">Email</label>
                        <input type="text" name="email" placeholder="Email" id="emailLogin" className="px-4 py-2 bg-white text-black rounded-lg transition-colors placeholder:text-black/50 hover:bg-white/80 focus:bg-white focus:ring-blue-400"/>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="passwordLogin" className="text-white/80 text-base focus:text-white">Password</label>
                        <input type="password" name="password" placeholder="password" id="passwordLogin" className="px-4 py-2 bg-white text-black rounded-lg transition-colors placeholder:text-black/50 hover:bg-white/80 focus:bg-white focus:ring-blue-400"/>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <button type="submit" className="px-4 py-2 rounded-xl text-center text-base text-white font-bold bg-blue-500 cursor-pointer transition-colors hover:bg-blue-700">Login</button>
                        {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
                    </div>
                </div>
                <div className="flex items-center gap-x-4 ">
                    <div className="flex-auto bg-white/30 h-0.5"></div>
                    <span className="text-white/30 text-base font-bold">OR</span>
                    <div className="flex-auto bg-white/30 h-0.5"></div>
                </div>
                <button type="button" onClick={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/" })                    
                }} className="px-4 py-2 rounded-md bg-white text-black text-base text-center cursor-pointer hover:bg-white/80 transition-colors">Login with Google</button>
            </form>
        </div>
        // <FormLogin />
    )
}