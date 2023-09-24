import { Typography } from "@mui/material";
import * as DOMPurify from "dompurify";

export function HomeText({ content }) {
  return (
    <Typography
      width="100%"
      fontSize="1.2rem"
      color="black"
      textAlign="left"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    ></Typography>
  );
}
