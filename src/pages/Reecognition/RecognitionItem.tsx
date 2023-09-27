import { Link, Typography, styled } from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import {
  getRecognitionAnimation,
  getRecognitionAnimationStyle,
  getRecognitionMargin,
  getShadowTheme,
} from "utils/utils";

export function RecognitionItem({ left, up, content, source, href }) {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const mobileSize = 500;
  const isMobile = width <= mobileSize;

  const horizTime = isMobile ? "60s" : "90s";
  const animation = getRecognitionAnimation(left, up, horizTime);
  const Keyframes = styled("div")(
    getRecognitionAnimationStyle(animation, isMobile, width) as any
  );

  return (
    <Keyframes>
      <Typography
        fontSize={isMobile ? "1rem" : "1.7rem"}
        textAlign="left"
        color="black"
        border="white 1px solid"
        borderRadius="7px"
        padding="1rem 1rem 0rem 1rem"
        width="60%"
        margin={getRecognitionMargin(left, isMobile)}
        boxShadow={getShadowTheme(theme)}
        sx={{
          backgroundColor: "white",
        }}
      >
        {content}
        <p color="black">
          -{" "}
          <Link
            href={href}
            color="#000"
            sx={{
              textDecorationColor: "black",
              textDecorationThickness: "3px",
              target: "_blank",
            }}
          >
            {source}
          </Link>
        </p>
      </Typography>
    </Keyframes>
  );
}
