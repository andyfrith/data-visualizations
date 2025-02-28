"use client";

import { useMemo, useState } from "react";
import { extent } from "d3-array";
import { format } from "d3-format";
import { scaleLinear, scaleOrdinal, scaleSqrt } from "d3-scale";
import { Dimensions, Movie } from "../types";
import { bigMoneyFormat, tableau20 } from "../utils";
import { OrdinalLegend } from "./ordinalLegend";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";
import { Points } from "./points";
import { HoverPoint } from "./hoverPoint";

export const Scatterplot = ({
  data,
  dimensions,
}: {
  data: Movie[];
  dimensions: Dimensions;
}) => {
  const [hoverPoint, setHoverPoint] = useState<Movie | undefined>(undefined);
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
    vote_count: {
      accessor: (d: Movie) => d.vote_count,
      title: "Vote Count",
      formatter: format(".1f"),
    },
    primary_genre: {
      accessor: (d: Movie) => d.primary_genre,
      title: "Primary Genre",
      formatter: (d: Movie) => d,
    },
    original_title: {
      accessor: (d: Movie) => d.original_title,
      title: "Original Title",
      formatter: (d: Movie) => d,
    },
  };

  const { accessor: colorAccessor } = fields.primary_genre;
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

  const { accessor: rAccessor } = fields.vote_count;

  const { colorScale, xScale, rScale, yScale } = useMemo(() => {
    const colorDomain = Array.from(new Set(data.map(colorAccessor))).sort();
    const colorScale = scaleOrdinal().domain(colorDomain).range(tableau20);
    const rExtent = extent(data, rAccessor);
    const xExtent = extent(data, xAccessor);
    const yExtent = extent(data, yAccessor);
    const xScale = scaleLinear()
      .domain(xExtent as number[])
      .range([0, boundsWidth]);

    const yScale = scaleLinear()
      .domain(yExtent as number[])
      .range([boundsHeight, 0]);

    const rScale = scaleSqrt()
      .domain(rExtent as number[])
      .range([2, 16]);

    return {
      colorScale,
      xScale,
      yScale,
      rScale,
    };
  }, [
    boundsHeight,
    boundsWidth,
    colorAccessor,
    data,
    rAccessor,
    xAccessor,
    yAccessor,
  ]);

  return (
    <div style={{ width: dimensions.width }} className="relative">
      <svg width={dimensions.width} height={dimensions.height}>
        <g
          transform={`translate(${dimensions.margin.left} ${dimensions.margin.top})`}
        >
          <XAxis
            xScale={xScale}
            formatter={xFormatter}
            title={xTitle}
            innerHeight={boundsHeight}
            gridLineHeight={boundsHeight}
          />
          <YAxis
            yScale={yScale}
            formatter={yFormatter}
            title={yTitle}
            gridLineWidth={boundsWidth}
          />
          <Points
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            yScale={yScale}
            yAccessor={yAccessor}
            rScale={rScale}
            rAccessor={rAccessor}
            colorScale={colorScale}
            colorAccessor={colorAccessor}
            onHover={setHoverPoint}
          />
          <HoverPoint
            labelField={fields.original_title}
            xScale={xScale}
            xField={fields.revenue}
            yScale={yScale}
            yField={fields.vote_average}
            rScale={rScale}
            rField={fields.vote_count}
            hoverPoint={hoverPoint}
          />
        </g>
      </svg>
      <div className="mt-2">
        <OrdinalLegend colorScale={colorScale} />
      </div>
    </div>
  );
};
