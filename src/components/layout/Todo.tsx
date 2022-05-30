import { config } from "@config/supabase/supabase";
import { Checkbox } from "@mantine/core";

import React from "react";

type toods = {
  id: number;
  todo: string;
  isFinished: boolean;
  created_at?: string;
  handleFinish: (id: number, isFinished: boolean) => void;
};

const handleFinish = async (id: number, isFinished: boolean) => {
  console.log(id, isFinished);

  const { data, error } = await config.supabase.from("ToDos").upsert([
    {
      id,
      isFinished: !isFinished,
    },
  ]);
  if (data) {
    console.log("success");
  } else if (error) {
    console.log("error");
  }
};

export const Todo: React.FC<toods> = ({
  id,
  todo,
  isFinished,
  created_at,
  handleFinish,
}) => {
  console.log(id, todo, isFinished, created_at);

  return (
    <div>
      <Checkbox
        color="indigo"
        checked={isFinished}
        onChange={(event) => handleFinish(id, event.target.checked)}
      />
      <div>{todo}</div>
      <div>{id}</div>
      <div>{isFinished}</div>
    </div>
  );
};
