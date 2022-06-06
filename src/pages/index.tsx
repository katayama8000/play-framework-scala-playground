import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group, Divider } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";
import { config } from "@config/supabase/supabase";
import { Today } from "@components/layout/todo/Today";
import { UnFinishedModal } from "@components/modal";

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

  const checkTask = (task: number) => {
    if (length !== 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (flag === false) {
      console.log("flag is false");
      if (length !== 0) {
        console.log("length is not 0", length);
        setFlag(true);
        setOpened(true);
        console.log("opened is true", opened);
      }
    }
  }, [length]);

  const fetch = async () => {
    const { data, error } = await config.supabase.from("ToDos").select();

    let array: todos[] = [];
    data?.forEach((todo) => {
      if (!todo.isFinished) {
        array.push(todo);
      }
    });
    data?.forEach((todo) => {
      todo.length = array.length;
    });

    setLength(array.length);
    setTodos(data!);
  };

  const handleSubmit = useCallback(
    async (values: { todo: string; isFinished: boolean }) => {
      const { data, error } = await config.supabase.from("ToDos").insert([
        {
          todo: values.todo,
          isFinished: values.isFinished,
        },
      ]);
      if (data) {
        makeNotification("成功", "Todoを追加したぞ", "indigo");
      } else if (error) {
        makeNotification("失敗", "再度入力して", "red");
      }
      form.reset();
    },
    []
  );

  return (
    <div className="p-20">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
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
      <div>{opened === true ? <div>aaa</div> : <div>bbb</div>}</div>
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
                    length={todo.length!}
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
