import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";

export const useDelete = async (db: string, id: number) => {
  const { data, error } = await config.supabase
    .from(db)
    .delete()
    .match({ id: id });
  if (data) {
    makeNotification("成功", "タスク消したぞ", "indigo");
  } else if (error) {
    throw new Error("失敗");
  }
};
