import { BodyModel } from "@/components/ui/body-model/body-model";
import FFMIBalance from "@/components/ui/ffmi-balance";
import {
  useCalculateEvolution,
  useCalculateEvolutionFromFirstToLast,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { useUniqueReports } from "@/hooks/reports";
import { Evolution } from "@/types/measurements";
import { User } from "@/types/user";
import { FFMI_STATUS_VALUES_COLORS } from "@/utils/admin";
import { FFMIStatus, getBalancePercentage } from "@/utils/measurement";
import {
  Badge,
  Blockquote,
  em,
  Flex,
  Group,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMan } from "@tabler/icons-react";
import { useState } from "react";
import BodyBalance from "./body-balance";
import { BodySectionArms } from "./body-section-arms";
import { BodySectionLegs } from "./body-section-legs";
import { BodySectionOverview } from "./body-section-overview";
import { BodySectionTorso } from "./body-section-torso";
import OverviewTabEmpty from "./overview-tab-empty";
import { OverviewTabSkeleton } from "./overview-tab-skeleton";

interface OverviewTabProps {
  user: User;
}

const OverviewTab = ({ user }: OverviewTabProps) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const { lastMeasure, isLoading } = useUniqueLastMeasure(user._id);
  const { evolution, isLoading: isLoadingEvolution } = useCalculateEvolution(
    user._id
  );
  const {
    evolutionFromFirstToLast,
    isLoading: isLoadingEvolutionFromFirstToLast,
  } = useCalculateEvolutionFromFirstToLast(user._id);
  const icon = <IconMan />;

  const measurementPhysic = useUniqueLastMeasure(user._id);

  const { reports, isLoading: isLoadingReports } = useUniqueReports(
    user._id,
    user.fullname
  );

  const showSwitch = reports?.length > 2 ? true : false;

  const getRatingStatusByColor = (color: string) => {
    const index = FFMI_STATUS_VALUES_COLORS.findIndex(
      (item) => item.color === color
    );
    if (index !== -1) {
      return FFMI_STATUS_VALUES_COLORS[index]?.label || "Desconocido";
    }
    return "Desconocido";
  };

  const getScoreStatusColor = (): string => {
    const rating_status =
      measurementPhysic.lastMeasure?.metrics.ffmi?.measure_status;

    if (rating_status === undefined) {
      return "Desconocido";
    }

    // Se convierte rating_status a un valor del enumerado FFMIStatus si es necesario
    const statusEnum = FFMIStatus[rating_status as keyof typeof FFMIStatus];

    // Buscar el color con el valor del enumerado
    const measureRatingColor = FFMI_STATUS_VALUES_COLORS.find(
      (item) => item.label === statusEnum
    )?.color;

    if (!measureRatingColor) {
      return "Desconocido";
    }

    return measureRatingColor;
  };

  const [selectedBodySection, setSelectedBodySection] =
    useState<string>("overview");

  const [selectedEvolution, setSelectedEvolution] =
    useState<Evolution>(evolution);

  const [isCheckedEvolution, setIsCheckedEvolution] = useState<boolean>(false);

  const handleToggle = () => {
    setIsCheckedEvolution((prevState) => {
      const newState = !prevState;
      setSelectedEvolution(newState ? evolutionFromFirstToLast : evolution);
      return newState;
    });
  };

  const onSectionSelect = (section: string) => setSelectedBodySection(section);

  const armsBodyFatBalance = getBalancePercentage(
    lastMeasure?.metrics.left_arm?.body_fat?.measure_value,
    lastMeasure?.metrics.right_arm?.body_fat?.measure_value
  );

  const armsMuscleMassBalance = getBalancePercentage(
    lastMeasure?.metrics.left_arm?.muscle_mass?.measure_value,
    lastMeasure?.metrics.right_arm?.muscle_mass?.measure_value
  );

  const legsBodyFatBalance = getBalancePercentage(
    lastMeasure?.metrics.left_leg?.body_fat?.measure_value,
    lastMeasure?.metrics.right_leg?.body_fat?.measure_value
  );

  const legsMuscleMassBalance = getBalancePercentage(
    lastMeasure?.metrics.left_leg?.muscle_mass?.measure_value,
    lastMeasure?.metrics.right_leg?.muscle_mass?.measure_value
  );

  if (!lastMeasure) return <OverviewTabEmpty />;
  if (
    isLoading ||
    isLoadingEvolution ||
    isLoadingEvolutionFromFirstToLast ||
    isLoadingReports
  )
    return <OverviewTabSkeleton />;
  return (
    <Flex
      gap={0}
      direction={isMobileMD ? "column" : "row"}
      align={isMobileMD ? "stretch" : "flex-start"}
      flex={"1 0 0"}
    >
      <Stack flex={"1 0 0"}>
        {measurementPhysic.lastMeasure && (
          <Blockquote
            w={isMobileSM ? "auto" : "60%"}
            h={isMobileSM ? "auto" : "50%"}
            color={getScoreStatusColor()}
            icon={icon}
            mt="sm"
            radius="xl"
          >
            <Group align="center">
              <Text size={isMobileSM ? "md" : "lg"}>Score Físico</Text>
              <Badge autoContrast size="xl" color={getScoreStatusColor()}>
                {getRatingStatusByColor(getScoreStatusColor())}
              </Badge>
            </Group>
          </Blockquote>
        )}
        <BodyModel gender={user.gender} onSectionSelect={onSectionSelect} />
        {!isMobileSM && (
          <Stack p={16}>
            <FFMIBalance
              label="Indice de Masa Libre de Grasa (FFMI)"
              description="El Indice de Masa Libre de Grasa es una medida que indica la cantidad de masa corporal compuesta por músculos, huesos, agua y otros tejidos magros, excluyendo la grasa."
              value={
                measurementPhysic?.lastMeasure?.metrics?.ffmi?.measure_value ??
                14
              }
            />
          </Stack>
        )}
      </Stack>
      <Stack gap={32} py={32} flex={"1 0 0"}>
        <SegmentedControl
          data={[
            { label: "Generales", value: "overview" },
            { label: "Torso", value: "torso" },
            { label: "Brazos", value: "arms" },
            { label: "Piernas", value: "legs" },
          ]}
          defaultValue="overview"
          value={selectedBodySection}
          onChange={setSelectedBodySection}
        />
        {/* Height = 448px is the sum of all the fixed height elements */}
        <ScrollArea.Autosize>
          {selectedBodySection === "overview" && (
            <BodySectionOverview
              lastMeasure={lastMeasure}
              evolution={selectedEvolution}
              targetMeasure={user.targets}
              isEvolutionFromFirstToLast={
                selectedEvolution === evolutionFromFirstToLast
              }
              handleToggle={handleToggle}
              showSwitch={showSwitch}
            />
          )}
          {selectedBodySection === "torso" && (
            <BodySectionTorso
              lastMeasure={lastMeasure}
              evolution={selectedEvolution}
              isEvolutionFromFirstToLast={
                selectedEvolution === evolutionFromFirstToLast
              }
              handleToggle={handleToggle}
              showSwitch={showSwitch}
            />
          )}
          {selectedBodySection === "arms" && (
            <BodySectionArms
              lastMeasure={lastMeasure}
              evolution={selectedEvolution}
              isEvolutionFromFirstToLast={
                selectedEvolution === evolutionFromFirstToLast
              }
              handleToggle={handleToggle}
              showSwitch={showSwitch}
            />
          )}
          {selectedBodySection === "legs" && (
            <BodySectionLegs
              lastMeasure={lastMeasure}
              evolution={selectedEvolution}
              isEvolutionFromFirstToLast={
                selectedEvolution === evolutionFromFirstToLast
              }
              handleToggle={handleToggle}
              showSwitch={showSwitch}
            />
          )}
          <Stack gap={16} mt={16}>
            <Title order={4}>Balance Corporal</Title>
            {isMobileSM && (
              <FFMIBalance
                label="Indice de Masa Libre de Grasa (FFMI)"
                description="El Indice de Masa Libre de Grasa es una medida que indica la cantidad de masa corporal compuesta por músculos, huesos, agua y otros tejidos magros, excluyendo la grasa."
                value={
                  measurementPhysic?.lastMeasure?.metrics?.ffmi
                    ?.measure_value ?? 14
                }
              />
            )}

            <BodyBalance
              ffmiValue={
                measurementPhysic?.lastMeasure?.metrics?.ffmi?.measure_value ??
                14
              }
              bodyFat={{
                armsValue: armsBodyFatBalance,
                legsValue: legsBodyFatBalance,
              }}
              muscleMass={{
                armsValue: armsMuscleMassBalance,
                legsValue: legsMuscleMassBalance,
              }}
            />
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </Flex>
  );
};

export default OverviewTab;
