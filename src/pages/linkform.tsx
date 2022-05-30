import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { config } from "@config/supabase/supabase";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { YouTube } from "@components/layout/YouTube";

type links = {
  link1?: string;
  link2?: string;
  link3?: string;
};

const makeNotification = (title: string, message: string, color: string) => {
  showNotification({
    title: title,
    message: message,
    color: color,
  });
};

const makeLink = (data: string) => {
  const result = data.split("=");
  return `https://www.youtube.com/embed/${result[1]}`;
};

const linkform: NextPage = () => {
  const [links, setLinks] = useState<links>();
  const form = useForm({
    initialValues: {
      link1: "",
      link2: "",
      link3: "",
    },
  });

  const handleSubmit = async (values: {
    link1: string;
    link2: string;
    link3: string;
  }) => {
    try {
      const { data, error } = await config.supabase
        .from("Links")
        .insert([
          { link1: values.link1, link2: values.link2, link3: values.link3 },
        ]);
      if (error) {
        makeNotification("失敗", "再度入力してください", "red");
      }
      if (data) {
        makeNotification("成功", "これ見てやる気を出せ！", "indigo");
      }
    } catch (e) {
      makeNotification("失敗", "再度入力してください", "red");
    }
  };

  useEffect(() => {
    const get = async () => {
      const { data, error } = await config.supabase.from("Links").select();
      if (error) {
        makeNotification("失敗", "再度試してください", "red");
      }
      if (data) {
        const l1 = makeLink(data[2].link1);
        const l2 = makeLink(data[2].link2);
        const l3 = makeLink(data[2].link3);
        setLinks({ link1: l1, link2: l2, link3: l3 });
      }
    };
    get();
  }, []);

  return (
    <div>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Link href="/">
          <a>←</a>
        </Link>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            placeholder="https://"
            {...form.getInputProps("link1")}
            className="py-2"
          />
          <TextInput
            placeholder="https://"
            {...form.getInputProps("link2")}
            className="py-2"
          />
          <TextInput
            placeholder="https://"
            {...form.getInputProps("link3")}
            className="py-2"
          />
          <Group position="right" mt="md">
            <Button type="submit" color="indigo">
              動画を保存
            </Button>
          </Group>
        </form>
      </Box>
      <YouTube link={links?.link1} />
      <YouTube link={links?.link2} />
      <YouTube link={links?.link3} />
    </div>
  );
};

export default linkform;
