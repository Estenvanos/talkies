import React from 'react';
import { useUserContext } from '../context/AuthProvider';
import { useAddFriend } from '../lib/react-query/queries';

const UserPreview = ({ userId, username, profilePhoto }) => {
  const { mutate: addFriend } = useAddFriend();
  const { user } = useUserContext();

  const handleAddFriendClick = () => {
    addFriend({ userId: user.id, friendId: userId });
  };

  return (
    <div className="w-full h-20 border-y border-slate-600 flex flex-row">
      <div className="w-1/4 flex flex-col place-items-center">
        <img
          src={profilePhoto || "/assets/icons/profile.jpg"}
          alt="friend"
          width={60} 
          height={60}
          className="mt-2 rounded-full"
        />
      </div>
      <div className="w-4/5 flex flex-col">
        <div className="w-full h-1/3 flex flex-row">
          <p className="text-slate-200 font-mukta text-3xl mt-5 justify-start ml-2">
            {username}
          </p>
          <i 
            className='bi bi-person-add text-slate-200 text-4xl ml-auto mr-9 mt-5 cursor-pointer transition-all duration-300 hover:text-slate-200/80' 
            onClick={handleAddFriendClick}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
