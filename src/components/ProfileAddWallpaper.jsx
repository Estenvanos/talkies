import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getFilePreview, uploadFile } from "../lib/appwrite/api";
import { CircularProgress } from "@chakra-ui/react";

const ProfileAddWallpaper = ({ userId, profilewallpaper, setCoverPhoto }) => {
  const [fileUrl, setFileUrl] = useState(profilewallpaper);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        setIsLoading(true);
        const file = acceptedFiles[0];
        const fileId = await uploadFile(file);
        const previewUrl = await getFilePreview(fileId);
        setFileUrl(previewUrl);
        setCoverPhoto(previewUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setCoverPhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="bg-slate-300 w-[1345.7px] h-52 rounded-t-3xl bg-no-repeat object-cover relative flex items-center justify-center"
    >
      <div className="absolute flex top-[193px] right-[280px] border-2 border-[#272a37] w-20 h-10 bg-slate-200 rounded-lg place-items-center">
        <input
          {...getInputProps()}
          className="absolute w-[32px] h-[32px] top-2 left-3 border-2 border-red-500 cursor-pointer"
        />
        <img
          src={"/assets/icons/add.png"}
          alt="add photo"
          width={40}
          height={40}
          className="cursor-pointer justify-center items-center ml-[18px]"
        />
      </div>
      {isLoading ? (
         <CircularProgress isIndeterminate color="white" trackColor="black" size="50px" />
      ) : (
        <img
          src={fileUrl}
          alt="profile wallpaper"
          className="w-[1345.7px] h-52 object-cover rounded-t-3xl"
        />
      )}
    </div>
  );
};

export default ProfileAddWallpaper;
