import { useParams } from "react-router";

const MoviePage: React.FC = () => {
  const params = useParams();

  return (
    <div>
      <h1>Movie Details Page</h1>
      <p>{params.movieId}</p>
    </div>
  );
};

export default MoviePage;
