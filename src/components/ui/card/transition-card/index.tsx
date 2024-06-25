import { Carousel } from "@mantine/carousel";
import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef } from "react";
import { FfmiTargetMeasureCard } from "../ffmi-target-measure-card";
import { TargetMeasureCard } from "../target-measure-card";

interface TransitionCardProps {
  currentValue: any;
  targetValue: any;
  ffmiCurrentValue: any;
  ffmiTargetValue: any;
}

const TransitionCard: React.FC<TransitionCardProps> = ({
  currentValue,
  targetValue,
  ffmiCurrentValue,
  ffmiTargetValue,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[autoplay.current]}
      withControls={false}
      align={isMobile ? "center" : "start"}
      w={isMobile ? "calc(100vw - 32px)" : "100%"}
      slideGap="md"
      includeGapInSize={false}
    >
      <Carousel.Slide>
        <TargetMeasureCard
          currentValue={currentValue}
          targetValue={targetValue}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <FfmiTargetMeasureCard
          ffmiCurrentValue={ffmiCurrentValue}
          ffmiTargetValue={ffmiTargetValue}
        />
      </Carousel.Slide>
    </Carousel>
  );
};

export default TransitionCard;
