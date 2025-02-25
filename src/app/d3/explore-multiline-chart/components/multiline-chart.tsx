"use client";

import { useMemo } from "react";
import * as d3 from "d3";
import { Axis } from "./axis";
// import useController from "./useController";

type Data = {
  name: string;
  color: string;
  items: Array<{ date: Date; marketvalue: number; value: number }>;
};

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

type MultilineChart = {
  data: Data[];
  dimensions: Dimensions;
};

export const MultilineChart = ({
  data,
  dimensions,
}: {
  data: Data[];
  dimensions: Dimensions;
}) => {
  // const controller = useController({
  //   data: [data],
  //   width: dimensions.width,
  //   height: dimensions.height,
  // });

  // const { yTickFormat, xScale, yScale, yScaleForAxis } = controller;
  const xMin = useMemo(
    () => d3.min(data, ({ items }) => d3.min(items, ({ date }) => date)),
    [data]
  );

  const xMax = useMemo(
    () => d3.max(data, ({ items }) => d3.max(items, ({ date }) => date)),
    [data]
  );

  const xScale = useMemo(
    () => d3.scaleTime().domain([xMin, xMax]).range([0, dimensions.width]),
    [xMin, xMax, dimensions.width]
  );

  const yMin = useMemo(
    () => d3.min(data, ({ items }) => d3.min(items, ({ value }) => value)),
    [data]
  );

  const yMax = useMemo(
    () => d3.max(data, ({ items }) => d3.max(items, ({ value }) => value)),
    [data]
  );

  const yScale = useMemo(() => {
    const indention = (yMax - yMin) * 0.5;
    return d3
      .scaleLinear()
      .domain([yMin - indention, yMax + indention])
      .range([dimensions.height, 0]);
  }, [dimensions.height, yMin, yMax]);

  const yScaleForAxis = useMemo(
    () => d3.scaleBand().domain([yMin, yMax]).range([dimensions.height, 0]),
    [dimensions.height, yMin, yMax]
  );

  const yTickFormat = (d: string) =>
    `${parseFloat(d) > 0 ? "+" : ""}${d3.format(".2%")(d / 100)}`;

  return (
    <svg
      width={
        dimensions.width + dimensions.margin.left + dimensions.margin.right
      }
      height={
        dimensions.height + dimensions.margin.top + dimensions.margin.bottom
      }
      shapeRendering={"crispEdges"}
    >
      <g
        transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}
      >
        <Axis
          type="left"
          scale={yScaleForAxis}
          transform="translate(50, -10)"
          ticks={5}
          tickFormat={yTickFormat}
        />
        {/* <Axis
          type="bottom"
          className="axisX"
          scale={xScale}
          transform={`translate(10, ${
            dimensions.height - dimensions.height / 6
          })`}
          ticks={5}
        /> */}
      </g>
    </svg>
  );
};
