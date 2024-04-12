import { useUniqueLastMeasure } from "@/hooks/measurements";
import { appUrls } from "@/lib/appUrls";
import { User } from "@/types/user";
import { parseDate } from "@/utils/utils";
import { Group, Stack, Title, Text, Button, Divider } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

const UserOverviewHeader = ({
  user,
  sessionUser,
}: {
  user: User;
  sessionUser: User;
}) => {
  const { push } = useRouter();

  const { lastMeasure } = useUniqueLastMeasure(user._id);

  return (
    <Stack gap={0}>
      <Group justify="space-between" mih={120} py={32}>
        <Title order={1} size={32} c="gray.0">
          {user.fullname}
        </Title>
        <Group>
          {lastMeasure?.date ? (
            <Text size="sm" c="gray.5">
              La última medición fue realizada el {parseDate(lastMeasure.date)}
            </Text>
          ) : (
            <Text size="sm" c="gray.5">
              Sin mediciones a la fecha del dia de hoy
            </Text>
          )}
          {sessionUser.role === "administrator" && (
            <Button
              c="black"
              leftSection={<IconPlus />}
              onClick={() =>
                push(`${appUrls.measurements.new}?userId=${user._id}`)
              }
            >
              Nueva Medición
            </Button>
          )}
        </Group>
      </Group>
      <Divider size="sm" />
    </Stack>
  );
};

export default UserOverviewHeader;
