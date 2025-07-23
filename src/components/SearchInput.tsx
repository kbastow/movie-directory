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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDebounce } from "use-debounce";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNavigate } from "react-router";
import theme from "../styles/theme";

type Movie = {
  id: number;
  title: string;
};

type SearchValue = {
  query: string;
};

const SearchInput: React.FC = () => {
  const { control, watch, setValue } = useForm<SearchValue>();
  const query = watch("query", "");
  const [debouncedQuery] = useDebounce(query, 600);
  const { data, isLoading } = useSearchMovies(debouncedQuery);
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

  return (
    <Box
      sx={{ position: "relative", width: "100%", maxWidth: 800, px: 2, py: 2 }}
    >
      <Controller
        name="query"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Paper
            component="form"
            sx={{ p: 1, display: "flex", alignItems: "center", height: 48 }}
          >
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
          <Paper
            sx={{
              position: "absolute",
              margin: "auto",
              top: "85%",
              width: "96%",
              maxWidth: 800,
              maxHeight: 300,
              overflowY: "auto",
              zIndex: 2,
              backgroundColor: theme.palette.grey[800],
            }}
          >
            <List dense>
              {isLoading ? (
                <ListItem>
                  <ListItemText primary="Loading..." />
                </ListItem>
              ) : debouncedQuery && data?.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              ) : debouncedQuery && data ? (
                data.map((movie: Movie) => (
                  <ListItem key={movie.id}>
                    <ListItemButton onClick={() => handleSelect(movie.id)}>
                      <ListItemText primary={movie.title} />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : null}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchInput;
