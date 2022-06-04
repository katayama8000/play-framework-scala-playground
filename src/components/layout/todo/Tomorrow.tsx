import React, { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { DeleteModal } from "@components/modal/DeleteModal";

type toods = {
  id: number;
  todo: string;
  created_at?: string;
};

export const Tomorrow: React.FC<toods> = ({ id, todo }) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div>
      <div className="flex-center mt-2 flex">
        <div>{todo}</div>
        <BsTrashFill
          onClick={() => setOpened(true)}
          className="mt-1 ml-2 hover:bg-sky-300"
        />
      </div>
      <DeleteModal
        id={id}
        todo={todo}
        db="TomorrowToDos"
        isFinished={true}
        opened={opened}
        setOpened={setOpened}
      />
    </div>
  );
};
