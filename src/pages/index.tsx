import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group, Checkbox } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";
import { config } from "@config/supabase/supabase";
import { Todo } from "@components/layout/Todo";

type toods = {
  id: number;
  todo: string;
  isFinished: boolean;
  created_at?: string;
};
const Home: NextPage = () => {
  const [todos, setTodos] = useState<toods[]>();
  const form = useForm({
    initialValues: {
      todo: "",
      isFinished: false,
    },
  });

  useEffect(() => {
    config.supabase
      .from("ToDos")
      .on("*", (payload) => {
        console.log("Change received!", payload);
        fetch();
      })
      .subscribe();
  }, []);

  const fetch = async () => {
    const { data, error } = await config.supabase.from("ToDos").select();
    setTodos(data!);
  };

  const handleSubmit = useCallback(
    async (values: { todo: string; isFinished: boolean }) => {
      console.log(values);

      const { data, error } = await config.supabase.from("ToDos").insert([
        {
          todo: values.todo,
          isFinished: values.isFinished,
        },
      ]);
      if (data) {
        makeNotification("成功", "Todoを追加しました", "indigo");
      } else if (error) {
        makeNotification("失敗", "再度入力してください", "red");
      }
      form.reset();
    },
    []
  );

  return (
    <div className="p-20">
      <Link href="/linkform">
        <a>YouTube</a>
      </Link>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2"
        >
          <TextInput
            placeholder={"今日のTodo"}
            classNames={{
              input: "text-base",
            }}
            className="py-2"
            {...form.getInputProps("todo")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="indigo">
              ボタン
            </Button>
          </Group>
        </form>
      </Box>
      <div>
        {todos?.map((todo, index) => {
          return (
            <div key={index}>
              <Todo
                todo={todo.todo}
                id={todo.id}
                isFinished={todo.isFinished}
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
