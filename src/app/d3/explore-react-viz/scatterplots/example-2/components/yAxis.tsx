import { numTicksForPixels } from "../utils";
import { ScaleLinear } from "d3";

export const YAxis = ({
  yScale,
  title,
  formatter,
  gridLineWidth,
}: {
  yScale: ScaleLinear<number, number, never>;
  title: string;
  formatter: (n: number | { valueOf: () => number }) => string;
  gridLineWidth: number;
}) => {
  const [yMin, yMax] = yScale.range();
  const ticks = yScale.ticks(numTicksForPixels(yMin - yMax, 50));

  const OutlinedSvgText = ({
    stroke,
    strokeWidth,
    children,
    ...other
  }: {
    stroke: string;
    strokeWidth: number;
    dx: number;
    dy: string;
    fill: string;
    className: string;
    children: React.ReactNode;
  }) => {
    return (
      <>
        <text stroke={stroke} strokeWidth={strokeWidth} {...other}>
          {children}
        </text>
        <text {...other}>{children}</text>
      </>
    );
  };

  return (
    <g data-testid="YAxis">
      <OutlinedSvgText
        stroke="#fff"
        strokeWidth={2.5}
        dx={4}
        dy="0.8em"
        fill="var(--gray-600)"
        className="font-semibold text-2xs"
      >
        {title}
      </OutlinedSvgText>
      <line x1={0} x2={0} y1={yMin} y2={yMax} stroke="var(--gray-400)" />
      {ticks.map((tick) => {
        const y = yScale(tick);
        return (
          <g key={tick} transform={`translate(0 ${y})`}>
            <text
              dy="0.34em"
              textAnchor="end"
              dx={-12}
              fill="currentColor"
              className="text-gray-400 text-2xs"
            >
              {formatter(tick)}
            </text>
            <line x1={0} x2={-8} stroke="var(--gray-300)" />
            {gridLineWidth ? (
              <line
                x1={0}
                x2={gridLineWidth}
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
