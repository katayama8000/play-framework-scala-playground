import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group, Checkbox } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";
import { config } from "@config/supabase/supabase";
import { Todo } from "@components/layout/Todo";

type todos = {
  id: number;
  todo: string;
  isFinished: boolean;
  created_at?: string;
  length: number;
};
const Home: NextPage = () => {
  const [todos, setTodos] = useState<todos[]>();
  const [length, setLength] = useState<number>();
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

  const fetch = async () => {
    const { data, error } = await config.supabase.from("ToDos").select();

    console.log("fetch", data);
    let ary: todos[] = [];
    data?.forEach((todo) => {
      if (!todo.isFinished) {
        ary.push(todo);
      }
    });
    data?.forEach((todo) => {
      todo.length = ary.length;
    });

    console.log("fetch", data);

    setTodos(data!);
    // console.log(ary.length);
    // const supa = [...data!, { length: ary.length }];
    // console.log("supa", supa);

    // setTodos(supa);
    // console.log(length);
    //countLength(data!);
  };

  // const countLength = (data: todos[]) => {
  //   let ary: todos[] = [];
  //   data?.forEach((todo) => {
  //     if (!todo.isFinished) {
  //       ary.push(todo);
  //     }
  //   });
  //   console.log("こここ", todos);

  //   console.log(ary.length);
  //   setLength(ary.length);
  // };

  const handleSubmit = useCallback(
    async (values: { todo: string; isFinished: boolean }) => {
      console.log("insert");

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
      {length}
      <div>
        {todos?.map((todo, index) => {
          return (
            <div key={index}>
              <Todo
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
  );
};

export default Home;
