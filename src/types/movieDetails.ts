export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieSimilar {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  runtime: number;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  cast: CastMember[];
  similar: MovieSimilar[];
}
