import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/AuthProvider";

const ProfileRoot = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="flex flex-1 justify-center flex-col items-center bg-[#525561]">
            <div className="flex w-[90%] h-[85%] bg-[#272a37] rounded-3xl shadow-xl">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileRoot;
