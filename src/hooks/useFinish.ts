import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";

export const useFinish = async (
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
    if (left === 0) {
      makeNotification("成功", "終わらして普通だからな", "indigo");
      return true;
    } else {
      makeNotification(
        "成功",
        `残タスク${left}。本当に今日中に終わる？`,
        "indigo"
      );
    }
  } else if (error) {
    throw new Error("失敗");
  }
};
