import { useUniqueLastMeasure } from "@/hooks/measurements";
import { appUrls } from "@/lib/appUrls";
import { User } from "@/types/user";
import { parseDate } from "@/utils/utils";
import {
  Group,
  Stack,
  Title,
  Text,
  Button,
  Divider,
  em,
  ActionIcon,
  Box,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

const UserOverviewHeader = ({
  user,
  sessionUser,
}: {
  user: User;
  sessionUser: User;
}) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(800)})`);

  const { push } = useRouter();

  const { lastMeasure } = useUniqueLastMeasure(user._id);

  return (
    <Stack gap={0}>
      <Box mih={120} py={32}>
        {isMobileMD ? (
          <Stack>
            <Group align="center" justify="space-between" gap={8}>
              <Title order={1} size={32} c="gray.0">
                {user.fullname}
              </Title>
              {isMobileSM ? (
                <ActionIcon
                  variant="filled"
                  aria-label="Nueva Medida"
                  size="lg"
                >
                  <IconPlus
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              ) : (
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
            <MeasureLegend lastMeasure={lastMeasure} />
          </Stack>
        ) : (
          <Group flex="1 0 0">
            <Title order={1} size={32} c="gray.0" mr="auto">
              {user.fullname}
            </Title>
            <Group>
              <MeasureLegend lastMeasure={lastMeasure} />
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
        )}
      </Box>
      <Divider size="sm" />
    </Stack>
  );
};

const MeasureLegend = ({ lastMeasure }: { lastMeasure: any }) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <>
      {lastMeasure?.date ? (
        <Text size="sm" c="gray.5" ta={isMobileSM ? "left" : "right"}>
          La última medición fue realizada el {parseDate(lastMeasure.date)}
        </Text>
      ) : (
        <Text size="sm" c="gray.5">
          Sin mediciones a la fecha del dia de hoy
        </Text>
      )}
    </>
  );
};

export default UserOverviewHeader;
