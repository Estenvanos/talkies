import { useState } from "react";
import { useUserContext } from "../../context/AuthProvider"
import ProfileAddWallpaper from "../../components/ProfileAddWallpaper";
import ProfileAddPhoto from "../../components/ProfileAddPhoto";
import UpdateForm from "../../components/UpdateForm";

const Config = () => {
  const { user } = useUserContext();
  const [profilephoto, setProfilePhoto] = useState(
    user.profilephoto || "assets/icons/profile.jpg"
  );
  const [profilewallpaper, setCoverPhoto] = useState(
    user.profilewallpaper || "assets/icons/profile.jpg"
  );

  return (
    <div className="w-full h-full border border-slate-600 bg-[#292828] rounded-3xl flex flex-col place-items-center">
      <ProfileAddWallpaper
        userId={user.id}
        profilewallpaper={profilewallpaper}
        setCoverPhoto={setCoverPhoto}
      />
      <ProfileAddPhoto
        userId={user.id}
        profilephoto={profilephoto}
        setProfilePhoto={setProfilePhoto}
      />
      <UpdateForm user={user} profilephoto={profilephoto} profilewallpaper={profilewallpaper}/>
    </div>
  );
};

export default Config;
