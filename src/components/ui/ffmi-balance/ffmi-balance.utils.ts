export const mapRange = (
  value: number,
  inMin: number = 14,
  inMax: number = 30,
  outMin: number = 0,
  outMax: number = 100
): number => {
  if (value < inMin) value = inMin; // Clamp the value to the minimum 16
  if (value > inMax) value = inMax; // Clamp the value to the maximum 30

  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
