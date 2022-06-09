import { Button, Group, Modal } from "@mantine/core";
import React from "react";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DeleteModal: React.FC<Props> = ({ opened, setOpened }) => {
  return (
    <div>
      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Group position="right" mt="md">
          <Button
            color="red"
            onClick={() => {
              setOpened(false);
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
