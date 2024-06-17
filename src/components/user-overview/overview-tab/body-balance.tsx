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
        label="Balance FFMI"
        description="Lorem ipsum dolor sit amet consectetur. Eget maecenas volutpat fringilla id felis. Dignissim platea eu in tempus mattis gravida purus in enim."
        value={ffmiValue}
      />
      <BodySectionBalance
        name="Grasa Corporal"
        description="Lorem ipsum dolor sit amet consectetur. Eget maecenas volutpat fringilla id felis. Dignissim platea eu in tempus mattis gravida purus in enim."
        armsValue={bodyFat.armsValue}
        legsValue={bodyFat.legsValue}
      />
      <BodySectionBalance
        name="Masa Muscular"
        description="Lorem ipsum dolor sit amet consectetur. Eget maecenas volutpat fringilla id felis. Dignissim platea eu in tempus mattis gravida purus in enim."
        armsValue={muscleMass.armsValue}
        legsValue={muscleMass.legsValue}
      />
    </Stack>
  );
};

export default BodyBalance;
