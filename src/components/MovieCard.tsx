import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  vote_average: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  release_date,
  vote_average,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CardActionArea component={Link} to={`/movie/${id}`}>
      <Card
        sx={{
          display: isMobile ? "flex" : "block",
          width: isMobile ? "100%" : 160,
          height: isMobile ? 90 : "auto",
        }}
      >
        <CardMedia
          component="img"
          image={poster}
          alt={title}
          sx={{
            width: isMobile ? 60 : "100%",
            height: isMobile ? "100%" : 240,
            objectFit: "cover",
            p: isMobile ? 1 : 0,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
            gap: 0.5,
            pt: 3,
          }}
        >
          <Typography variant="body2" noWrap={!isMobile}>
            {title}
          </Typography>
          <Typography variant="subtitle2" noWrap={!isMobile}>
            {release_date.slice(0, 4)}
          </Typography>
          <Typography variant="caption" noWrap={!isMobile}>
            {Math.round(vote_average)} / 10
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default MovieCard;
