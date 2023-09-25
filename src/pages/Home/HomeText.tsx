import { Typography } from "@mui/material";
import * as DOMPurify from "dompurify";
import useWindowDimensions from "hooks/useWindowDimensions";

export function HomeText({ content }) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 500;
  return (
    <Typography
      width="100%"
      fontSize={isMobile ? "1rem" : "1.2rem"}
      color="black"
      textAlign="left"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    ></Typography>
  );
}
