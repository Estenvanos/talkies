import React, { useState } from "react";
import { useUserContext } from "@/context/AuthProvider";
import AddPhoto from "../../components/AddPhoto";
import { useUpdateUser } from "@/lib/react-query/queries";

const ProfileConfig = () => {
  const { user } = useUserContext();
  const [bio, setBio] = useState("");
  const [profilephoto, setProfilePhoto] = useState(user.profilephoto || "/assets/icons/profile.jpg");
  const [profilewallpaper, setCoverPhoto] = useState(user.profilewallpaper || "/assets/icons/profile.jpg");
  const maxChars = 100;

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (newBio.length <= maxChars) {
      setBio(newBio);
    }
  };

  const handleProfilePhotoChange = (file) => {
    setProfilePhoto(URL.createObjectURL(file));
    // You should also handle file upload to the server here
  };

  const handleCoverPhotoChange = (file) => {
    setCoverPhoto(URL.createObjectURL(file));
    // You should also handle file upload to the server here
  };

  const { mutate: updateUser } = useUpdateUser(user.id, { profilephoto, profilewallpaper, bio });

  const handleSubmit = () => {
    // You should handle the form submission and update the user profile here
    console.log("Updating profile...");
    updateUser();
  };

  return (
    <div className="flex flex-col place-items-center">
      <div className={`bg-slate-300 w-[1345.7px] h-52 rounded-t-3xl bg-no-repeat object-cover relative`}>
        <img src={profilewallpaper} alt="profilewallpaper" width={1345.7} height={208} className="w-[1345.7px] h-52 object-cover rounded-t-3xl"/>
        <AddPhoto
          top={190}
          left={1100}
          width={100}
          height={40}
          borderRadius="12px"
          imageSize={45}
          onChange={handleCoverPhotoChange}
        />
      </div>
      <div className="relative">
        <div className="profile-photo-wrapper rounded-full border-4 border-[#272a37] justify-center -mt-20 bg-slate-300">
          <img
            src={profilephoto}
            alt="profile"
            className="profile-photo object-cover"
          />
        </div>
        <AddPhoto top={40} left={105} onChange={handleProfilePhotoChange} />
      </div>
      <h1 className="font-bold font-mukta text-slate-200 text-4xl capitalize mt-5 tracking-wide">
        {user.username || "Username"}
      </h1>
      <div className="border-t-2 border-slate-600 w-[50%] mt-2">
        <p className="font-mukta text-slate-200 font-bold text-xl mt-3 ml-3">
          Bio
        </p>
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
      >
        Done
      </button>
    </div>
  );
};

export default ProfileConfig;
