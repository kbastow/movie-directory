import { Button, Stack } from "@mui/material";
import React from "react";

type MobilePaginationControlsProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  slicePage: number;
  setSlicePage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  resultsLength: number;
  totalPages: number;
};

const MobilePaginationControls: React.FC<MobilePaginationControlsProps> = ({
  page,
  setPage,
  slicePage,
  setSlicePage,
  itemsPerPage,
  resultsLength,
  totalPages,
}) => {
  const totalSlices = Math.ceil(resultsLength / itemsPerPage);

  const handleNext = () => {
    if (slicePage < totalSlices) {
      setSlicePage((prev) => prev + 1);
    } else if (page < totalPages) {
      setPage((prev) => prev + 1);
      setSlicePage(1);
    }
  };

  const handlePrevious = () => {
    if (slicePage > 1) {
      setSlicePage((prev) => prev - 1);
    } else if (page > 1) {
      setPage((prev) => prev - 1);
      setSlicePage(Math.ceil(resultsLength / itemsPerPage));
    }
  };

  const disableNext = page === totalPages && slicePage >= totalSlices;

  const disablePrevious = page === 1 && slicePage === 1;

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ py: 2 }}
    >
      <Button
        variant="contained"
        onClick={handlePrevious}
        disabled={disablePrevious}
      >
        Previous
      </Button>
      <Button variant="contained" onClick={handleNext} disabled={disableNext}>
        Next
      </Button>
    </Stack>
  );
};
export default MobilePaginationControls;
