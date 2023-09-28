import { Grid } from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useContext } from "react";
import { ThemeContext } from "themes/context";

import { getHeaderTheme } from "utils/utils";
import { MenuMini } from "./MenuMini";
import { MenuLarge } from "./MenuLarge";
import { MenuLoginButton } from "./MenuLoginButton";
import { MenuThemeButton } from "./MenuThemeButton";

export function Menu({
  backgroundColor,
  borderSides = false,
  bottomBorder = true,
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const mobileSize = 400;
  const isMobile = width < mobileSize;
  const smallerSize = 1500;
  const isLarger = width > smallerSize;

  const inverseColor =
    backgroundColor === "black" ? "solid white .25rem" : "solid black .25rem";

  return (
    <Grid
      sx={{
        backgroundColor,
        background: getHeaderTheme(theme),
        padding: "0rem 0rem 1rem 1rem",
        borderBottom: bottomBorder ? inverseColor : null,
        borderLeft: borderSides ? inverseColor : null,
        borderRight: borderSides ? inverseColor : null,
        borderTop: borderSides ? inverseColor : null,
      }}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid
          container
          direction="row"
          display="inline-block"
          width="auto"
          spacing={0}
        >
          {!isLarger ? (
            <MenuMini isLarger={isLarger} />
          ) : (
            <MenuLarge isLarger={isLarger} />
          )}
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "flex-end",
          }}
          display="inline-block"
          width="auto"
        >
          <MenuThemeButton
            isMobile={isMobile}
            theme={theme}
            setTheme={setTheme}
          />
          <MenuLoginButton isLarger={isLarger} />
        </Grid>
      </Grid>
    </Grid>
  );
}
