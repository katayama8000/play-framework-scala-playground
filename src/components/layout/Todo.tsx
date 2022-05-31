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
  isFinished: boolean;
  length: number;
  created_at?: string;
};

const handleFinish = async (
  id: number,
  isFinished: boolean,
  length: number
) => {
  const { data, error } = await config.supabase.from("ToDos").upsert([
    {
      id,
      isFinished: isFinished,
    },
  ]);
  if (data) {
    const left = isFinished ? length - 1 : length + 1;
    if (length === 1) {
      makeNotification("成功", "終わらして普通だからな", "indigo");
    } else {
      makeNotification("成功", `残タスク${left}。本当に終わる？`, "indigo");
    }
  } else if (error) {
    throw new Error("失敗");
  }
};

const handleDelete = async (id: number) => {
  const { data, error } = await config.supabase
    .from("ToDos")
    .delete()
    .match({ id: id });
  if (data) {
    makeNotification("成功", "タスク消したぞ", "indigo");
  } else if (error) {
    throw new Error("失敗");
  }
};

export const Todo: React.FC<toods> = ({ id, todo, isFinished, length }) => {
  console.log("SS", isFinished);

  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div>
      <div className="flex-center mt-2 flex">
        <Checkbox
          color="indigo"
          checked={isFinished}
          onChange={(event) => handleFinish(id, event.target.checked, length)}
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
        isFinished={isFinished}
        opened={opened}
        setOpened={setOpened}
        handleDelete={handleDelete}
      />
    </div>
  );
};
