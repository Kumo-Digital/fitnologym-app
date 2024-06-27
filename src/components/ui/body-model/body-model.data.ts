import checkerFloorImage from "../../../../public/assets/images/gyms/checker-floor.png";
import testGymFloorImage from "../../../../public/assets/images/gyms/test-gym-floor.png";
import fitnologymFloorImage from "../../../../public/assets/images/gyms/fitnologym-floor.png";

interface BrandFloorImages {
  [key: string]: any;
}

export const brandFloorImages: BrandFloorImages = {
  checker: checkerFloorImage,
  test: testGymFloorImage,
  fitnologym: fitnologymFloorImage,
  default: fitnologymFloorImage,
};
