import {
  Box,
  Group,
  SegmentedControl,
  Stack,
  Tabs,
  Text,
  Image,
  Badge,
  Title,
  Button,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { useState } from "react";
import NextImage from "next/image";
import { MeasureCard } from "../ui/card/measure-card/measure-card";
import { IconPlus } from "@tabler/icons-react";

export default function Overview() {
  const [selectedSegment, setSelectedSegment] = useState("Generales");

  const handleSegmentChange = (value: any) => {
    setSelectedSegment(value);
  };

  return (
    <Tabs defaultValue="Overview" style={{ borderColor: "#66A80F" }}>
      <Tabs.List>
        <Tabs.Tab value="Overview">Overview</Tabs.Tab>
        <Tabs.Tab value="Análisis">Análisis</Tabs.Tab>
        <Tabs.Tab value="Diagnóstico">Diagnóstico</Tabs.Tab>
        <Tabs.Tab value="Mi rutina" disabled>
          <Group align="center" gap={8}>
            <Text>Mi Rutina </Text>
            <Badge variant="outline" c="lime" style={{ borderColor: "lime" }}>
              PLUS
            </Badge>
          </Group>
        </Tabs.Tab>
        <Tabs.Tab value="Plan Nutricional" disabled>
          <Group align="center" gap={8}>
            <Text>Plan Nutricional </Text>
            <Badge variant="outline" c="lime" style={{ borderColor: "lime" }}>
              PREMIUM
            </Badge>
          </Group>
        </Tabs.Tab>
      </Tabs.List>

      <Stack gap={40} mt={40} mb={40}>
        <Group justify="space-between">
          <Title order={1}>JohnDoe</Title>
          <Group>
            <Box>
              <Text>
                La última medición fue realizada{" "}
                <Text c="lime" span={true}>
                  Hoy
                </Text>
              </Text>
            </Box>
            <Box>
              <Button c="black" leftSection={<IconPlus />} bg="lime">
                Nueva Medición
              </Button>
            </Box>
          </Group>
        </Group>
      </Stack>
      <Divider size="sm" />
      <Tabs.Panel value="Overview" pt="sm">
        <Group grow align="stretch" gap={16}>
          <Box h="auto">
            <Text>Panel3</Text>
            <Image radius="md" component={NextImage} alt="Welcome Image" />
          </Box>
          <Box h="100vh">
            <Stack align="stretch">
              <SegmentedControl
                data={[
                  { label: "Generales", value: "Generales" },
                  { label: "Torso", value: "Torso" },
                  { label: "Piernas", value: "Piernas" },
                  { label: "Brazos", value: "Brazos" },
                ]}
                defaultValue="Generales"
                value={selectedSegment}
                onChange={handleSegmentChange}
              />

              <Box>
                {selectedSegment === "Generales" && (
                  <ScrollArea h="760px" type="auto">
                    <Stack>
                      <Title order={4}>Generales</Title>

                      <Box>
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                      </Box>

                      <Group grow>
                        <Stack>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>
                        <Stack>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>
                      </Group>
                    </Stack>
                  </ScrollArea>
                )}
                {selectedSegment === "Torso" && (
                  <ScrollArea h="760px" type="auto">
                    <Stack>
                      <Group justify="space-between">
                        <Stack gap={16}>
                          <Title order={4}>Pierna Izquierda</Title>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>

                        <Stack gap={16}>
                          <Title order={4}>Pierna Derecha</Title>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>
                      </Group>
                      <Stack gap={16}>
                        <Title order={4}>Circunferencias</Title>
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                      </Stack>
                    </Stack>
                  </ScrollArea>
                )}
                {selectedSegment === "Piernas" && (
                  <ScrollArea h="760px" type="auto">
                    <Stack>
                      <Group justify="space-between">
                        <Stack gap={16}>
                          <Title order={4}>Pierna Izquierda</Title>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={-2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>

                        <Stack gap={16}>
                          <Title order={4}>Pierna Derecha</Title>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>
                      </Group>
                      <Stack gap={16}>
                        <Title order={4}>Circunferencias</Title>
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                      </Stack>
                    </Stack>
                  </ScrollArea>
                )}
                {selectedSegment === "Brazos" && (
                  <ScrollArea h="760px" type="auto">
                    <Stack>
                      <Group justify="space-between">
                        <Stack gap={16}>
                          <Title order={4}>Brazo Izquierdo</Title>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>

                        <Stack gap={16}>
                          <Title order={4}>Brazo Derecho</Title>
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                          <MeasureCard
                            percent={10}
                            color="orange.6"
                            measureTitle="Indice de Masa Corporal"
                            measure={23.5}
                            measureType="BMI"
                            percentTitle="Evolución"
                            percentText={2.3}
                          />
                        </Stack>
                      </Group>
                      <Stack gap={16}>
                        <Title order={4}>Circunferencias</Title>
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                        <MeasureCard
                          percent={10}
                          color="orange.6"
                          measureTitle="Indice de Masa Corporal"
                          measure={23.5}
                          measureType="BMI"
                          percentTitle="Evolución"
                          percentText={2.3}
                        />
                      </Stack>
                    </Stack>
                  </ScrollArea>
                )}
              </Box>
            </Stack>
          </Box>
        </Group>
      </Tabs.Panel>

      <Tabs.Panel value="Análisis" pt="xs">
        <Group grow>
          <Box>
            <Text>Panel2</Text>
            <Image radius="md" component={NextImage} alt="Welcome Image" />
          </Box>
        </Group>
      </Tabs.Panel>

      <Tabs.Panel value="Diagnóstico" pt="xs">
        <Group grow>
          <Box>
            <Text>Panel3</Text>
            <Image radius="md" component={NextImage} alt="Welcome Image" />
          </Box>
          <Box h="100vh">
            <Stack>
              <SegmentedControl
                data={[
                  { label: "Generales", value: "Generales" },
                  { label: "Torso", value: "Torso" },
                  { label: "Piernas", value: "Piernas" },
                  { label: "Brazos", value: "Brazos" },
                ]}
                value={selectedSegment}
                onChange={handleSegmentChange}
              />

              <Box mt="xs">
                {selectedSegment === "Generales" && (
                  <Box>Generales tab content</Box>
                )}
                {selectedSegment === "Torso" && <Box>Torso tab content</Box>}
                {selectedSegment === "Piernas" && (
                  <Box>Piernas tab content</Box>
                )}
                {selectedSegment === "Brazos" && <Box>Brazos tab content</Box>}
              </Box>
            </Stack>
          </Box>
        </Group>
      </Tabs.Panel>

      <Tabs.Panel value="Mi rutina" pt="xs">
        <Group grow>
          <Box>
            <Text>Panel4</Text>
            <Image radius="md" component={NextImage} alt="Welcome Image" />
          </Box>
          Settings tab content
        </Group>
      </Tabs.Panel>

      <Tabs.Panel value="Plan Nutricional" pt="xs">
        <Group grow>
          <Box>
            <Text>Panel5</Text>
            <Image radius="md" component={NextImage} alt="Welcome Image" />
          </Box>
          Settings tab content
        </Group>
      </Tabs.Panel>
    </Tabs>
  );
}
