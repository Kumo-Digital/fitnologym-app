import { useEffect, useRef } from "react";
import classes from "./ffmi-balance.module.css";
import { FFMIBalanceProps } from "./ffmi-balance.types";
import { mapRange } from "./ffmi-balance.utils";

const FFMIBalance = ({
  label,
  description,
  value,
  styles,
  ...props
}: FFMIBalanceProps) => {
  const valueRef = useRef<HTMLMeterElement>(null);

  const mappedValue = mapRange(value);

  useEffect(() => {
    if (valueRef.current !== null) {
      valueRef.current.style.setProperty(
        "--indicator-position",
        `${mappedValue}%`
      );
    }
  }, [value, valueRef]);

  return (
    <div className={classes.root} style={styles} {...props}>
      <div className={classes.container}>
        <div className={classes.header}>
          {label && (
            <label htmlFor="meter" className={classes.label}>
              {label}
            </label>
          )}
          {description && <p className={classes.description}>{description}</p>}
        </div>
        <div className={classes.graph}>
          <meter
            ref={valueRef}
            id="meter"
            min="0"
            max="100"
            value={mappedValue}
            className={classes.meter}
          ></meter>
          <div className={classes.values}>
            {Array.from({ length: 17 }).map((_, index) => (
              <span key={`value-${index}`}>{14 + index}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FFMIBalance;
