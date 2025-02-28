export const OutlinedSvgText = ({
  stroke,
  strokeWidth,
  children,
  ...other
}: {
  stroke: string;
  strokeWidth: number;
  y?: number;
  dx?: number;
  dy: string;
  fill?: string;
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <text stroke={stroke} strokeWidth={strokeWidth} {...other}>
        {children}
      </text>
      <text {...other}>{children}</text>
    </>
  );
};
