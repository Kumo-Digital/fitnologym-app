import { Stack } from "@mantine/core";
import BodySectionBalance from "./body-section-balance";
import FFMIBalance from "@/components/ui/ffmi-balance";

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
  ffmiValue = 16,
  bodyFat = { armsValue: 0, legsValue: 0 },
  muscleMass = { armsValue: 0, legsValue: 0 },
}: BodyBalanceProps) => {
  return (
    <Stack gap={16}>
      <FFMIBalance
        label="Indice de Masa Libre de Grasa (FFMI)"
        description="El Indice de Masa Libre de Grasa es una medida que indica la cantidad de masa corporal compuesta por músculos, huesos, agua y otros tejidos magros, excluyendo la grasa."
        value={ffmiValue}
      />
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
