import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { PaginationButton } from "./PaginationButton";
import { PaginationChevron } from "./PaginationChevron";

export function Pagination({
  items,
  setPaginatedItems,
  pageLength,
  currentPage,
  root,
}) {
  const totalPages = Math.ceil(items.length / pageLength);
  const pagesToDisplay = totalPages >= 4 ? 4 : totalPages - 1;

  if (currentPage === null || currentPage < 0 || currentPage > totalPages) {
    window.location.href = `${root}/?page=1`;
  }

  let internalPage = currentPage / pagesToDisplay;
  // last page will be the next whole number, so we need to account for that
  if (internalPage !== 0 && internalPage % 1 === 0) internalPage -= 1;
  internalPage = Math.floor(internalPage);

  const pageStart = internalPage * pagesToDisplay;
  const pageEnd = pageStart + pagesToDisplay;

  const hasMorePagesDown = pageStart > 0;
  const hasMorePagesUp = totalPages - 1 > pagesToDisplay + pageStart;
  const disabledPrev = currentPage <= 0;
  const disabledNext = currentPage === totalPages - 1;

  const isSelected = (idx) => {
    if (currentPage === 0) return false;
    const currentPageWithOffset =
      (currentPage - pageStart - 1) % pagesToDisplay;
    return currentPageWithOffset === idx;
  };

  const getPageNumber = (idx) => {
    return pageStart === 0 ? pageStart + idx + 2 : pageStart + idx + 2;
  };

  const findArraySize = () => {
    if (pageEnd > totalPages) return totalPages - pageStart - 1;
    else return pagesToDisplay;
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      // currentPage is one less than page that appears to user due to offset
      window.location.href = `${root}/?page=${currentPage}`;
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      // add one additional page to handle offset
      window.location.href = `${root}/?page=${currentPage + 2}`;
    }
  };

  const handleNumber = (pageNumber) => {
    if (pageNumber === 0) window.location.href = `${root}/?page=1`;
    else window.location.href = `${root}/?page=${pageNumber + pageStart + 1}`;
  };

  const handleEllipse = (up) => {
    if (up) {
      window.location.href = `${root}/?page=${pageEnd + 2}`;
    } else {
      window.location.href = `${root}/?page=${pageStart + 1}`;
    }
  };

  useEffect(() => {
    const startItem = currentPage * pageLength;
    const endItem = currentPage * pageLength + pageLength;
    setPaginatedItems(items.slice(startItem, endItem));
  }, [currentPage, items, pageLength, setPaginatedItems]);

  return (
    <Grid margin="0 auto">
      <Grid
        margin="1rem 0 0"
        padding="0.5rem"
        sx={{
          borderRadius: "5px",
          backgroundColor: "#f6eee3",
          border: "2px solid black",
        }}
      >
        <PaginationChevron onClick={handlePrev} disabled={disabledPrev}>
          <ChevronLeft />
        </PaginationChevron>
        <PaginationButton
          text={1}
          background={currentPage === 0 ? "#ADD8E6" : "white"}
          onClick={() => handleNumber(0)}
        />
        {hasMorePagesDown && (
          <PaginationButton
            text={"..."}
            background="white"
            onClick={() => handleEllipse(false)}
          />
        )}
        {new Array(findArraySize()).fill(true).map((_, idx) => (
          <PaginationButton
            key={`button_${idx}`}
            text={getPageNumber(idx)}
            background={isSelected(idx) ? "#ADD8E6" : "white"}
            onClick={() => handleNumber(idx + 1)}
          />
        ))}
        {hasMorePagesUp && (
          <PaginationButton
            text={"..."}
            background="white"
            onClick={() => handleEllipse(true)}
          />
        )}
        <PaginationChevron onClick={handleNext} disabled={disabledNext}>
          <ChevronRight />
        </PaginationChevron>
      </Grid>
    </Grid>
  );
}
