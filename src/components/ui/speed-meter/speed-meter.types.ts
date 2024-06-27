export interface SpeedMeterProps {
  name: string;
  value: number;
}

export type LabelsProps = Pick<SpeedMeterProps, "name">;

export interface GraphProps {
  ref: React.RefObject<SVGPathElement> | undefined;
}
