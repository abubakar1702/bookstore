
const SignUp = ({ loginBtn, logo, signUpBtn }) => {
    return (
        <div className="bg-white h-auto w-80 md:w-2/5 fixed top-42 border z-20 shadow-xl rounded-xl">
            <div className="flex justify-end items-center">
                <button onClick={loginBtn} className="text-xl mx-2 my-2 px-2 rounded-full border">x</button>
            </div>
            <div className="flex justify-center py-4">
                <img className="w-32 md:w-40" src={logo} alt="" />
            </div>
            <div className="mx-6 space-y-2">
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="w-full p-2 border rounded-lg" type="text" placeholder="Enter name" />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input className="w-full p-2 border rounded-lg" type="text" placeholder="Enter Phone Number" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="w-full p-2 border rounded-lg" type="text" placeholder="Enter email" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-2 space-y-2 lg:space-y-0">
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="w-full p-2 border rounded-lg" type="password" placeholder="Enter Password" />
                    </div>
                    <div>
                        <label htmlFor="passwordagain">Confirm Password</label>
                        <input className="w-full p-2 border rounded-lg" type="password" placeholder="Enter password again" />
                    </div>
                </div>
                <div className="">
                    <button className="w-full p-2 my-4 border rounded-lg bg-sky-600 text-white hover:bg-sky-500">Sign Up</button>
                </div>
                <div className="flex justify-center py-4">
                    <p className="text-gray-700">Already have an account? <span
                        className="text-blue-600 cursor-pointer" onClick={signUpBtn}>Log In</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp