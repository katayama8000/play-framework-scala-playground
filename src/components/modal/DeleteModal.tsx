import { useDelete } from "@hooks/useDelete";
import { Button, Group, Modal } from "@mantine/core";
import React from "react";

type Props = {
  id: number;
  todo: string;
  db: string;
  isFinished?: boolean;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DeleteModal: React.FC<Props> = ({
  id,
  todo,
  db,
  isFinished,
  opened,
  setOpened,
}) => {
  return (
    <div>
      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <h3 className="text-center">
          {isFinished ? "" : "まだ終わっていないぞ"}
        </h3>
        <h3 className="text-center">本当に{todo}を削除するのか？</h3>
        <Group position="right" mt="md">
          <Button
            color="red"
            onClick={() => {
              useDelete(db, id), setOpened(false);
            }}
          >
            はい
          </Button>
          <Button color="indigo" onClick={() => setOpened(false)}>
            いいえ
          </Button>
        </Group>
      </Modal>
    </div>
  );
};
