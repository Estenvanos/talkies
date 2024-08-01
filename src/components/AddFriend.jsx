import React, { useState, useRef, useEffect } from "react";
import { searchUsers } from "../lib/appwrite/api";
import UserPreview from "./UserPreview";


const AddFriend = ({ visible, setVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          const results = await searchUsers(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

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
          <i className="bi bi-person-plus text-slate-200 text-[6rem] cursor-pointer"></i>
          <h3 className="font-mukta text-4xl text-slate-200 font-bold">
            Add a Friend
          </h3>
        </>
      ) : (
        <div className="flex flex-col w-full h-full">
          <div className="border-b border-slate-600 w-[95%] ml-2 h-20 mt-3 flex flex-row place-items-center">
            <input
              type="text"
              placeholder="Search a Friend..."
              className="p-3 mx-2 w-full bg-[#292828] border border-slate-600 rounded-xl text-slate-200 font-mukta font-light focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="h-full rounded-b-3xl overflow-y-auto mt-2 no-scrollbar">
            {searchResults.map((user) => (
              <UserPreview
                key={user.$id}
                userId={user.$id}
                username={user.username}
                profilePhoto={user.profilephoto}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
