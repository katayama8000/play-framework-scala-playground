import type { NextPage } from "next";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box } from "@mantine/core";
import { useCallback } from "react";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { db } from "@config/firebase";
import { showNotification } from "@mantine/notifications";

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      todo: "",
    },
  });

  const create = async () => {
    const docRef = doc(db, "todos", "xGiaP2IiAG6jd1AwX3tJ");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleSubmit = useCallback(async (values: { todo: string }) => {
    console.log("values", values);
    try {
      await addDoc(collection(db, "todos"), {
        expire: Date.now() + 1000 * 60 * 60 * 24,
        todo: values.todo,
        isFinished: false,
        isDeleted: false,
      });
      showNotification({
        title: "成功",
        message: "Todoを追加しました",
        color: "cyan",
      });
    } catch (error) {
      showNotification({
        title: "失敗",
        message: "Todoを追加できませんでした",
        color: "red",
      });
    }
    form.reset();
  }, []);
  return (
    <div className="p-20">
      <h1>Hello Next.js 👋</h1>
      <Button onClick={create}>マジでとる</Button>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2 flex gap-x-2"
        >
          <TextInput
            placeholder={"今日やれ"}
            classNames={{
              input: "text-base",
            }}
            {...form.getInputProps("todo")}
          />
          <Button type="submit" color="cyan">
            マジで今日やれよボタン
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Home;
