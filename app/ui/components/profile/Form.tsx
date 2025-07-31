export type formProfileProps = {
    data: {
        user? : {
            name?: string | null,
            email?: string | null,
            image?: string | null,
            age?: string | null,
            country?: string | null,
        },
        expires?: string | null
    }
}

export function Form(props : formProfileProps) {
    
    return (
        <form action='#' className="flex flex-col gap-20 mt-4">
            <div className="grid grid-cols-3 gap-7.5">
                <div className="flex flex-col gap-y-1 flex-1/3">
                    <label htmlFor="nameField" className="text-sm text-white/60">Name</label>
                    <input type="text" name="name" defaultValue={props?.data?.user?.name || ''} readOnly={!!props?.data?.user?.name} id="nameField" className="bg-white rounded-md px-4 py-2 text-black" />
                </div>
                <div className="flex flex-col gap-y-1 flex-1/3">
                    <label htmlFor="emailField" className="text-sm text-white/60">Email</label>
                    <input type="text" name="email" defaultValue={props?.data?.user?.email || ''} readOnly={!!props?.data?.user?.email} id="emailField" className="bg-white rounded-md px-4 py-2 text-black" />
                </div>
                <div className="flex flex-col gap-y-1 flex-1/3">
                    <label htmlFor="ageField" className="text-sm text-white/60">Age</label>
                    <input type="number" name="age" defaultValue={props?.data?.user?.age || ''} id="ageField" className="bg-white rounded-md px-4 py-2 text-black" />
                </div>
                <div className="flex flex-col gap-y-1 flex-1/3">
                    <label htmlFor="countrySelect" className="text-sm text-white/60">Country</label>
                    <select name="country" defaultValue={'Ukraine'} id="countrySelect" className="bg-white rounded-md px-4 py-2 text-black">
                        <option value="Albania">Albania</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Austria">Austria</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Greece">Greece</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Italy">Italy</option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Malta">Malta</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="North Macedonia">North Macedonia</option>
                        <option value="Norway">Norway</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Romania">Romania</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Spain">Spain</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Vatican City">Vatican City</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="w-1/3 px-4 py-2 flex items-center justify-center text-black bg-white rounded-md hover:bg-white/80 transition-colors cursor-pointer">Submit</button>
        </form>
    )
}