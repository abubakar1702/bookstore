

const Login = ({loginBtn, signUpBtn, logo}) => {
  return (
    <div className="bg-white h-auto w-80 md:w-2/5 fixed top-48 border z-20 shadow-xl rounded-xl">
      <div className="flex justify-end items-center">
        <button onClick={loginBtn} className="text-xl mx-2 my-2 px-2 rounded-full border">x</button>
      </div>
      <div className="flex justify-center py-4">
        <img className="w-32 md:w-40" src={logo} alt="" />
      </div>
      <div className="mx-6 space-y-2">
        <div>
          <label htmlFor="Phone">Phone/Email</label>
          <input className="w-full p-2 border rounded-lg" type="text" placeholder="Enter Phone Number / Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input className="w-full p-2 border rounded-lg" type="password" placeholder="Enter password" />
        </div>
        <div className="my-4">
          <button className="w-full p-2 my-4 border rounded-lg bg-sky-600 text-white hover:bg-sky-500">Log In</button>
        </div>
        <div className="flex justify-center py-4">
          <p className="text-gray-700">Don&apos;t have an account?<span className="text-blue-600 cursor-pointer" onClick={signUpBtn} > Sign Up</span> </p>
        </div>
      </div>
    </div>
  )
}

export default Login