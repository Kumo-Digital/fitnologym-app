import { userResources } from "@/utils/resources";
import {
  Button,
  Card,
  Flex,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  alpha,
  useMantineTheme,
} from "@mantine/core";
import { IconExternalLink, IconScaleOutline } from "@tabler/icons-react";
import Link from "next/link";

const ResourcesTab = () => {
  const theme = useMantineTheme();

  const getThemeColor = (cssVariable: string) => {
    const [color, shade] = cssVariable.split("-");
    return theme.colors[color][parseInt(shade)];
  };

  return (
    <Stack gap={24} mt={24}>
      <Skeleton height={32} />
      <SimpleGrid cols={3} spacing={24} verticalSpacing={24}>
        {userResources.map((resource) => {
          const Icon: any = resource.icon;

          return <Card withBorder key={resource.id}>
          <Stack style={{ flexGrow: 1 }}>
            <Group gap={8}>
              <Flex
                w={48}
                h={48}
                bg={alpha(`var(--mantine-color-${resource.color})`, 0.2)}
                justify="center"
                align="center"
                style={{ borderRadius: 8 }}
              >
                <Icon
                  size={32}
                  color={getThemeColor(resource.color)}
                />
              </Flex>
              <Text size="xl" fw={600} c="gray.0" maw={200} lh={1.3}>
                {resource.title}
              </Text>
            </Group>
            <Stack h="100%" style={{ flexGrow: 1 }}>
              {resource.description.map((line) => (
                <Text size="sm" c="gray.5">
                  {line}
                </Text>
              ))}
            </Stack>
            <Link
              href={resource.resource_link}
              target="_blank"
              rel="noreferrer"
              passHref
            >
              <Button
                c="black"
                fullWidth
                rightSection={<IconExternalLink size={14} />}
              >
                Abrir
              </Button>
            </Link>
          </Stack>
        </Card>
        })}
      </SimpleGrid>
    </Stack>
  );
};

export default ResourcesTab;
