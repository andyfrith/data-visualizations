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

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  budget: number;
  original_title: string;
  revenue: number;
  vote_average: number;
  vote_count: number;
  primary_genre: string;
  genres: Array<Genre>;
};
