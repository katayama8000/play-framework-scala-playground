import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";
import { config } from "@config/supabase/supabase";
import { Tomorrow } from "@components/layout/todo/Tomorrow";

type todos = {
  id: number;
  todo: string;
  isFinished: boolean;
  created_at?: string;
  length: number;
};
const Home: NextPage = () => {
  const [todos, setTodos] = useState<todos[]>();
  const [length, setLength] = useState<number>(0);
  const form = useForm({
    initialValues: {
      todo: "",
      isFinished: false,
    },
  });

  useEffect(() => {
    config.supabase
      .from("TomorrowToDos")
      .on("*", (payload) => {
        fetch();
      })
      .subscribe();
    fetch();
  }, []);

  const fetch = async () => {
    const { data, error } = await config.supabase
      .from("TomorrowToDos")
      .select();

    setLength(data!.length);
    setTodos(data!);
  };

  const handleSubmit = useCallback(async (values: { todo: string }) => {
    const { data, error } = await config.supabase.from("TomorrowToDos").insert([
      {
        todo: values.todo,
      },
    ]);
    if (data) {
      makeNotification("成功", "Todoを追加したぞ", "indigo");
    } else if (error) {
      makeNotification("失敗", "再度入力して", "red");
    }
    form.reset();
  }, []);

  return (
    <div className="p-20">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2"
        >
          <TextInput
            required
            placeholder={"明日のTodo"}
            classNames={{
              input: "text-base",
            }}
            className="py-2"
            {...form.getInputProps("todo")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="indigo">
              追加
            </Button>
          </Group>
        </form>
      </Box>
      <div>明日のタスク{length}</div>
      <div>
        {todos?.map((todo, index) => {
          return (
            <div key={index}>
              <Tomorrow
                todo={todo.todo}
                id={todo.id}
                created_at={todo.created_at}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
