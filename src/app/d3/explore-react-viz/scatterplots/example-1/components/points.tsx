import { ScaleLinear } from "d3";
import { Movie } from "../types";

export const Points = ({
  data,
  xScale,
  xAccessor,
  yAccessor,
  yScale,
  radius = 8,
}: {
  data: Movie[];
  xScale: ScaleLinear<number, number, never>;
  xAccessor: (d: Movie) => number;
  yAccessor: (d: Movie) => number;
  yScale: ScaleLinear<number, number, never>;
  radius: number;
}) => {
  return (
    <g data-testid="Points">
      {data.map((d) => {
        // without a scale, we have to compute the math ourselves
        // const x = (width * (d.revenue - minRevenue)) / (maxRevenue - minRevenue)
        // but scales make it easier for us to think about.

        const x = xScale(xAccessor(d));
        const y = yScale(yAccessor(d));
        return (
          <circle
            key={d.original_title}
            cx={x}
            cy={y}
            r={radius}
            className="text-indigo-500 hover:text-yellow-500"
            fill="currentColor"
            stroke="white"
            strokeWidth={0.5}
            strokeOpacity={1}
            fillOpacity={0.8}
            onClick={() => console.log(d)}
          />
        );
      })}
    </g>
  );
};
