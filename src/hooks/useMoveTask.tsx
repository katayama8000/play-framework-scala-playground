import { config } from "@config/supabase/supabase";

export const useMoveTask = async () => {
  //明日のタスクを取得
  const { data, error } = await config.supabase.from("TomorrowToDos").select();

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
};
