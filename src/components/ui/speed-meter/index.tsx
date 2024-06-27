import React, { useEffect, useRef } from "react";
import Graph from "./graph";
import Labels from "./labels";
import { SpeedMeterProps } from "./speed-meter.types";
import { mapRange } from "./speed-meter.utils";
import classes from "./speed-meter.module.css";

const SpeedMeter = ({ name, value }: SpeedMeterProps) => {
  const needleRef = useRef<SVGPathElement>(null);
  const mappedValue = mapRange(value);

  useEffect(() => {
    if (needleRef.current !== null) {
      needleRef.current.style.setProperty(
        "--rotate-value",
        `${mappedValue}deg`
      );
    }
  }, [value, needleRef]);

  return (
    <div className={classes.root}>
      <Graph ref={needleRef} highlight={name} />
      <Labels name={name} />
    </div>
  );
};

export default SpeedMeter;
