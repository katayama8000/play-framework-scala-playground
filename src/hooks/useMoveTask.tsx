import { config } from "@config/supabase/supabase";

export const useMoveTask = async () => {
  const { data, error } = await config.supabase.from("TomorrowToDos").select();

  for (let i = 0; i < data!.length; i++) {
    await config.supabase.from("ToDos").insert([
      {
        todo: data![i].todo,
        isFinished: false,
      },
    ]);
  }

  for (let i = 0; i < data!.length; i++) {
    await config.supabase
      .from("TomorrowToDos")
      .delete()
      .match({ id: data![i].id });
  }
};
