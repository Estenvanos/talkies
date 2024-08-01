import React from "react";
import { useNavigate } from "react-router-dom";
const SideBar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-[10%] bg-[#292828] rounded-3xl shadow-2xl border border-slate-600 flex flex-col place-items-center">
      <div className=" place-items-center justify-center flex flex-col my-4 border-b border-slate-600 w-[93%] pb-4">
        <img
          src={user.profilephoto || "/assets/icons/profile.jpg"}
          width={80}
          height={80}
          className="rounded-full w-[80px] h-[80px] border border-slate-600 bg-slate-200"
        />
        <p className="capitalize font-mukta font-bold text-white text-xl mt-2">
          {user.username || "Username"}
        </p>
      </div>
      <div className=" w-[93%] h-[55%] -mt-2 flex flex-col gap-7 place-items-center border-b border-slate-600">
        <i className="bi bi-house text-slate-400/65 text-[2.5rem] transition-all duration-500 cursor-pointer hover:text-slate-100"
        onClick={() => navigate("/")}
        ></i>
        <i className="bi bi-plus-circle text-slate-400/65 text-[2.5rem] transition-all duration-500 cursor-pointer hover:text-slate-100"
        onClick={() => navigate("/add")}
        ></i>
        <i className="bi bi-gear text-slate-400/65 text-[2.5rem] transition-all duration-500 cursor-pointer hover:text-slate-100"
        onClick={() => navigate("/config")}
        ></i>
      </div>

      <div className="w-[93%] h-[25%] flex flex-col place-items-center">
        <i className="bi bi-box-arrow-right text-slate-400/65 text-[2.5rem] py-12  transition-all duration-500 cursor-pointer hover:text-slate-100"></i>
      </div>
    </div>
  );
};

export default SideBar;
