import { format } from "d3";
import { lab } from "d3-color";

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

export const tableau20 = [
  "#4e79a7",
  "#a0cbe8",
  "#f28e2b",
  "#ffbe7d",
  "#59a14f",
  "#8cd17d",
  "#b6992d",
  "#f1ce63",
  "#499894",
  "#86bcb6",
  "#e15759",
  "#ff9d9a",
  "#79706e",
  "#bab0ac",
  "#d37295",
  "#fabfd2",
  "#b07aa1",
  "#d4a6c8",
  "#9d7660",
  "#d7b5a6",
];

export function darker(color: string, factor = 0.85) {
  const labColor = lab(color);
  labColor.l *= factor;

  // rgb doesn't correspond to visual perception, but is
  // easy for computers
  // const rgbColor = rgb(color)
  // rgbColor.r *= 0.8
  // rgbColor.g *= 0.8
  // rgbColor.b *= 0.8

  // rgb(100, 50, 50);
  // rgb(75, 25, 25); // is this half has light perceptually?
  return labColor.toString();
}
