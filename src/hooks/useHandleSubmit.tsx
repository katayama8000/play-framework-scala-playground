import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";
import { UseFormReturnType } from "@mantine/form/lib/use-form";

export const useHandleSubmit = async (
  values: {
    todo: string;
    isFinished?: boolean;
  },
  form: UseFormReturnType<{
    todo: string;
    isFinished: boolean;
  }>,
  db: string
) => {
  console.log(values, form, db);
  const { data, error } = await config.supabase.from(db).insert([
    {
      todo: values.todo,
      isFinished: false,
    },
  ]);
  if (data) {
    makeNotification("成功", "Todoを追加したぞ", "indigo");
  } else if (error) {
    makeNotification("失敗", "再度入力して", "red");
  }
  form.reset();
};
