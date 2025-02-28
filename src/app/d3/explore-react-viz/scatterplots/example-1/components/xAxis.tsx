import { ScaleLinear } from "d3";
import { numTicksForPixels } from "../utils";

export const XAxis = ({
  xScale,
  title,
  formatter,
  innerHeight,
}: {
  xScale: ScaleLinear<number, number, never>;
  title: string;
  formatter: (value: number) => string;
  innerHeight: number;
}) => {
  const [xMin, xMax] = xScale.range();
  const ticks = xScale.ticks(numTicksForPixels(xMax - xMin));

  return (
    <g data-testid="XAxis" transform={`translate(0 ${innerHeight})`}>
      <text
        x={xMax}
        textAnchor="end"
        dy={-4}
        fill="var(--gray-600)"
        className="font-semibold text-2xs"
        // lazy CSS approach to getting a 1px white outline
        style={{
          textShadow: `-1px -1px 1px #fff,
                        1px -1px 1px #fff,
                        1px 1px 1px #fff,
                       -1px 1px 1px #fff`,
        }}
      >
        {title}
      </text>
      <line x1={xMin} x2={xMax} y1={0} y2={0} stroke="var(--gray-400)" />
      {ticks.map((tick) => {
        const x = xScale(tick);
        return (
          <g key={tick} transform={`translate(${x} 0)`}>
            <text
              y={10}
              dy="0.8em"
              textAnchor="middle"
              fill="currentColor"
              className="text-gray-400 text-2xs"
            >
              {formatter(tick)}
            </text>
            <line y1={0} y2={8} stroke="var(--gray-300)" />
          </g>
        );
      })}
    </g>
  );
};
