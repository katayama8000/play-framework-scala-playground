import { showNotification } from "@mantine/notifications";

export const makeNotification = (
  title: string,
  message: string,
  color: string
) => {
  showNotification({
    title: title,
    message: message,
    color: color,
  });
};
