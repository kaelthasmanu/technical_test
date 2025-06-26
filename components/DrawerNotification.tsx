import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import useNotifications from "@/lib/hooks/useNotifications";
import { Alert } from "@heroui/alert";
import { DeleteIcon } from "./icons";
import { DrawerNotificationProps } from "@/types";

export default function DrawerNotification({
  isOpen,
  onOpenChange,
}: DrawerNotificationProps) {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Notifications
              </DrawerHeader>
              <DrawerBody>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="w-full flex items-center my-"
                  >
                    <Alert
                      color={notification.type}
                      className="!bg-neutral-800"
                      title={notification.message}
                      endContent={
                        <Button
                          isIconOnly
                          aria-label="delete notification"
                          radius="full"
                          color={notification.type}
                          variant="light"
                          onPress={() => removeNotification(notification.id)}
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                          <DeleteIcon size={16}/>
                        </Button>
                      }
                    />
                  </div>
                ))}
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
