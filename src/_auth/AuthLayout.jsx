import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/AuthProvider";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="flex flex-1 justify-center flex-col items-center bg-[#525561]">
            <div className="flex w-[90%] h-[85%] bg-[#272a37] rounded-3xl shadow-xl">
              <div className="w-[43%] h-[85%] absolute right-[74px] bg-auth-bg bg-cover bg-right rounded-r-3xl"></div>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
