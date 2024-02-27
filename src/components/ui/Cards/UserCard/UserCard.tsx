import React from "react";
import { Card, Flex, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

interface UserCardProps {
  title: string;
  subtitle: string;
  description: string;
  cardStyle?: React.CSSProperties;
  color?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  title,
  subtitle,
  description,
  cardStyle,
}) => {
  return (
    <Card
      bg="dark.7"
      padding={12}
      radius="md"
      withBorder
      style={{
        display: "flex",
        ...cardStyle,
        justifyContent: "space-between",
        borderColor: "gray.7",
      }}
    >
      <Flex gap="md" style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Flex gap="md" justify="space-between" style={{ marginLeft: 10 }}>
            <Flex direction="column" gap="md">
              <Flex direction="column">
                <span
                  style={{
                    fontSize: "text.md",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    fontSize: "text.sm",
                    color: "gray.5",
                  }}
                >
                  {subtitle}
                </span>
              </Flex>
              <div>
                <span
                  style={{
                    fontSize: "text.xs",
                    color: "gray.5",
                  }}
                >
                  {description}
                </span>
              </div>
            </Flex>

            <ActionIcon title="Options" variant="transparent">
              <IconDotsVertical
                color="#c9c9c9"
                aria-label="Options"
                size="md"
              />
            </ActionIcon>
          </Flex>
        </div>
      </Flex>
    </Card>
  );
};
