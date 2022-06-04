import React, { useState } from "react";
import { Checkbox } from "@mantine/core";
import { BsTrashFill } from "react-icons/bs";
import { DeleteModal } from "@components/modal/DeleteModal";
import { useFinish } from "@hooks/useFinish";

type toods = {
  id: number;
  todo: string;
  isFinished: boolean;
  length: number;
  created_at?: string;
};

export const Today: React.FC<toods> = ({ id, todo, isFinished, length }) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div>
      <div className="flex-center mt-2 flex">
        <Checkbox
          color="indigo"
          checked={isFinished}
          onChange={(event) => useFinish(id, event.target.checked, length)}
        />
        {isFinished ? <del>{todo}</del> : <div>{todo}</div>}
        <BsTrashFill
          onClick={() => setOpened(true)}
          className="mt-1 ml-2 hover:bg-sky-300"
        />
      </div>
      <DeleteModal
        id={id}
        todo={todo}
        db="ToDos"
        isFinished={isFinished}
        opened={opened}
        setOpened={setOpened}
      />
    </div>
  );
};
