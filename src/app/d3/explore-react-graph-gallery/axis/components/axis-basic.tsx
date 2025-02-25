import * as d3 from "d3";
import { StripGenerator } from "./stripe-generator";
import { AxisBottom } from "./axis-bottom";
import { AxisLeft } from "./axis-left";

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

type AxisBasicProps = {
  dimensions: Dimensions;
};

export const AxisBasic = ({ dimensions }: AxisBasicProps) => {
  const boundsWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left;
  const boundsHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // Compute the scales (usually done using the dataset as input)
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([0, 11]).range([boundsHeight, 0]);

  return (
    <div>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        shapeRendering={"crispEdges"}
      >
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[
            dimensions.margin.left,
            dimensions.margin.top,
          ].join(",")})`}
          overflow={"visible"}
        >
          {/* graph content */}
          <StripGenerator width={boundsWidth} height={boundsHeight} />

          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={30} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom xScale={xScale} pixelsPerTick={60} />
          </g>
        </g>
      </svg>
    </div>
  );
};
