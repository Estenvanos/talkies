import React, { useState } from "react";
import ChatsContainer from "../../components/ChatsContainer";
import AddFriend from "../../components/AddFriend";
import AddGroup from "../../components/AddGroup";

const Add = () => {
  const [visibleAddFriend, setVisibleAddFriend] = useState(false);
  const [visibleFormGroup, setVisibleFormGroup] = useState(false);
  return (
    <div className="flex flex-row w-full h-full">
      <ChatsContainer />
      <div className="flex flex-row w-full h-full place-items-center place-content-center gap-12">
        <AddFriend
          visible={visibleAddFriend}
          setVisible={(visible) => {
            setVisibleAddFriend(visible);
            if (visible) setVisibleFormGroup(false);
          }}
        />
        <AddGroup
          visible={visibleFormGroup}
          setVisible={(visible) => {
            setVisibleFormGroup(visible);
            if (visible) setVisibleAddFriend(false);
          }}
        />
      </div>
    </div>
  );
};

export default Add;
