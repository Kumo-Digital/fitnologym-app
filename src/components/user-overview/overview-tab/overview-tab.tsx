import { BodyModel } from "@/components/ui/body-model/body-model";
import {
  useCalculateEvolution,
  useCalculateEvolutionFromFirstToLast,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { User } from "@/types/user";
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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMan } from "@tabler/icons-react";
import { useState } from "react";
import { BodySectionArms } from "./body-section-arms";
import { BodySectionLegs } from "./body-section-legs";
import { BodySectionOverview } from "./body-section-overview";
import { BodySectionTorso } from "./body-section-torso";
import OverviewTabEmpty from "./overview-tab-empty";
import { OverviewTabSkeleton } from "./overview-tab-skeleton";
import {
  PHISYQUE_RATING_STATUS_COLORS,
  PHISYQUE_RATING_STATUS_VALUES,
} from "@/utils/admin";
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
  const {
    evolutionFromFirstToLast,
    isLoading: isLoadingEvolutionFromFirstToLast,
  } = useCalculateEvolutionFromFirstToLast(user._id);
  const icon = <IconMan />;

  const measurementPhysic = useUniqueLastMeasure(user._id);

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

  if (!lastMeasure) return <OverviewTabEmpty />;
  if (isLoading || isLoadingEvolution || isLoadingEvolutionFromFirstToLast)
    return <OverviewTabSkeleton />;
  return (
    <Flex
      gap={0}
      direction={isMobile ? "column" : "row"}
      align={isMobile ? "stretch" : "flex-start"}
      flex={"1 0 0"}
    >
      <Stack flex={"1 0 0"}>
        {measurementPhysic.lastMeasure && (
          <Blockquote
            w={isMobile ? "auto" : "50%"}
            h={isMobile ? "auto" : "50%"}
            color={getRatingStatusColor()}
            icon={icon}
            mt="sm"
            radius="xl"
          >
            <Group align="center">
              <Text size={isMobile ? "md" : "lg"}>Rating Físico</Text>
              <Badge autoContrast size="xl" color={getRatingStatusColor()}>
                {getRatingStatusByColor(getRatingStatusColor())}
              </Badge>
            </Group>
          </Blockquote>
        )}
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
              evolution={selectedEvolution}
              targetMeasure={user.targets}
              isEvolutionFromFirstToLast={
                selectedEvolution === evolutionFromFirstToLast
              }
              handleToggle={handleToggle}
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
            />
          )}
        </ScrollArea.Autosize>
      </Stack>
    </Flex>
  );
};

export default OverviewTab;
