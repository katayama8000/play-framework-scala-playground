import { useCallback } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group } from "@mantine/core";
import { makeNotification } from "@function/makeNotification";

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      todo: "",
    },
  });

  const create = async () => {};

  const handleSubmit = useCallback(async (values: { todo: string }) => {
    console.log("values", values);
    try {
      makeNotification("成功", "Todoを追加しました", "indigo");
    } catch (error) {
      makeNotification("失敗", "再度入力してください", "red");
    }
    form.reset();
  }, []);
  return (
    <div className="p-20">
      <h1>Hello Next.js 👋</h1>
      <Link href="/linkform">
        <a>YouTube</a>
      </Link>
      <Button onClick={create}>マジでとる</Button>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2"
        >
          <TextInput
            placeholder={"今日やれ"}
            classNames={{
              input: "text-base",
            }}
            className="py-2"
            {...form.getInputProps("todo")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="indigo">
              マジで今日やれよボタン
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default Home;
