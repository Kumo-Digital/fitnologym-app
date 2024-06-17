import { BodyModel } from "@/components/ui/body-model/body-model";
import { Flex, ScrollArea, SegmentedControl, Stack, Switch, em } from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  useCalculateEvolution,
  useCalculateEvolutionFromFirstToLast,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { BodySectionOverview } from "./body-section-overview";
import { BodySectionTorso } from "./body-section-torso";
import { BodySectionArms } from "./body-section-arms";
import { BodySectionLegs } from "./body-section-legs";
import { OverviewTabSkeleton } from "./overview-tab-skeleton";
import OverviewTabEmpty from "./overview-tab-empty";
import { User } from "@/types/user";
import { Evolution } from "@/types/measurements";

interface OverviewTabProps {
  user: User;
}

const OverviewTab = ({ user }: OverviewTabProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const { lastMeasure, isLoading } = useUniqueLastMeasure(user._id);
  const { evolution, isLoading: isLoadingEvolution } = useCalculateEvolution(
    user._id
  );
  const { evolutionFromFirstToLast, isLoading: isLoadingEvolutionFromFirstToLast } = useCalculateEvolutionFromFirstToLast(
    user._id
  );

  const [selectedBodySection, setSelectedBodySection] =
    useState<string>("overview");

  const [selectedEvolution, setSelectedEvolution] =
    useState<Evolution>(evolution);

    const handleToggle = (checked: boolean) => {
      setSelectedEvolution(checked ? evolutionFromFirstToLast : evolution);
    };

  const onSectionSelect = (section: string) => setSelectedBodySection(section);

  if (!lastMeasure) return <OverviewTabEmpty />;
  if (isLoading || isLoadingEvolution || isLoadingEvolutionFromFirstToLast) return <OverviewTabSkeleton />;
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
        <Switch
          size="md"
          checked={selectedEvolution === evolutionFromFirstToLast} 
          onChange={(event) => handleToggle(event.currentTarget.checked)} 
          onLabel="FFTL" 
          offLabel="STL" 
        />
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
              evolution={selectedEvolution}
              targetMeasure={user.targets}
              isEvolutionFromFirstToLast={selectedEvolution === evolutionFromFirstToLast}
            />
          )}
          {selectedBodySection === "torso" && (
            <BodySectionTorso 
              lastMeasure={lastMeasure} 
              evolution={selectedEvolution}
              isEvolutionFromFirstToLast={selectedEvolution === evolutionFromFirstToLast} 
            />
          )}
          {selectedBodySection === "arms" && (
            <BodySectionArms
              lastMeasure={lastMeasure} 
              evolution={selectedEvolution}
              isEvolutionFromFirstToLast={selectedEvolution === evolutionFromFirstToLast} 
            />
          )}
          {selectedBodySection === "legs" && (
            <BodySectionLegs
              lastMeasure={lastMeasure}
              evolution={selectedEvolution}
              isEvolutionFromFirstToLast={selectedEvolution === evolutionFromFirstToLast} 
            />
          )}
        </ScrollArea.Autosize>
      </Stack>
    </Flex>
  );
};

export default OverviewTab;
