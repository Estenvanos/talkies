import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const AddPhoto = ({
  top = 0,
  left = 0,
  width = 32,
  height = 32,
  borderRadius = "50%",
  imageSize = 30,
  onChange,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileUrl(URL.createObjectURL(file));
      if (onChange) {
        onChange(file);
      }
    },
    [onChange]
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
      className="bg-slate-200 flex justify-center items-center border-2 border-[#272a37] absolute cursor-pointer"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: borderRadius,
      }}
    >
      <input
        {...getInputProps()}
        className="absolute w-full h-full opacity-0 cursor-pointer"
      />
      <img
        src={"/assets/icons/add.png"}
        alt="add photo"
        width={imageSize}
        height={imageSize}
        className="cursor-pointer"
      />
    </div>
  );
};

export default AddPhoto;
