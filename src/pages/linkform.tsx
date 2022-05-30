import React, { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { config } from "@config/supabase/supabase";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

type links = {
  link1: string;
  link2: string;
  link3: string;
};

const show = (title: string, message: string, color: string) => {
  showNotification({
    title: title,
    message: message,
    color: color,
  });
};

const linkform: NextPage = () => {
  const [links, setLinks] = useState<links[]>();
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
        show("失敗", "再度入力してください", "red");
      }
      if (data) {
        show("成功", "これ見てやる気を出せ！", "indigo");
      }
    } catch (e) {
      show("失敗", "再度入力してください", "red");
    }
  };

  const get = async () => {
    const { data, error } = await config.supabase.from("Links").select();
    if (error) {
      show("失敗", "再度試してください", "red");
    }
    if (data) {
      setLinks(data);
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Link href="/">
          <a>←</a>
        </Link>
        <Button color="indigo" onClick={get}>
          get
        </Button>
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
      <iframe
        width="160"
        height="120"
        src="https://www.youtube.com/embed/6zKNJW1-cwA"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default linkform;
