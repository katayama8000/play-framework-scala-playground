import { YouTube } from "@components/layout/YouTube";
import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";
import React, { useEffect, useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

type links = {
  link1?: string;
  link2?: string;
  link3?: string;
};

const rand = () => {
  return Math.floor(Math.random() * 3);
};

const makeLink = (link: string) => {
  const result = link.split("=");
  return `https://www.youtube.com/embed/${result[1]}`;
};

export const UnFinishedModal: React.FC = () => {
  const [links, setLinks] = useState<links>();
  const [showLink, setShowLink] = useState<string>();
  const [opened, setOpened] = useState(false);

  const random: number = rand();

  useEffect(() => {
    const get = async () => {
      const { data, error } = await config.supabase.from("Links").select();
      if (error) {
        makeNotification("失敗", "再度試して", "red");
      }
      if (data) {
        const l1 = makeLink(data[0].link1);
        const l2 = makeLink(data[0].link2);
        const l3 = makeLink(data[0].link3);
        //setLinks({ link1: l1, link2: l2, link3: l3 });
        if (random === 0) {
          console.log("link1");
          setShowLink(l1);
        }
        if (random === 1) {
          console.log("link2");
          setShowLink(l2);
        }
        if (random === 2) {
          console.log("link3");
          setShowLink(l3);
        }
      }
    };
    get();
  }, []);

  // const handleDecide = () => {
  //   if (random === 0) {
  //     console.log("link1");
  //     setShowLink(links?.link1);
  //   }
  //   if (random === 1) {
  //     console.log("link2");
  //     setShowLink(links?.link2);
  //   }
  //   if (random === 2) {
  //     console.log("link3");
  //     setShowLink(links?.link3);
  //   }
  // };

  return (
    <div>
      {showLink}
      {/* <div onClick={() => handleDecide()}>UnFinishedModal</div> */}
      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="これを見てどう思う？"
      >
        <div className="flex justify-center">
          <YouTube link={showLink} />
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </div>
  );
};
