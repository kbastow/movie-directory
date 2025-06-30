import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";

interface MovieCardProps {
  title: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster }) => {
  return (
    <Card sx={{ width: 150 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={poster}
          alt={title}
          sx={{ height: 200 }}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
