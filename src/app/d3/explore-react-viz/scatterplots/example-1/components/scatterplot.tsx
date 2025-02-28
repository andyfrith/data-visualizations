import { extent, format, scaleLinear } from "d3";
import { Points } from "./points";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";
import { Dimensions, Movie } from "../types";
import { bigMoneyFormat } from "../utils";

export const Scatterplot = ({
  data,
  dimensions,
}: {
  data: Movie[];
  dimensions: Dimensions;
}) => {
  const boundsWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left;
  const boundsHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const fields = {
    revenue: {
      accessor: (d: Movie) => d.revenue,
      title: "Revenue",
      formatter: bigMoneyFormat,
    },
    budget: {
      accessor: (d: Movie) => d.budget,
      title: "Budget",
      formatter: bigMoneyFormat,
    },
    vote_average: {
      accessor: (d: Movie) => d.vote_average,
      title: "Vote Average out of 10",
      formatter: format(".1f"),
    },
  };

  const {
    accessor: xAccessor,
    title: xTitle,
    formatter: xFormatter,
  } = fields.revenue;

  const {
    accessor: yAccessor,
    title: yTitle,
    formatter: yFormatter,
  } = fields.vote_average;

  const xExtent = extent(data, xAccessor);
  const yExtent = extent(data, yAccessor);

  const xScale = scaleLinear()
    .domain(xExtent as number[])
    .range([0, boundsWidth]);
  const yScale = scaleLinear()
    .domain(yExtent as number[])
    .range([boundsHeight, 0]);

  const radius = 4;

  // console.log("xExtent", xExtent);
  // console.log("yExtent", yExtent);

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.margin.left} ${dimensions.margin.top})`}
      >
        <XAxis
          xScale={xScale}
          formatter={xFormatter}
          title={xTitle}
          innerHeight={boundsHeight}
        />
        <Points
          radius={radius}
          data={data}
          xScale={xScale}
          yScale={yScale}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />
        <YAxis yScale={yScale} formatter={yFormatter} title={yTitle} />
      </g>
    </svg>
  );
};
