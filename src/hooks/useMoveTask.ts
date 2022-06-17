import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";
import dayjs from "dayjs";
export const useMoveTask = async () => {
  //明日のタスクを取得
  const { data } = await config.supabase.from("TomorrowToDos").select();
  //タスクがない場合は終わり
  if (data?.length === 0) return;
  //明日のタスクと現在日日付が違う==>日付が変わった場合
  if (
    dayjs().format("YYYY-MM-DD") !==
    dayjs(data![0].created_at).format("YYYY-MM-DD")
  ) {
    //明日のタスクを今日のタスクに移動
    for (let i = 0; i < data!.length; i++) {
      await config.supabase.from("ToDos").insert([
        {
          todo: data![i].todo,
          isFinished: false,
        },
      ]);
    }
    //明日のタスクを削除
    for (let i = 0; i < data!.length; i++) {
      await config.supabase
        .from("TomorrowToDos")
        .delete()
        .match({ id: data![i].id });
    }
    //終わっているタスクを削除する必要あり
    makeNotification(
      "移動完了",
      "明日のタスクを今日のタスクに移動させたぞ",
      "indigo"
    );
  }
};
