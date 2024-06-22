import { BodyModel } from "@/components/ui/body-model/body-model";
import {
  useCalculateEvolution,
  useCalculateEvolutionFromFirstToLast,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import {
  Badge,
  Blockquote,
  Box,
  em,
  Flex,
  Group,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMan } from "@tabler/icons-react";
import { useState } from "react";
import { BodySectionArms } from "./body-section-arms";
import { BodySectionLegs } from "./body-section-legs";
import { BodySectionOverview } from "./body-section-overview";
import { BodySectionTorso } from "./body-section-torso";
import { OverviewTabSkeleton } from "./overview-tab-skeleton";
import OverviewTabEmpty from "./overview-tab-empty";
import { User } from "@/types/user";
import {
  PHISYQUE_RATING_STATUS_COLORS,
  PHISYQUE_RATING_STATUS_VALUES,
} from "@/utils/admin";
import { Evolution } from "@/types/measurements";
import { getBalancePercentage } from "@/utils/measurement";
import BodyBalance from "./body-balance";
import { useUniqueReports } from "@/hooks/reports";

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

  const { reports, isLoading: isLoadingReports } = useUniqueReports(user._id, user.fullname);

  const showSwitch = reports?.length > 2 ? true : false;

  const getRatingStatusByColor = (color: string) => {
    const index = PHISYQUE_RATING_STATUS_COLORS.indexOf(color);
    if (index !== -1) {
      return PHISYQUE_RATING_STATUS_VALUES[index]?.label || "Desconocido";
    }
    return "Desconocido";
  };

  const getRatingStatusColor = () => {
    const rating_status =
      measurementPhysic.lastMeasure?.metrics.physique_rating.measure_status;
    const measureRatingColor = PHISYQUE_RATING_STATUS_COLORS[rating_status - 1];
    return measureRatingColor;
  };

  const [selectedBodySection, setSelectedBodySection] =
    useState<string>("overview");

  const [selectedEvolution, setSelectedEvolution] =
    useState<Evolution>(evolution);

  const [isCheckedEvolution, setIsCheckedEvolution] = useState<boolean>(false);

  const handleToggle = () => {
    setIsCheckedEvolution(!isCheckedEvolution);
    setSelectedEvolution(
      isCheckedEvolution ? evolutionFromFirstToLast : evolution
    );
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
  if (isLoading || isLoadingEvolution || isLoadingEvolutionFromFirstToLast || isLoadingReports)
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
            w={isMobileSM ? "auto" : "50%"}
            h={isMobileSM ? "auto" : "50%"}
            color={getRatingStatusColor()}
            icon={icon}
            mt="sm"
            radius="xl"
          >
            <Group align="center">
              <Text size={isMobileSM ? "md" : "lg"}>Rating Físico</Text>
              <Badge autoContrast size="xl" color={getRatingStatusColor()}>
                {getRatingStatusByColor(getRatingStatusColor())}
              </Badge>
            </Group>
          </Blockquote>
        )}
        <BodyModel gender={user.gender} onSectionSelect={onSectionSelect} />
        {/* TODO: when the be is implemented, update this values */}
        {!isMobileSM && (
          <Box p={16}>
            <BodyBalance
              ffmiValue={14}
              bodyFat={{
                armsValue: armsBodyFatBalance,
                legsValue: legsBodyFatBalance,
              }}
              muscleMass={{
                armsValue: armsMuscleMassBalance,
                legsValue: legsMuscleMassBalance,
              }}
            />
          </Box>
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
          {isMobileSM && (
            <Box mt={16}>
              {/* TODO: when the be is implemented, update this values */}
              <BodyBalance
                ffmiValue={14}
                bodyFat={{
                  armsValue: armsBodyFatBalance,
                  legsValue: legsBodyFatBalance,
                }}
                muscleMass={{
                  armsValue: armsMuscleMassBalance,
                  legsValue: legsMuscleMassBalance,
                }}
              />
            </Box>
          )}
          {isMobileSM && (
            <Box mt={16}>
              {/* TODO: when the be is implemented, update this values */}
              <BodyBalance
                ffmiValue={14}
                bodyFat={{
                  armsValue: armsBodyFatBalance,
                  legsValue: legsBodyFatBalance,
                }}
                muscleMass={{
                  armsValue: armsMuscleMassBalance,
                  legsValue: legsMuscleMassBalance,
                }}
              />
            </Box>
          )}
        </ScrollArea.Autosize>
      </Stack>
    </Flex>
  );
};

export default OverviewTab;
