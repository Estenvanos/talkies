import React, { useState, useRef, useEffect } from "react";

const AddGroup = ({ visible, setVisible }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`${
        visible ? "w-[60%] h-[89%] " : "w-[40%] h-[50%]"
      } bg-[#292828] border border-slate-600 mx-9 rounded-3xl shadow-2xl flex flex-col place-content-center place-items-center transition-all duration-500`}
      onClick={() => setVisible(true)}
    >
      {!visible ? (
        <>
          <div className="flex flex-row place-items-center gap-1 cursor-pointer">
            <i className="bi bi-person-fill text-slate-200/80 text-[4rem]"></i>
            <i className="bi bi-person-fill text-slate-200 text-[6rem] "></i>
            <i className="bi bi-person-fill text-slate-200/80 text-[4rem]"></i>
          </div>
          <h3 className="font-mukta text-4xl text-slate-200 font-bold">
            Form a Group
          </h3>
        </>
      ) : (
        <div className="flex flex-col w-full h-full">
          <div className="border-b border-slate-600 w-[95%] ml-2 h-20 mt-3 flex flex-row place-items-center">
            <input
              type="text"
              placeholder="Search a Friend..."
              className="p-3 mx-2 w-full bg-[#292828] border border-slate-600 rounded-xl text-slate-200 font-mukta font-light focus:outline-none"
            />
          </div>
          <div className="h-full rounded-b-3xl overflow-y-auto mt-2 no-scrollbar"></div>
        </div>
      )}
    </div>
  );
};

export default AddGroup;
