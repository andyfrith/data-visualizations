import { ScaleContinuousNumeric, ScaleLinear } from "d3-scale";
import { Movie } from "../types";
import { OutlinedSvgText } from "./outlinedSvgText";
import { darker } from "../utils";

export const HoverPoint = ({
  hoverPoint,
  xScale,
  xField,
  yField,
  yScale,
  rScale,
  rField,
  labelField,
  color = "cyan",
}: {
  hoverPoint: Movie | undefined;
  xScale: ScaleLinear<number, number, never>;
  xField: {
    accessor: (d: Movie) => number;
    title: string;
    formatter: (value: number) => string;
  };
  yField: {
    accessor: (d: Movie) => number;
    title: string;
    formatter: (
      n:
        | number
        | {
            valueOf(): number;
          }
    ) => string;
  };
  yScale: ScaleLinear<number, number, never>;
  rScale: ScaleContinuousNumeric<number, number, never>;
  rField: {
    accessor: (d: Movie) => number;
    title: string;
    formatter: (
      n:
        | number
        | {
            valueOf(): number;
          }
    ) => string;
  };
  labelField: {
    accessor: (d: Movie) => string;
    title: string;
    formatter: (d: Movie) => Movie;
  };
  color?: string;
}) => {
  if (!hoverPoint) return null;

  const d = hoverPoint;
  const x = xScale(xField.accessor(d));
  const y = yScale(yField.accessor(d));
  const r = rScale?.(rField.accessor(d));
  const darkerColor = darker(color);

  const [xPixelMin, xPixelMax] = xScale.range();
  const [yPixelMin, yPixelMax] = yScale.range();

  return (
    <g className="pointer-events-none">
      <g data-testid="xCrosshair">
        <line
          x1={xPixelMin}
          x2={xPixelMax}
          y1={y}
          y2={y}
          stroke="#fff"
          strokeWidth={4}
        />
        <line
          x1={xPixelMin}
          x2={xPixelMax}
          y1={y}
          y2={y}
          stroke={darkerColor}
          strokeWidth={1}
        />
      </g>
      <g data-testid="yCrosshair">
        <line
          y1={yPixelMin}
          y2={yPixelMax}
          x1={x}
          x2={x}
          stroke="#fff"
          strokeWidth={4}
        />
        <line
          y1={yPixelMin}
          y2={yPixelMax}
          x1={x}
          x2={x}
          stroke={darkerColor}
          strokeWidth={1}
        />
      </g>
      <circle cx={x} cy={y} r={r} fill={color} stroke="#fff" strokeWidth={4} />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={color}
        stroke={darkerColor}
        strokeWidth={2}
      />
      <g transform={`translate(${x + 8} ${y + 4})`}>
        <OutlinedSvgText
          stroke="#fff"
          strokeWidth={5}
          className="text-sm font-bold"
          dy="0.8em"
        >
          {labelField.accessor(d)}
        </OutlinedSvgText>
        <OutlinedSvgText
          stroke="#fff"
          strokeWidth={5}
          className="text-xs"
          dy="0.8em"
          y={16}
        >
          {`${xField.title}: ${xField.formatter(xField.accessor(d))}`}
        </OutlinedSvgText>
        <OutlinedSvgText
          stroke="#fff"
          strokeWidth={5}
          className="text-xs"
          dy="0.8em"
          y={30}
        >
          {`${yField.title}: ${yField.formatter(yField.accessor(d))}`}
        </OutlinedSvgText>
      </g>
    </g>
  );
};
