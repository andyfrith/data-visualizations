export type Dimensions = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export type Movie = {
  budget: number;
  original_title: string;
  revenue: number;
  vote_average: number;
};
