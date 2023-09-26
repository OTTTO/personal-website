import { Link, Typography, styled } from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import { getShadowTheme } from "utils/utils";

export function RecognitionItem({ left, up, content, source, href }) {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const mobileSize = 500;
  const isMobile = width <= mobileSize;

  const leftMargin = "2rem 0 2rem 2rem";
  const rightMargin = "2rem 2rem 2rem auto";
  const leftMobileMargin = "2rem 0 0rem 2rem";
  const rightMobileMargin = "2rem 2rem 0rem auto";

  const horizTime = isMobile ? "60s" : "90s";

  let animation;
  if (left && up)
    animation = `moveLeftRight ${horizTime} infinite, moveUpDown 15s infinite`;
  else if (left)
    animation = `moveLeftRight ${horizTime} infinite, moveDownUp 15s infinite`;
  else if (!left && up)
    animation = `moveRightLeft ${horizTime} infinite, moveUpDown 15s infinite`;
  else
    animation = `moveRightLeft ${horizTime} infinite, moveDownUp 15s infinite`;

  const Keyframes = styled("div")({
    "@keyframes moveLeftRight": {
      "0%": {
        left: 0,
      },
      "50%": {
        left: !isMobile ? width - width * 0.7 : width - width * 0.85,
      },
      "100%": {
        left: 0,
      },
    },
    "@keyframes moveRightLeft": {
      "0%": {
        right: 0,
      },
      "50%": {
        right: !isMobile ? width - width * 0.7 : width - width * 0.85,
      },
      "100%": {
        right: 0,
      },
    },
    "@keyframes moveDownUp": {
      "0%": {
        top: "-1rem",
      },
      "50%": {
        top: 0,
      },
      "100%": {
        top: "-1rem",
      },
    },
    "@keyframes moveUpDown": {
      "0%": {
        top: 0,
      },
      "50%": {
        top: "-1rem",
      },
      "100%": {
        top: 0,
      },
    },
    animation,
    position: "relative",
  });
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
        margin={
          left
            ? isMobile
              ? leftMobileMargin
              : leftMargin
            : isMobile
            ? rightMobileMargin
            : rightMargin
        }
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
