import { Stack, Title, Text, useMantineTheme, Button } from "@mantine/core";

type EmptyAction = {
  label: string;
  handle: () => void;
};
interface EmptyProps {
  title: string;
  description: string;
  action?: EmptyAction;
}

const Empty = ({ title, description, action }: EmptyProps) => {
  const theme = useMantineTheme();
  return (
    <Stack
      justify="center"
      align="center"
      gap={48}
      h="100%"
      flex={"1 0 0"}
      p={32}
      style={{ border: `2px dashed ${theme.colors.gray[7]}`, borderRadius: 12 }}
    >
      <Stack gap={8} justify="center" align="center">
        <Title order={1} c="gray.5" ta="center">
          {title}
        </Title>
        <Text c="gray.0" maw={500} ta="center">
          {description}
        </Text>
      </Stack>
      {action && (
        <Button c="black" onClick={() => action.handle}>
          {action.label}
        </Button>
      )}
    </Stack>
  );
};

export default Empty;
