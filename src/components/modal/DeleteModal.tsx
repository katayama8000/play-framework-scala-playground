import { Button, Group, Modal } from "@mantine/core";
import React from "react";

type Props = {
  id: number;
  todo: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: number) => void;
};
export const DeleteModal: React.FC<Props> = ({
  id,
  todo,
  opened,
  setOpened,
  handleDelete,
}) => {
  return (
    <div>
      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <h3 className="text-center">本当に{todo}を削除するのか？</h3>
        <Group position="right" mt="md">
          <Button
            color="red"
            onClick={() => {
              handleDelete(id), setOpened(false);
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
