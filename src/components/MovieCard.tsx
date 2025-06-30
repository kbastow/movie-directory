import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface MovieCardProps {
  title: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CardActionArea>
      <Card
        sx={{
          display: isMobile ? "flex" : "block",
          width: isMobile ? "100%" : 200,
          height: isMobile ? 150 : "auto",
        }}
      >
        <CardMedia
          component="img"
          image={poster}
          alt={title}
          sx={{
            minWidth: isMobile ? 100 : "100%",
            maxWidth: isMobile ? 100 : "100%",
            height: isMobile ? "100%" : 300,
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            flexGrow: 1,
          }}
        >
          <Typography variant="subtitle1" noWrap={!isMobile}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default MovieCard;
