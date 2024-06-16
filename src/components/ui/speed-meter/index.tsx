import React, { useEffect, useRef } from "react";
import Graph from "./graph";
import Labels from "./labels";
import { SpeedMeterProps } from "./speed-meter.types";
import { mapRange } from "./speed-meter.utils";

const SpeedMeter = ({ name, value }: SpeedMeterProps) => {
  const needleRef = useRef<SVGPathElement>(null);
  const mappedValue = mapRange(value);

  useEffect(() => {
    if (needleRef.current !== null) {
      console.log("move the needle with this value: ", mappedValue);
      needleRef.current.style.setProperty(
        "--rotate-value",
        `${mappedValue}deg`
      );
    }
  }, [value, needleRef]);

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <Graph ref={needleRef} />
      <Labels name={name} />
    </div>
  );
};

export default SpeedMeter;
