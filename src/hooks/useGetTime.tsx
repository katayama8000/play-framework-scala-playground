import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";

// const getTime = async () => {
//   const { data, error } = await config.supabase.from("Links").select();
//   if (error) {
//     makeNotification("失敗", "再度試して", "red");
//   }
//   if (data) {
//     return data[0].time as number;
//   }
// };

export const useGetTime = () => {
  //const start!:number = getTime();

  const date = new Date();
  const hour = date.getHours();
  const start = 21;
  const end = 24;
  console.log(start, hour, end);
  return hour >= start && hour < end;
};
