import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const Notifications = () => {
  return (
    <Button
      w={150}
      c="black"
      onClick={() => {
        notifications.show({
          // color: "red",
          title: "Notification Title",
          message: "Notification Message",
        });
      }}
    >
      Show Notificationd
    </Button>
  );
};

export default Notifications;
