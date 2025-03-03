"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ScaleTime } from "d3";

type AxisProps = {
  className: string;
  type: string;
  scale: ScaleTime<number, number>;
  ticks: number;
  transform: string;
  tickFormat?: string;
  disableAnimation?: string;
};

export const Axis = ({
  type,
  transform,
  scale,
  ticks,
  tickFormat,
  disableAnimation,
  ...props
}: AxisProps) => {
  const ref = useRef(null);
  useEffect(() => {
    const axisGenerator = type === "left" ? d3.axisLeft : d3.axisBottom;
    const axis = axisGenerator(scale).ticks(ticks); //.tickFormat(tickFormat);
    const axisGroup = d3.select(ref.current);
    if (disableAnimation) {
      axisGroup.call(axis);
    } else {
      axisGroup.transition().duration(750).ease(d3.easeLinear).call(axis);
    }
    axisGroup.select(".domain").remove();
    axisGroup.selectAll("line").remove();
    axisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "white")
      .attr("font-size", "0.75rem");
  }, [scale, ticks, tickFormat, disableAnimation]);

  return <g ref={ref} transform={transform} {...props} />;
};

// <Axis
//   type="bottom"
//   className="axisX"
//   scale={xScale}
//   transform={`translate(10, ${height - height / 6})`}
//   ticks={5}
// />
