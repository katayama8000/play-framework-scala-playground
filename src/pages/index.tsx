import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group } from "@mantine/core";
import { config } from "@config/supabase/supabase";
import { Today } from "@components/layout/todo/Today";
import { UnFinishedModal } from "@components/modal";
import { useGetTime } from "@hooks/useGetTime";
import { useHandleSubmit } from "@hooks/useHandleSubmit";
import { useComplete } from "@hooks/useComplete";

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
  const [flag, setFlag] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const hour: boolean = useGetTime();

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
        fetch();
      })
      .subscribe();
    fetch();
  }, []);

  //lengthを検知して、modalを一回だけ開く
  useEffect(() => {
    if (flag === false && hour === true) {
      if (length !== 0) {
        setFlag(true);
        setOpened(true);
      }
    }
  }, [length]);

  const fetch = async () => {
    const { data, error } = await config.supabase.from("ToDos").select();
    setTodos(data!);
    //終わっていないタスクの数を取得
    let unFinishedTodoLength: number = 0;
    data?.filter((todo) => {
      if (!todo.isFinished) {
        unFinishedTodoLength++;
      }
    });
    setLength(unFinishedTodoLength);
  };

  return (
    <div className="p-20">
      <Button onClick={useComplete}>click</Button>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) =>
            useHandleSubmit(values, form, "ToDos")
          )}
          className="mt-2"
        >
          <TextInput
            required
            placeholder={"今日のTodo"}
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
      <UnFinishedModal open={opened} />
      {todos?.length !== 0 ? (
        <div>
          <div>残りのタスク{length}</div>
          <div>
            {todos?.map((todo, index) => {
              return (
                <div key={index}>
                  <Today
                    todo={todo.todo}
                    id={todo.id}
                    isFinished={todo.isFinished}
                    created_at={todo.created_at}
                    length={length}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="pt-8 text-center text-lg font-bold">
          タスクを追加してください
        </div>
      )}
    </div>
  );
};

export default Home;
