import { Link, Typography } from "@mui/material";

export function Referral({ left, content, source, linkedin, isMobile }) {
  const leftMargin = "2rem 0 2rem 2rem";
  const rightMargin = "2rem 2rem 2rem auto";
  const leftMobileMargin = "2rem 0 0rem 2rem";
  const rightMobileMargin = "2rem 2rem 0rem auto";
  return (
    <Typography
      variant="h4"
      textAlign="left"
      color="#C6AB62"
      border="white 1px solid"
      borderRadius="10px"
      padding="1rem 1rem 0rem 1rem"
      width="60%"
      margin={
        left
          ? isMobile
            ? leftMobileMargin
            : leftMargin
          : isMobile
          ? rightMobileMargin
          : rightMargin
      }
      boxShadow="8px 5px 5px #C6AB62, 10px 7px 7px #0ff, inset 3px 2px 2px white;"
      sx={{ textShadow: "3px 3px 2px black" }}
    >
      {content}
      <p color="white">
        -{" "}
        <Link href={linkedin} color="#fff">
          {source}
        </Link>
      </p>
    </Typography>
  );
}
