import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export function Pagination({ items, setPaginatedItems, pageLength }) {
  const totalPages = Math.ceil(items.length / pageLength);
  const [currentPage, setCurrentPage] = useState(0);

  const disabledPrev = currentPage <= 0;
  const disabledNext = currentPage === totalPages - 1;

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const startItem = currentPage * pageLength;
    const endItem = currentPage * pageLength + pageLength;
    setPaginatedItems(items.slice(startItem, endItem));
  }, [currentPage, items, pageLength, setPaginatedItems]);

  return (
    <Grid direction="row" margin="0 auto">
      <Grid
        direction="row"
        margin="1rem"
        padding="0.5rem"
        sx={{
          borderRadius: "5px",
          backgroundColor: "#f6eee3",
          border: "2px solid black",
        }}
      >
        <IconButton
          sx={{
            marginRight: "0.5rem",
            borderRadius: "10px",
            backgroundColor: "white",
            border: "2px solid black",
          }}
          onClick={handlePrev}
          disabled={disabledPrev}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid black",
          }}
          onClick={handleNext}
          disabled={disabledNext}
        >
          <ChevronRight />
        </IconButton>
      </Grid>
    </Grid>
  );
}
