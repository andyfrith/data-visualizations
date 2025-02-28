import { ScaleOrdinal } from "d3-scale";

export const OrdinalLegend = ({
  colorScale,
}: {
  colorScale: ScaleOrdinal<string, unknown, never>;
}) => {
  const domain = colorScale.domain();
  return (
    <div
      className="grid grid-flow-row gap-1 text-xs leading-none text-gray-600 auto-cols-max"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      }}
    >
      {domain.map((category) => {
        return (
          <div key={category} className="flex items-center space-x-1">
            <div
              style={{ backgroundColor: colorScale(category) as string }}
              className="w-2 h-2 rounded-sm"
            />
            <div>{category}</div>
          </div>
        );
      })}
    </div>
  );
};
