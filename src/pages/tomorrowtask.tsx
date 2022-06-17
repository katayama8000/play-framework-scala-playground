import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group } from "@mantine/core";
import { config } from "@config/supabase/supabase";
import { Tomorrow } from "@components/layout/todo/Tomorrow";
import { useMoveTask } from "@hooks/useMoveTask";
import { useHandleSubmit } from "@hooks/useHandleSubmit";

type todos = {
  id: number;
  todo: string;
  isFinished: boolean;
  created_at?: string;
};
const Home: NextPage = () => {
  const [todos, setTodos] = useState<todos[]>();
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
    setTodos(data!);
  };

  return (
    <div className="m-auto p-20">
      <Button onClick={() => useMoveTask}>click</Button>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) =>
            useHandleSubmit(values, form, "TomorrowToDos")
          )}
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
      {todos?.length !== 0 ? (
        <div>
          <div>明日のタスク{todos?.length}</div>
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
      ) : (
        <div className="pt-8 text-center text-lg font-bold">
          明日のタスクを追加してください
        </div>
      )}
    </div>
  );
};

export default Home;
