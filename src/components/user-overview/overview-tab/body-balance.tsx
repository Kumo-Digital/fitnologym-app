import { Stack } from "@mantine/core";
import BodySectionBalance from "./body-section-balance";

type ValueProps = {
  armsValue: number;
  legsValue: number;
};

interface BodyBalanceProps {
  ffmiValue: number;
  bodyFat: ValueProps;
  muscleMass: ValueProps;
}

const BodyBalance = ({
  bodyFat = { armsValue: 0, legsValue: 0 },
  muscleMass = { armsValue: 0, legsValue: 0 },
}: BodyBalanceProps) => {
  return (
    <Stack gap={16}>
      <BodySectionBalance
        name="Grasa Corporal"
        armsValue={bodyFat.armsValue}
        legsValue={bodyFat.legsValue}
      />
      <BodySectionBalance
        name="Masa Muscular"
        armsValue={muscleMass.armsValue}
        legsValue={muscleMass.legsValue}
      />
    </Stack>
  );
};

export default BodyBalance;
