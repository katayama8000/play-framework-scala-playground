import React, { useEffect, useState } from "react";
import { YouTube } from "@components/layout/YouTube";
import { config } from "@config/supabase/supabase";
import { makeNotification } from "@function/makeNotification";
import { Modal } from "@mantine/core";

type Props = {
  open: boolean;
};

const rand = () => {
  return Math.floor(Math.random() * 3);
};

const makeLink = (link: string) => {
  const result = link.split("=");
  return `https://www.youtube.com/embed/${result[1]}`;
};

export const UnFinishedModal: React.FC<Props> = ({ open }) => {
  console.log("open", open);

  const [showLink, setShowLink] = useState<string>();
  const [opened, setOpened] = useState(false);

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
        const random: number = rand();
        switch (random) {
          case 0:
            setShowLink(l1);
            break;
          case 1:
            setShowLink(l2);
            break;
          case 2:
            setShowLink(l3);
            break;
          default:
            break;
        }
      }
    };
    get();
    setOpened(open);
  }, [open]);

  return (
    <div>
      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div className="m-1 text-center">
          <div>タスクが終わっていないよ？</div>
          <div>これ見てどう思う？</div>
        </div>
        <div className="flex justify-center">
          <YouTube link={showLink} />
        </div>
      </Modal>
    </div>
  );
};
