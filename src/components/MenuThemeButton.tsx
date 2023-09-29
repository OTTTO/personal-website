import { Button, Typography } from "@mui/material";
import { getEmojiShadowTheme, getThemeEmoji, setThemeEmoji } from "utils/utils";

export function MenuThemeButton({ isMobile, theme, setTheme, isHome }) {
  return (
    <Button
      size="small"
      sx={{
        padding: 0,
        height: "2rem",
        marginTop: "1rem",
      }}
      onClick={() => {
        setThemeEmoji(theme, setTheme);
      }}
      className="themeButtonAnimation"
    >
      <Typography
        fontSize="2rem"
        sx={{
          "&:hover": {
            fontSize: !isMobile ? "2.5rem" : "2rem",
            textShadow: getEmojiShadowTheme(theme),
          },
          textShadow: isMobile ? getEmojiShadowTheme(theme) : undefined,
        }}
      >
        {getThemeEmoji(theme)}
      </Typography>
    </Button>
  );
}
