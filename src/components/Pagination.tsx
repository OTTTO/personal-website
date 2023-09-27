import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { PaginationButton } from "./PaginationButton";
import { PaginationChevron } from "./PaginationChevron";

export function Pagination({ items, setPaginatedItems, pageLength }) {
  const totalPages = Math.ceil(items.length / pageLength);
  const pagesToDisplay = totalPages >= 4 ? 4 : totalPages - 1;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(pagesToDisplay);

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
    const hasFullPages = (pageEnd - pageStart) % pagesToDisplay === 0;
    if (hasFullPages) return pagesToDisplay;
    else return pageEnd - pageStart;
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const newCurrentPage = currentPage - 1;
      setCurrentPage(newCurrentPage);

      const onFirstPage = pageStart === 0;
      const isGoingBackPage = newCurrentPage < pageStart + 1;
      if (!onFirstPage && isGoingBackPage) {
        setPageEnd(newCurrentPage);
        setPageStart(newCurrentPage - pagesToDisplay);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const newCurrentPage = currentPage + 1;
      setCurrentPage(newCurrentPage);
      if (newCurrentPage > pagesToDisplay + pageStart) {
        setPageStart(currentPage);

        const newPageEnd =
          currentPage + pagesToDisplay >= totalPages
            ? totalPages - 1
            : currentPage + pagesToDisplay;
        setPageEnd(newPageEnd);
      }
    }
  };

  const handleNumber = (pageNumber) => {
    const newPageNumber = pageNumber + pageStart;
    setCurrentPage(newPageNumber);
    if (pageNumber === 0) {
      setPageStart(0);
      setPageEnd(pagesToDisplay);
    }
  };

  const handleEllipse = (up) => {
    if (up) {
      setCurrentPage(pageEnd + 1);
      setPageStart(pageEnd);

      const newPageEnd =
        pageEnd + pagesToDisplay >= totalPages
          ? totalPages - 1
          : pageEnd + pagesToDisplay;
      setPageEnd(newPageEnd);
    } else {
      setCurrentPage(pageStart);
      setPageEnd(pageStart);
      setPageStart(pageStart - pagesToDisplay);
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
