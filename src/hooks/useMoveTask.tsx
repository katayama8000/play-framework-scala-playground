import { config } from "@config/supabase/supabase";

export const useMoveTask = async () => {
  //   const { data, error } = await config.supabase.from("TomorrowToDos").select();
  //   console.log("useMoveTask", data![0]?.todo);

  //   await config.supabase.from("ToDos").insert([
  //     {
  //       todo: data![0]?.todo,
  //       isFinished: false,
  //     },
  //   ]);

  await config.supabase.from("TomorrowToDos").delete().match({ id: 14 });
};
