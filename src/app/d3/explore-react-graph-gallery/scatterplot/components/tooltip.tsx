import styles from "./tooltip.module.css";

// Information needed to build the tooltip
export type TooltipData = {
  xPos: number;
  yPos: number;
  name: string;
};

type TooltipProps = {
  tooltipData: TooltipData | null;
};

export const Tooltip = ({ tooltipData }: TooltipProps) => {
  if (!tooltipData) {
    return null;
  }

  return (
    <div
      className={styles.tooltip}
      style={{
        left: tooltipData.xPos,
        top: tooltipData.yPos,
      }}
    >
      {tooltipData.name}
    </div>
  );
};
