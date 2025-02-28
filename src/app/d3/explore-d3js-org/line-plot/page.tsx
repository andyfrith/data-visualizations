"use client";

import { useState } from "react";
import * as d3 from "d3";
import { LinePlot } from "./line-plot";

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
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div onMouseMove={onMouseMove}>
            <LinePlot dimensions={dimensions} data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
