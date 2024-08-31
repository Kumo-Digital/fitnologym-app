import { Carousel } from "@mantine/carousel";
import { em, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef } from "react";
import { CombinedMeasureCard } from "../combined-measure-card";
import { FatCard } from "../fat-card/fat-card";
import { TargetMeasureCard } from "../target-measure-card";

interface TransitionCardProps {
  currentValue: any;
  targetValue: any;
  ffmiCurrentValue: any;
  ffmiTargetValue: any;
  forceRatingCurrentValue: any;
  forceRatingValue: any;
  bodyFatvalue: any;
  weightValue: any;
  fatFreeMass: any;
}

const TransitionCard: React.FC<TransitionCardProps> = ({
  currentValue,
  targetValue,
  ffmiCurrentValue,
  ffmiTargetValue,
  forceRatingCurrentValue,
  forceRatingValue,
  bodyFatvalue,
  weightValue,
  fatFreeMass,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

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
        {!isMobile ? (
          <Stack>
            <TargetMeasureCard
              currentValue={currentValue}
              targetValue={targetValue}
            />
            <FatCard
              bodyFatPercentage={bodyFatvalue}
              weight={weightValue}
              fatFreeMass={fatFreeMass}
            />
          </Stack>
        ) : (
          <TargetMeasureCard
            currentValue={currentValue}
            targetValue={targetValue}
          />
        )}
      </Carousel.Slide>
      {/*    <Carousel.Slide>
        <FfmiTargetMeasureCard
          ffmiCurrentValue={ffmiCurrentValue}
          ffmiTargetValue={ffmiTargetValue}
        />
      </Carousel.Slide> */}
      <Carousel.Slide>
        <CombinedMeasureCard
          ffmiCurrentValue={ffmiCurrentValue ?? 0}
          ffmiTargetValue={ffmiTargetValue ?? 0}
          forceRatingCurrentValue={forceRatingCurrentValue ?? 0}
          forceRatingValue={forceRatingValue ?? 0}
        />
      </Carousel.Slide>{" "}
      {isMobile && (
        <Carousel.Slide>
          <FatCard
            bodyFatPercentage={bodyFatvalue}
            weight={weightValue}
            fatFreeMass={fatFreeMass}
          />
        </Carousel.Slide>
      )}
    </Carousel>
  );
};

export default TransitionCard;
