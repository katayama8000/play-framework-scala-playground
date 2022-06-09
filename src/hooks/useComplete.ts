import { makeNotification } from "@function/makeNotification";
import { config } from "@config/supabase/supabase";
import dayjs from "dayjs";

export const useComplete = async () => {
  const { data, error } = await config.supabase.from("ToDos").select();

  //タスクがない場合は終わり
  if (data?.length === 0) return;
  console.log("useComplete");
  console.log(dayjs(data![0]?.created_at).format("YYYY-MM-DD"));

  //明日のタスクと現在日日付が違う==>日付が変わった場合
  if (
    dayjs().format("YYYY-MM-DD") !==
    dayjs(data![0]?.created_at).format("YYYY-MM-DD")
  ) {
    if (data) {
      console.log("cccc");
      for (let i = 0; i < data.length; i++) {
        if (data[i].isFinished) {
          await config.supabase
            .from("ToDos")
            .delete()
            .match({ id: data[i].id });
          console.log("data[i].isFinished");
        }
      }
      makeNotification("おっす", "終わった今日のタスクだけ消したぞ", "indigo");
    }
  }
};
