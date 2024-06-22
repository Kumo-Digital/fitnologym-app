import { Carousel } from "@mantine/carousel";
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
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <Carousel
      plugins={[autoplay.current]}
      withControls={false}
      slideGap="md"
      h="100%"
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
