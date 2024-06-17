import { BodyModel } from "@/components/ui/body-model/body-model";
import {
  useCalculateEvolution,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { User } from "@/types/user";
import { Flex, ScrollArea, SegmentedControl, Stack, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
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
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const { lastMeasure, isLoading } = useUniqueLastMeasure(user._id);
  const { evolution, isLoading: isLoadingEvolution } = useCalculateEvolution(
    user._id
  );

  const [selectedBodySection, setSelectedBodySection] =
    useState<string>("overview");

  const onSectionSelect = (section: string) => setSelectedBodySection(section);

  if (!lastMeasure) return <OverviewTabEmpty />;
  if (isLoading || isLoadingEvolution) return <OverviewTabSkeleton />;
  return (
    <Flex
      gap={0}
      direction={isMobile ? "column" : "row"}
      align={isMobile ? "stretch" : "flex-start"}
      flex={"1 0 0"}
    >
      <Stack flex={"1 0 0"}>
        <BodyModel gender={user.gender} onSectionSelect={onSectionSelect} />
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
        <ScrollArea.Autosize h={isMobile ? "auto" : `calc(100vh - 20vh)`}>
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
        </ScrollArea.Autosize>
      </Stack>
    </Flex>
  );
};

export default OverviewTab;
