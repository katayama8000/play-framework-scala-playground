import React, { useEffect, useState } from "react";
import { config } from "@config/supabase/supabase";
import { Button, Checkbox, Group, Modal } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";
import { BsTrashFill } from "react-icons/bs";
import dayjs from "dayjs";
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
