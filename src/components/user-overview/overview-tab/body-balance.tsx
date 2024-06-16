import { Flex, Stack, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import BodySectionBalance from "./body-section-balance";
import SpeedMeter from "@/components/ui/speed-meter";
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

const BodyBalance = ({ ffmiValue, bodyFat, muscleMass }: BodyBalanceProps) => {
  return (
    <Stack gap={32} mt={16}>
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
