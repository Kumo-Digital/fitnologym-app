import { LabelsProps } from "./speed-meter.types";
import classes from "./speed-meter.module.css";

const Labels = ({ name }: LabelsProps) => {
  return (
    <div className={classes.labels}>
      <span>Izq</span>
      <label className={classes.meter_label}>{name}</label>
      <span>Der</span>
    </div>
  );
};

export default Labels;
