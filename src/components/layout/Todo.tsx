import React from "react";
import { config } from "@config/supabase/supabase";
import { Checkbox } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";

type toods = {
  id: number;
  todo: string;
  isFinished: boolean;
  created_at?: string;
};

const handleFinish = async (id: number, isFinished: boolean) => {
  const { data, error } = await config.supabase.from("ToDos").upsert([
    {
      id,
      isFinished: isFinished,
    },
  ]);
  if (data) {
    makeNotification("成功", "成功", "indigo");
  } else if (error) {
    throw new Error("失敗");
  }
};

export const Todo: React.FC<toods> = ({ id, todo, isFinished }) => {
  return (
    <div>
      <div className="flex-center flex">
        <Checkbox
          color="indigo"
          checked={isFinished}
          onChange={(event) => handleFinish(id, event.target.checked)}
        />
        {isFinished ? <del>{todo}</del> : <div>{todo}</div>}
        {/* <div>{id}</div> */}
      </div>
    </div>
  );
};
