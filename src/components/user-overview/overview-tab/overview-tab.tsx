import { BodyModel } from "@/components/ui/body-model/body-model";
import {
  Box,
  Flex,
  ScrollArea,
  SegmentedControl,
  Stack,
  em,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  useCalculateEvolution,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { BodySectionOverview } from "./body-section-overview";
import { BodySectionTorso } from "./body-section-torso";
import { BodySectionArms } from "./body-section-arms";
import { BodySectionLegs } from "./body-section-legs";
import { OverviewTabSkeleton } from "./overview-tab-skeleton";
import OverviewTabEmpty from "./overview-tab-empty";
import { User } from "@/types/user";
import BodyBalance from "./body-balance";
import { getBalancePercentage } from "@/utils/measurement";

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

  const [selectedBodySection, setSelectedBodySection] =
    useState<string>("overview");

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
  if (isLoading || isLoadingEvolution) return <OverviewTabSkeleton />;
  return (
    <Flex
      gap={0}
      direction={isMobileMD ? "column" : "row"}
      align={isMobileMD ? "stretch" : "flex-start"}
      flex={"1 0 0"}
    >
      <Stack flex={"1 0 0"}>
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
              evolution={evolution}
              targetMeasure={user.targets}
            />
          )}
          {selectedBodySection === "torso" && (
            <BodySectionTorso lastMeasure={lastMeasure} evolution={evolution} />
          )}
          {selectedBodySection === "arms" && (
            <BodySectionArms lastMeasure={lastMeasure} evolution={evolution} />
          )}
          {selectedBodySection === "legs" && (
            <BodySectionLegs lastMeasure={lastMeasure} evolution={evolution} />
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
