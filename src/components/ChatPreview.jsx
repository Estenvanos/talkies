import React from 'react';

const ChatPreview = ({ value }) => {
  const { membersDetails, lastMessage, updatedAt, currentUserId } = value;

  // Filtra o usuário atual dos membros
  const chatPartner = membersDetails.find(member => member.$id !== currentUserId);

  return (
    <div className="w-full h-20 border-y border-slate-600 flex flex-row">
      <div className="w-1/4 flex flex-col place-items-center">
        <img
          src={chatPartner?.profilepicture || "/assets/icons/profile.jpg"}  // Adiciona fallback para imagem
          alt="friend"
          width={60}
          height={60}
          className="mt-2 rounded-full"
        />
      </div>
      <div className="w-4/5 flex flex-col">
        <div className="w-full h-1/3 flex flex-row">
          <p className="text-slate-200 font-mukta justify-start ml-2">
            {chatPartner?.username || "Unknown User"}
          </p>
          <p className="text-slate-400 font-mukta font-thin text-sm ml-auto mr-2 mt-[2px]">
            {new Date(updatedAt).toLocaleTimeString()}
          </p>
        </div>
        <div className='w-full h-2/3 flex flex-row'>
          <p className='text-slate-400 text-sm font-mukta ml-2'>
            {lastMessage?.content || 'No messages yet'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
