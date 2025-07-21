export function formLogin() {
    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    // const [errorMessage, actionForm] = useActionState(authenticate, undefined)

    return(
        <form className="w-full max-w-lg rounded-2xl bg-white/10 p-6">
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
        </form>
    )
}