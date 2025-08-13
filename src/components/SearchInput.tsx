import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ClickAwayListener,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDebounce } from "use-debounce";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNavigate } from "react-router";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

type SearchValue = {
  query: string;
};

const SearchInput: React.FC = () => {
  const { control, watch, setValue } = useForm<SearchValue>();
  const query = watch("query", "");
  const [debouncedQuery] = useDebounce(query, 600);
  const { data, isLoading, isError, isFetching } = useSearchMovies(debouncedQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setShowDropdown(false);
    setValue("query", "");
  };

  const handleClear = () => {
    setValue("query", "");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setShowDropdown(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    setShowDropdown(debouncedQuery.length > 0);
  }, [debouncedQuery]);

  const StyledSearchDropdown = styled(Paper)(({ theme }) => ({
    position: "absolute",
    margin: "auto",
    top: "85%",
    width: "96%",
    maxWidth: 800,
    maxHeight: 300,
    overflowY: "auto",
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 800, p: 2 }}>
      <Controller
        name="query"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Paper component="form" sx={{ p: 1, display: "flex" }}>
            <InputBase
              {...field}
              placeholder="Search movie titles..."
              fullWidth
              inputProps={{ "aria-label": "search-movies" }}
              inputRef={(ref) => {
                field.ref(ref);
                inputRef.current = ref;
              }}
            />
            {query && (
              <IconButton
                onClick={handleClear}
                aria-label="clear search"
                sx={{ minWidth: 44, height: 44 }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Paper>
        )}
      />
      {showDropdown && (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
          <StyledSearchDropdown>
            <List dense>
              {isLoading ? (
    <ListItem>
      <ListItemText primary="Loading..." />
    </ListItem>
  ) : isError ? (
    <ListItem>
      <ListItemText primary="Something went wrong. Please try again." />
    </ListItem>
  ) : debouncedQuery && data?.length === 0 ? (
    <ListItem>
      <ListItemText primary="No results found" />
    </ListItem>
  ) : debouncedQuery && data ? (
    <>
      {data.map((movie: Movie) => (
        <ListItem key={movie.id}>
          <ListItemButton onClick={() => handleSelect(movie.id)}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                component="img"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : "https://via.placeholder.com/92x138?text=No+Image"
                }
                alt={movie.title}
                sx={{ width: 44, height: "auto", borderRadius: 1 }}
              />
              <ListItemText primary={movie.title} />
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
      {isFetching && !isLoading && (
        <ListItem>
          <ListItemText primary="Updating..." />
        </ListItem>
      )}
    </>
  ) : null}
            </List>
          </StyledSearchDropdown>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchInput;
