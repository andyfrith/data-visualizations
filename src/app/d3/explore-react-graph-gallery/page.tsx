import * as d3 from "d3";
import { AxisBasic } from "./axis/components/axis-basic";
import { BarChart } from "./bar-chart/components/bar-chart";
import { Scatterplot } from "./scatterplot/components/scatterplot";
import { Scatterplot as ClimateCrisisScatterplot } from "./climate-crisis/components/scatterplot";
import { BubbleLegend } from "./bubble-legend/bubble-legend";

import { data as barChartData } from "./bar-chart/data";
import { data as scatterplotData } from "./scatterplot/data";
import { data as climateCrisisData } from "./climate-crisis/data";

const dimensions = {
  width: 400,
  height: 400,
  margin: {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50,
  },
};

export default function Page() {
  return (
    <div>
      <AxisBasic dimensions={dimensions} />
      <BarChart dimensions={dimensions} data={barChartData} />
      <Scatterplot data={scatterplotData} dimensions={dimensions} />
      <ClimateCrisisScatterplot
        data={climateCrisisData}
        dimensions={dimensions}
      />
      <BubbleLegend
        scale={d3.scaleSqrt().domain([0, 100]).range([0, 80]).nice()}
        tickNumber={4}
      />
    </div>
  );
}
