import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/AuthProvider";
import SideBar from "../components/SideBar";

const RootLayout = () => {
  const { isAuthenticated, user} = useUserContext();
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to={"/sign-in"} />
      ) : (
        <div className="w-screen h-screen bg-gradient-to-br from-[#272a37] to-[#525561] flex flex-row place-items-center">
          <div className="flex flex-row m-5 w-screen h-[95dvh] my-5 place-items-center items-center gap-5">
          <SideBar user={user} />
          <Outlet />            
          </div>
        </div>
      )}
    </>
  );
};

export default RootLayout;
