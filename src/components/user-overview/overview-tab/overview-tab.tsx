import { BodyModel } from "@/components/ui/body-model/body-model";
import { Group, ScrollArea, SegmentedControl, Stack } from "@mantine/core";
import { useState } from "react";
import { useElementSize } from "@mantine/hooks";
import { User, UserType } from "@/types/user";
import { useUniqueLastMeasure } from "@/hooks/measurements";
import { BodySectionOverview } from "./body-section-overview";
import { BodySectionTorso } from "./body-section-torso";
import { BodySectionArms } from "./body-section-arms";
import { BodySectionLegs } from "./body-section-legs";
import { OverviewTabSkeleton } from "./overview-tab-skeleton";

interface OverviewTabProps {
  user: User;
}

const OverviewTab = ({ user }: OverviewTabProps) => {
  const { lastMeasure, isLoading } = useUniqueLastMeasure(user._id);
  const { ref, height } = useElementSize();
  const [selectedBodySection, setSelectedBodySection] =
    useState<string>("overview");
  const onSectionSelect = (section: string) => setSelectedBodySection(section);

  if (isLoading) return <OverviewTabSkeleton />;
  return (
    <Group gap={0} grow align="stretch">
      <Stack ref={ref} style={{ flexGrow: 1 }}>
        <BodyModel gender={user.gender} onSectionSelect={onSectionSelect} />
      </Stack>
      <Stack gap={32} py={32}>
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
        {/* Height = ref stack heigh - vertical padding - segmented control - gap */}
        <ScrollArea style={{ flexGrow: 1 }} h={`${height - 64 - 40 - 32}px`}>
          {selectedBodySection === "overview" && (
            <BodySectionOverview
              lastMeasure={lastMeasure}
              targetMeasure={user.target}
            />
          )}
          {selectedBodySection === "torso" && (
            <BodySectionTorso lastMeasure={lastMeasure} />
          )}
          {selectedBodySection === "arms" && (
            <BodySectionArms lastMeasure={lastMeasure} />
          )}
          {selectedBodySection === "legs" && (
            <BodySectionLegs lastMeasure={lastMeasure} />
          )}
        </ScrollArea>
      </Stack>
    </Group>
  );
};

export default OverviewTab;
