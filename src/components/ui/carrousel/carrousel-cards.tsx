import { useUniqueLastMeasure } from "@/hooks/measurements";
import { User } from "@/types/user";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { MeasureCard } from "../card/measure-card/measure-card";

interface OverviewTabProps {
  user: User;
}

const CarouselCards = ({ user }: OverviewTabProps) => {
  const { lastMeasure } = useUniqueLastMeasure(user._id);
  const metrics = lastMeasure.metrics;

  const filteredMetrics = [
    "left_leg",
    "right_leg",
    "left_arm",
    "right_arm",
    "trunk",
    "circumferenceShoulders",
    "circumferenceArms",
    "circumferenceFlexedArms",
    "circumferenceQuads",
    "circumferenceCalf",
  ];

  const slides = Object.keys(metrics)
    .filter((metric) => !filteredMetrics.includes(metric))
    .map((metric) => ({
      metricName: metric,
      measureValue: metrics[metric].measure_value,
      measureUnit: metrics[metric].measure_uom,
      evolutionValue: metrics[metric].evolution,
      measureStatus: metrics[metric].measure_status,
    }));

  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="container m-10 mx-auto max-w-4xl">
      <Carousel
        loop
        withControls
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {slides.map((slide, index) => (
          <Carousel.Slide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            p={0}
            my={10}
          >
            <MeasureCard
              measureTitle={slide.metricName}
              measureValue={slide.measureValue}
              measureUnit={slide.measureUnit}
              evolutionValue={slide.evolutionValue}
              measureStatus={slide.measureStatus}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselCards;
