import { format } from "d3";

export const bigMoneyFormat = (value: number) => {
  if (value == null) return value;
  const formatted = format("$~s")(value);
  return formatted.replace(/G$/, "B");
};

export const numTicksForPixels = (
  pixelsAvailable: number,
  pixelsPerTick = 70
) => {
  return Math.floor(Math.abs(pixelsAvailable) / pixelsPerTick);
};
