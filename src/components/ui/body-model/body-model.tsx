import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Image from "next/image";
import maleBodyImage from "../../../../public/assets/images/body/male-body.png";
import femaleBodyImage from "../../../../public/assets/images/body/female-body.png";
import { MaleBodyOutlines } from "@/components/ui/body-model/male-body-outlines";
import { FemaleBodyOutlines } from "@/components/ui/body-model/female-body-outlines";

interface BodySectionsProps {
  gender: "female" | "male";
  onSectionSelect: (section: string) => void;
}

export const BodyModel = ({ gender, onSectionSelect }: BodySectionsProps) => {
  // const { ref, width, height } = useElementSize();

  return (
    <section style={{ width: "100%", height: "100%" }}>
      {/* <Box ref={ref} style={{ position: "relative", aspectRatio: "1/1" }}> */}
      <Box
        style={{
          position: "relative",
          aspectRatio: "1/1",
        }}
      >
        <Box
          id="body-image"
          w={"100%"}
          h={"100%"}
          style={{ position: "absolute" }}
        >
          <Image
            src={gender === "male" ? maleBodyImage : femaleBodyImage}
            alt="3D Body Model"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          id="body-outlines"
          w={"100%"}
          h={"100%"}
          style={{ position: "absolute" }}
        >
          <>
            {gender === "male" && (
              <MaleBodyOutlines onSectionSelect={onSectionSelect} />
            )}
            {gender === "female" && (
              <FemaleBodyOutlines onSectionSelect={onSectionSelect} />
            )}
          </>
        </Box>
      </Box>
    </section>
  );
};
