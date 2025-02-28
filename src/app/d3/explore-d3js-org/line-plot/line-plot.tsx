import * as d3 from "d3";

type Dimensions = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

type LinePlotProps = {
  dimensions: Dimensions;
  data: { name: string; value: number }[];
};

export function LinePlot({ data, dimensions }: LinePlotProps) {
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [dimensions.margin.left, dimensions.width - dimensions.margin.right]
  );
  const y = d3.scaleLinear(d3.extent(data), [
    dimensions.height - dimensions.margin.bottom,
    dimensions.margin.top,
  ]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
