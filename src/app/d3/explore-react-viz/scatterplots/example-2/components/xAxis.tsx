import { ScaleLinear } from "d3";
import { numTicksForPixels } from "../utils";

export const XAxis = ({
  xScale,
  title,
  formatter,
  innerHeight,
  gridLineHeight,
}: {
  xScale: ScaleLinear<number, number, never>;
  title: string;
  formatter: (value: number) => string;
  innerHeight: number;
  gridLineHeight: number;
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
        className="font-semibold text-2xs text-shadow-white-stroke"
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
            <line
              y1={0}
              y2={8}
              stroke="var(--gray-300)"
              data-testid="tickmark"
            />
            {gridLineHeight ? (
              <line
                y1={0}
                y2={-gridLineHeight}
                stroke="var(--gray-200)"
                strokeOpacity={0.8}
                data-testid="gridline"
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
};
