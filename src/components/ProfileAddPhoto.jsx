import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getFilePreview, uploadFile } from "../lib/appwrite/api";

const ProfileAddPhoto = ({ userId, profilephoto, setProfilePhoto }) => {
  const [fileUrl, setFileUrl] = useState(profilephoto);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        setIsLoading(true);
        const file = acceptedFiles[0];
        const fileId = await uploadFile(file);
        const previewUrl = await getFilePreview(fileId);
        setFileUrl(previewUrl);
        setProfilePhoto(previewUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setProfilePhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()} className="relative">
      <div className="profile-photo-wrapper rounded-full border-4 border-[#272a37] justify-center -mt-20 bg-slate-300">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">Loading...</div>
        ) : (
          <img
            src={fileUrl}
            alt="profile"
            className="profile-photo object-cover"
          />
        )}
        <div className="bg-slate-200 flex justify-center items-center border-2 border-[#272a37] absolute cursor-pointer rounded-full top-9 right-4">
          <input
            {...getInputProps()}
            className="absolute w-[32px] h-[32px] top-2 left-3 border-2 border-red-500 cursor-pointer"
          />
          <img
            src={"/assets/icons/add.png"}
            alt="add photo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAddPhoto;
