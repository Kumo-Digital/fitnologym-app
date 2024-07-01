export const mapRange = (
  value: number,
  min: number = -30,
  max: number = 30,
  outMin: number = -115, // Min needle movement
  outMax: number = 115 // Max needle movement
): number => {
  if (value < min) value = min;
  if (value > max) value = max;

  return ((value - min) * (outMax - outMin)) / (max - min) + outMin;
};
