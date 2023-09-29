import { Link, Typography, styled } from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "themes/context";
import {
  getRecognitionAnimation,
  getRecognitionAnimationStyle,
  getRecognitionMargin,
  getShadowTheme,
} from "utils/utils";

export function RecognitionItem({ idx, left, up, content, source, href }) {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const mobileSize = 500;
  const isMobile = width <= mobileSize;

  const [itemWidth, setItemWidth] = useState(0);
  useEffect(() => {
    setItemWidth(document.getElementById(`item_${idx}`).offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const horizTime = isMobile ? "60s" : "90s";
  const animation = getRecognitionAnimation(left, up, horizTime);
  const Keyframes = styled("div")(
    getRecognitionAnimationStyle(animation, isMobile, width, itemWidth) as any
  );

  return (
    <Keyframes>
      <Typography
        id={`item_${idx}`}
        fontSize={isMobile ? "1rem" : "1.7rem"}
        textAlign="left"
        color="black"
        border="white 1px solid"
        borderRadius="7px"
        padding="1rem 1rem 0rem 1rem"
        width="65%"
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
