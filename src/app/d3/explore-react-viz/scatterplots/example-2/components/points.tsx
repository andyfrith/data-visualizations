import { memo } from "react";
import { Movie } from "../types";
import { ScaleOrdinal, ScaleLinear, ScaleContinuousNumeric } from "d3-scale";
import { darker } from "../utils";

export const Points = memo(function Points({
  data,
  xScale,
  xAccessor,
  yScale,
  yAccessor,
  rScale,
  rAccessor,
  colorScale,
  colorAccessor,
  defaultColor = "tomato",
  radius = 8,
  onHover,
}: {
  data: Array<Movie>;
  xScale: ScaleLinear<number, number, never>;
  xAccessor: (d: Movie) => number;
  yScale: ScaleLinear<number, number, never>;
  yAccessor: (d: Movie) => number;
  rScale: ScaleContinuousNumeric<number, number, never>;
  rAccessor: (d: Movie) => number;
  colorScale: ScaleOrdinal<string, unknown, never>;
  colorAccessor: (d: Movie) => string;
  defaultColor?: string;
  radius?: number;
  onHover: (d: Movie | undefined) => Movie | undefined;
}) {
  return (
    <g data-testid="Points">
      {data.map((d, i) => {
        // const x = (width * (d.revenue - minRevenue)) / (maxRevenue - minRevenue)
        const x = xScale(xAccessor(d));
        const y = yScale(yAccessor(d));
        const r = rScale?.(rAccessor(d)) ?? radius;
        const color = colorScale?.(colorAccessor(d)) ?? defaultColor;
        const darkerColor = darker(color as string);

        return (
          <circle
            key={d.id ?? i}
            cx={x}
            cy={y}
            r={r}
            fill={color as string}
            stroke={darkerColor}
            strokeWidth={1}
            strokeOpacity={1}
            fillOpacity={1}
            onClick={() => console.log(d)}
            onMouseEnter={() => onHover(d)}
            onMouseLeave={() => onHover(undefined)}
          />
        );
      })}
    </g>
  );
});
