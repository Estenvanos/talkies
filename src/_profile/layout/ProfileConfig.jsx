import React, { useState } from "react";
import { useUserContext } from "@/context/AuthProvider";
import ProfileAddWallpaper from "../../components/ProfileAddWallpaper";
import ProfileAddPhoto from "../../components/ProfileAddPhoto";
import { useUpdateUser } from "@/lib/react-query/queries";
import { useNavigate } from "react-router-dom";

const ProfileConfig = () => {
  const { user } = useUserContext();
  const [bio, setBio] = useState(user.bio || "");
  const [profilephoto, setProfilePhoto] = useState(user.profilephoto || "assets/icons/profile.jpg");
  const [profilewallpaper, setCoverPhoto] = useState(user.profilewallpaper || "assets/icons/profile.jpg");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const maxChars = 100;

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (newBio.length <= maxChars) {
      setBio(newBio);
    }
  };

  const { mutate: updateUser, isSuccess } = useUpdateUser(user.id);

  const handleSubmit = () => {
    setIsUpdating(true);
    updateUser({ profilephoto, profilewallpaper, bio });
  };  

  if (isSuccess) {
    navigate("/");
  }

  return (
    <div className="flex flex-col place-items-center">
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
      <h1 className="font-bold font-mukta text-slate-200 text-4xl capitalize mt-5 tracking-wide">
        {user.username || "Username"}
      </h1>
      <div className="border-t-2 border-slate-600 w-[50%] mt-2">
        <p className="font-mukta text-slate-200 font-bold text-xl mt-3 ml-3">Bio</p>
        <div className="relative">
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="border-2 border-slate-600 bg-transparent rounded-lg w-full h-24 mt-2 p-2 font-mukta text-white font-light focus:outline-none"
          ></textarea>
          <span className="absolute bottom-2 right-2 text-slate-400 text-sm">
            {bio.length}/{maxChars}
          </span>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 mt-8 w-[10%] text-lg bg-[#4295ff] text-white rounded-lg focus:outline-none transition-all duration-500 hover:bg-[#9bbbe5] font-bold"
        disabled={isUpdating}
      >
        {isUpdating ? "Loading..." : "Done"}
      </button>
    </div>
  );
};

export default ProfileConfig;
