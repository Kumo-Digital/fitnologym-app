import WelcomeImage from "@/assets/images/tatin.png";
import {
  Blockquote,
  Box,
  Button,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import NextImage from "next/image";

const WelcomeModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const icon = <IconInfoCircle />;

  return (
    <>
      <Modal opened={opened} onClose={close} size="lg">
        <Box style={{ textAlign: "center" }} m={20}>
          <Title order={1}>Bienvenido a Fitnologym !</Title>
        </Box>

        <Stack>
          <Group grow>
            <Group>
              <Text>
                <span
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Fitnologym
                  <sup>®</sup>{" "}
                </span>
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
                cite="– Roberto Diego Hardie "
                icon={icon}
                mt="md"
              >
                "La salud es lo más importante que tenemos, cuídala y mantenla."
              </Blockquote>
            </Group>

            <Image
              radius="md"
              w="auto"
              h={500}
              component={NextImage}
              src={WelcomeImage}
              alt="Welcome Image"
            />
          </Group>
        </Stack>
        <Group justify="center" m={50} grow>
          <Button variant="filled" c="black" onClick={close}>
            <Text fw="600" size="xl">
              Empieza Ahora
            </Text>
          </Button>
        </Group>
      </Modal>

      <Button onClick={open} size="sm" variant="filled" c="black">
        Agregar
      </Button>
    </>
  );
};

export default WelcomeModal;
