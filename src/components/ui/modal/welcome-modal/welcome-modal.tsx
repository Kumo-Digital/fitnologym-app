import {
  Blockquote,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const WelcomeModal = ({ onLastLogin }: { onLastLogin: () => void}) => {
  const icon = <IconInfoCircle />;

  return (
    <Stack>
        <Box style={{ textAlign: "center" }} m={20}>
          <Title order={1}>Bienvenid@ a Fitnologym</Title>
        </Box>

        <Stack>
          <Group grow>
            <Group>
              <Text>
                <Text fw={600} span={true} size="lg">
                  Fitnologym<sup>®</sup>{" "}
                </Text>
                es una plataforma que te permite llevar un control de tus
                medidas y evolución, además de poder interactuar con tus rutinas
                de ejercicios y tener un diagnóstico preciso de tu estado de
                salud.
              </Text>
              <Text>
                Todas tus medidas y datos son privados y solo tu puedes verlos.
                No compartas tu cuenta con nadie.
              </Text>
              <Text>
                Si tienes alguna duda o necesitas ayuda, no dudes en
                contactarme. Estoy para ayudarte.
              </Text>

              <Blockquote
                color="lime"
                cite="– Roberto Diego Hardie"
                icon={icon}
                mt="md"
              >
                "La salud es lo más importante que tenemos, cuídala y mantenla."
              </Blockquote>
            </Group>
          </Group>
          <Group justify="center" m={50} grow>
            <Button variant="filled" c="black" onClick={onLastLogin}>
              <Text fw="600" size="xl">
                Empieza Ahora
              </Text>
            </Button>
          </Group>
        </Stack>
    </Stack>
  );
};

export default WelcomeModal;
