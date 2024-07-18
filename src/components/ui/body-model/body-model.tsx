import { FemaleBodyOutlines } from "@/components/ui/body-model/female-body-outlines";
import { MaleBodyOutlines } from "@/components/ui/body-model/male-body-outlines";
import { Box, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import femaleBodyImage from "../../../../public/assets/images/body/female-body.png";
import maleBodyImage from "../../../../public/assets/images/body/male-body.png";
import { brandFloorImages } from "./body-model.data";

interface BodySectionsProps {
  gender: "female" | "male";
  gymName?: string;
  onSectionSelect: (section: string) => void;
  selectedSection: string;
}

export const BodyModel = ({
  gender,
  onSectionSelect,
  gymName = "default",
  selectedSection,
}: BodySectionsProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const isMobileLG = useMediaQuery(
    `(min-width: ${em(769)}) and (max-width: ${em(1024)})`
  );

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <Box
        style={{
          position: "relative",
          aspectRatio: "1/1",
        }}
      >
        <Box
          id="brand-floor"
          pos="absolute"
          w={`calc(100% - ${isMobile ? 38 : 128}px)`}
          h={`calc(100% - ${isMobile ? 38 : 128}px)`}
          bottom={`${isMobile ? -37 : -30}%`}
          left={isMobile ? 16 : 64}
          style={{
            perspective: "50cm",
            perspectiveOrigin: "center",
          }}
        >
          <Image
            src={brandFloorImages[gymName]}
            alt={`${gymName} Logo`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "100%",
              objectFit: "contain",
              transformStyle: "preserve-3d",
              transform: `rotateX(calc(var(--rotate-x, ${
                isMobileLG ? -12 : -12
              }) * 1deg)) rotateY(calc(var(--rotate-y, 0) * 1deg)) rotateX(90deg)`,
            }}
          />
          <Box
            w={"100%"}
            h={"100%"}
            style={{
              // border: "1px solid tomato",
              transformStyle: "preserve-3d",
              transform: `rotateX(calc(var(--rotate-x, ${
                isMobileLG ? -12 : -12
              }) * 1deg)) rotateY(calc(var(--rotate-y, 0) * 1deg)) rotateX(90deg)`,
              background:
                "radial-gradient(circle, rgba(36,36,36,0) 0%, rgba(36,36,36,1) 100%)",
            }}
          ></Box>
        </Box>
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
              <MaleBodyOutlines
                onSectionSelect={onSectionSelect}
                selectedSection={selectedSection}
              />
            )}
            {gender === "female" && (
              <FemaleBodyOutlines
                onSectionSelect={onSectionSelect}
                selectedSection={selectedSection}
              />
            )}
          </>
        </Box>
      </Box>
    </section>
  );
};
