function CreateAccount({setEmail,setPassword,preferences}) {
    return (<div className="space-y-6" >
        <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address {!preferences.email && <span style={{ color: "red" }}><br />Your Email does not have correct format</span>}
            </label>
            
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password {!preferences.email && <span style={{ color: "red" }}><br />Your Password is too Short </span>}
                </label>
             
            </div>
            <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={e => {setPassword(e.target.value)}}
                />
            </div>
        </div>


    </div> 
    
    );
}

export default CreateAccount;