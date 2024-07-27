import React from "react";
import { useUserContext } from "@/context/AuthProvider";
import AddPhoto from "../../components/AddPhoto";

const ProfileConfig = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-col place-items-center">
      <div className="bg-slate-300 w-[1345.7px] h-52 rounded-t-3xl bg-no-repeat object-cover relative">
        <AddPhoto
          top={190}
          left={1100}
          width={100}
          height={40}
          borderRadius="8%"
          imageSize={45}
        />
      </div>
      <div className="relative">
        <img
          src={user.profilephoto || "/assets/icons/profile.jpg"}
          alt="profile"
          width={150}
          height={150}
          className="rounded-full border-4 border-[#272a37] justify-center -mt-20 bg-slate-300"
        />
        <AddPhoto top={40} left={105} />
      </div>
      <h1 className="font-bold font-mukta text-slate-200 text-4xl capitalize mt-5 tracking-wide">
        {user.username || "Username"}
      </h1>
      <div className="border-t-2 border-slate-600 w-[50%] mt-2">
        <p className="font-mukta text-slate-200 font-bold text-xl mt-3 ml-3">
          Bio
        </p>
        <textarea
          name=""
          id=""
          className="border-2 border-slate-600 bg-transparent rounded-lg w-full h-24 mt-2 p-2 font-mukta text-white font-light focus:outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 mt-8 w-[10%] text-xl bg-[#4295ff] text-white rounded-lg focus:outline-none transition-all duration-500 hover:bg-[#9bbbe5] font-bold"
      > Done </button>
    </div>
  );
};

export default ProfileConfig;
