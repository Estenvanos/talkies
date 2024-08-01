import React from 'react';
import ChatPreview from './ChatPreview';
import { useGetUserChats } from "../lib/react-query/queries";
import { useUserContext } from '../context/AuthProvider';

const ChatsContainer = () => {
  const { user } = useUserContext();
  const { data: chats, isLoading, error } = useGetUserChats(user?.$id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading chats.</div>;
  }

  console.log("Chats received by ChatsContainer:", chats);

  return (
    <div className='flex flex-col border border-slate-600 w-[25%] h-full rounded-3xl bg-[#292828]'>
        <h1 className='font-bold text-slate-200 font-mukta text-3xl text-start pl-4 mt-2 -mb-4'>Chats</h1>
        <div className='border-b border-slate-600 w-[95%] ml-2 h-20 mt-3 flex flex-row place-items-center'>
            <input type="text" placeholder='Search a Chat...' className='p-2 mx-2 w-full bg-[#292828] border border-slate-600 rounded-xl text-slate-200 font-mukta font-light focus:outline-none' />
        </div>
        <div className='h-full rounded-b-3xl overflow-y-auto mt-2 no-scrollbar'>
          {chats && chats.length > 0 ? (
            chats.map((chat, index) => (
              <ChatPreview value={{ ...chat, currentUserId: user.$id }} key={chat.$id} />
            ))
          ) : (
            <div className="text-slate-400 font-mukta text-center mt-4">No chats available.</div>
          )}
        </div>
    </div>
  );
}

export default ChatsContainer;
