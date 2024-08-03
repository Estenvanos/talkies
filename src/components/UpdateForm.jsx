import React, { useEffect, useState } from "react";
import { useUpdateUser } from "../lib/react-query/queries";
import { CircularProgress } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const UpdateForm = ({ user, profilephoto, profilewallpaper }) => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");

  const { mutate: updateUser, isPending, isSuccess, isError, error } = useUpdateUser(user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      profilephoto,
      profilewallpaper,
      bio,
      username,
      email,
      password,
    });
  };

  const maxChars = 100;
  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (newBio.length <= maxChars) {
      setBio(newBio);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Profile Update.',
        description: "Your profile was successfully updated.",
        status: 'success',
        duration: 2000, // Adjust duration as needed
        isClosable: true,
        position: 'bottom-right'
      });
    } else if (isError) {
      toast({
        title: 'Update Failed.',
        description: error?.message || "An error occurred while updating your profile.",
        status: 'error',
        duration: 2000, // Adjust duration as needed
        isClosable: true,
        position: 'bottom-right'
      });
    }
  }, [isSuccess, isError, error, toast]);

  return (
    <form
      className="mt-8 w-full h-full grid grid-cols-2 gap-4 "
      onSubmit={handleSubmit} // Ensure form submits with enter key
    >
      <div className="flex flex-col col-span-1 place-items-center p-4 gap-5">
        <div className="w-[80%] mb-4">
          <label
            htmlFor="username"
            className="font-bold font-mukta text-slate-200 text-xl mr-auto"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username} // Use value instead of defaultValue
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-1 text-lg font-mukta bg-transparent border-b border-slate-600 text-slate-200 focus:outline-none"
          />
        </div>
        <div className="relative w-[80%]">
          <label
            htmlFor="bio"
            className="font-mukta font-bold text-slate-200 text-xl mr-auto"
          >
            Bio
          </label>
          <textarea
            id="bio"
            maxLength={maxChars}
            value={bio}
            onChange={handleBioChange}
            className="border-2 border-slate-600 bg-transparent rounded-lg w-full h-24 mt-2 p-2 font-mukta text-white font-light focus:outline-none"
          ></textarea>
          <span className="absolute bottom-2 right-2 text-slate-400 text-sm">
            {bio.length}/{maxChars}
          </span>
        </div>
      </div>
      <div className="flex flex-col col-span-1 gap-5 place-items-center p-4">
        <div className="w-[80%] mb-4">
          <label
            htmlFor="email"
            className="font-bold font-mukta text-slate-200 text-xl mr-auto"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email} // Use value instead of defaultValue
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1 text-lg font-mukta bg-transparent border-b border-slate-600 text-slate-200 focus:outline-none"
          />
        </div>
        <div className="w-[80%] relative">
          <label
            htmlFor="password"
            className="font-bold font-mukta text-slate-200 text-xl mr-auto"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password} // Use value instead of defaultValue
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1 text-lg font-mukta bg-transparent border-b border-slate-600 text-slate-200 focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 mt-8 mr-3 text-slate-200"
          >
            {showPassword ? (
              <i className="bi bi-eye-slash text-slate-200/80"></i>
            ) : (
              <i className="bi bi-eye text-slate-200/80" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 mt-8 w-[10%] absolute top-[83%] left-[49%] text-lg bg-[#4295ff] text-white rounded-lg focus:outline-none transition-all duration-500 hover:bg-[#9bbbe5] font-bold"
      >
        {isPending ? (
          <CircularProgress isIndeterminate color="white" trackColor="black" size="25px" />
        ) : (
          "Done"
        )}
      </button>
    </form>
  );
};

export default UpdateForm;
