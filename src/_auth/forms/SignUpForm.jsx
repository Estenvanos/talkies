import React from "react";
import Logo from "../../components/Logo";

const SignUpForm = () => {
  return (
    <div className="flex justify-center items-center h-[100%] w-[52.3%] ">
      <div className="  p-8 rounded-xl w-[70%] h-[80%]">
        <Logo />
        <h2 className="text-white text-2xl font-semibold mb-4">
          Create new account.
        </h2>
        <p className="text-[#7d7e87] text-sm mb-6">
          Already A Member?{" "}
          <a href="#" className="text-[#4295ff]">
            Log In
          </a>
        </p>

        <form>
          <div className="mb-4">
            <label className="block text-[#7d7e87] mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"  
              className="w-full p-3 bg-[#2e3440] text-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#7d7e87] mb-2">Email</label>
            <input
              type="email"
              placeholder="michal.masiak@anywhere.co"
              className="w-full p-3 bg-[#2e3440] text-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#7d7e87] mb-2">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 bg-[#2e3440] text-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-[#4295ff] text-white rounded-lg focus:outline-none transition-all duration-500 hover:hover:bg-[#9bbbe5]"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
