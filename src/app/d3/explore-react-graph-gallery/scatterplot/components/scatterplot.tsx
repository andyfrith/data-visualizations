"use client";

import { useState } from "react";
import * as d3 from "d3";
import { AxisLeft } from "./axis-left";
import { AxisBottom } from "./axis-bottom";
import { TooltipData, Tooltip } from "./tooltip";

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

type DataPoint = {
  x: number;
  y: number;
  size: number;
  group: string;
  subGroup: string;
};

type ScatterplotProps = {
  dimensions: Dimensions;
  data: DataPoint[];
};

export const Scatterplot = ({ dimensions, data }: ScatterplotProps) => {
  const boundsWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left;
  const boundsHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const [hovered, setHovered] = useState<TooltipData | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  // Scales
  const yScale = d3.scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([-3000, 50000])
    .range([0, boundsWidth]);
  const allGroups = data.map((d) => String(d.group));
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={5}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        fillOpacity={hoveredGroup && d.group !== hoveredGroup ? "0.3" : "0.7"}
        strokeWidth={hoveredGroup && d.group !== hoveredGroup ? "1px" : "2px"}
        stroke={colorScale(d.group)}
        fill={colorScale(d.group)}
        onMouseOver={() => {
          setHoveredGroup(d.group);
          setHovered({
            xPos: xScale(d.x),
            yPos: yScale(d.y),
            name: d.subGroup,
          });
        }} // callback to update the state
        onMouseLeave={() => {
          setHoveredGroup(null);
          setHovered(null);
        }} // and to set it back to null
      />
    );
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[
            dimensions.margin.left,
            dimensions.margin.top,
          ].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>

      {/* Tooltip */}
      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          marginLeft: dimensions.margin.left,
          marginTop: dimensions.margin.top,
        }}
      >
        <Tooltip tooltipData={hovered} />
      </div>
    </div>
  );
};
