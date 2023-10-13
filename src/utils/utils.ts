import { Themes } from "types/themes";

export function authenticationCheck() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = parseJwt(token);
    return decoded.exp * 1000 > new Date().getTime();
  }
  return false;
}

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function testAuthenticationCheck() {
  return !!localStorage.getItem("testToken");
}

export function getStorage(key: string) {
  return JSON.parse(localStorage.getItem(key));
}

export function getThemeEmoji(theme: Themes) {
  if (theme === Themes.Fire) return "🔥";
  else if (theme === Themes.Ice) return "❄️";
  else if (theme === Themes.Lightning) return "⚡";
}

export function setThemeEmoji(theme: Themes, setTheme) {
  if (theme === Themes.Fire) {
    setTheme(Themes.Ice);
  } else if (theme === Themes.Ice) {
    setTheme(Themes.Lightning);
  } else if (theme === Themes.Lightning) {
    setTheme(Themes.Fire);
  }
}

export function getHeaderTheme(theme: Themes) {
  if (theme === Themes.Fire) {
    return "linear-gradient(90deg, red, #ff4d00, black)";
  } else if (theme === Themes.Ice) {
    return "linear-gradient(90deg, cyan, purple, black)";
  } else if (theme === Themes.Lightning) {
    return "linear-gradient(90deg, goldenrod, #c0c0c0, black)";
  }
}

export function getFooterTheme(theme: Themes) {
  if (theme === Themes.Fire) {
    return "linear-gradient(90deg, black, #ff4d00, red)";
  } else if (theme === Themes.Ice) {
    return "linear-gradient(90deg, black, purple, cyan)";
  } else if (theme === Themes.Lightning) {
    return "linear-gradient(90deg, black, #c0c0c0, goldenrod)";
  }
}

export function getMainTheme(theme: Themes) {
  if (theme === Themes.Fire) {
    return "linear-gradient(135deg, black, red, grey, #ff4d00, red, #ff4d00, grey, red, black)";
  } else if (theme === Themes.Ice) {
    return "linear-gradient(135deg, black, cyan, purple, cyan, purple, cyan, black)";
  } else if (theme === Themes.Lightning) {
    return "linear-gradient(135deg, goldenrod, silver,  goldenrod, white, goldenrod, silver, goldenrod)";
  }
}

export function getTitleTheme(theme: Themes) {
  if (theme === Themes.Fire) {
    return "#C6AB62";
  } else if (theme === Themes.Ice) {
    return "linear-gradient(orange, yellow, red)";
  } else if (theme === Themes.Lightning) {
    return "linear-gradient(black, blue, black)";
  }
}

export function getShadowTheme(theme: Themes) {
  if (theme === Themes.Fire) {
    return "8px 5px 5px #C6AB62, 10px 7px 7px #0ff, inset 3px 2px 2px black;";
  } else if (theme === Themes.Ice) {
    return "8px 5px 5px #C6AB62, 10px 7px 7px #8800C7, inset 3px 2px 2px black;";
  } else if (theme === Themes.Lightning) {
    return "8px 5px 5px blue, 10px 7px 7px purple, inset 3px 2px 2px black;";
  }
}

export function getEmojiShadowTheme(theme: Themes) {
  if (theme === Themes.Fire) {
    return "0 -0.5rem 1.5rem #ADD8E6, 0 0.5rem 1.5rem #ADD8E6;";
  } else if (theme === Themes.Ice) {
    return "0 -0.5rem 1.5rem goldenrod, 0 0.5rem 1.5rem goldenrod;";
  } else if (theme === Themes.Lightning) {
    return "0 -0.5rem 1.5rem blue, 0 -1rem 1.5rem white, 0 0.5rem 1.5rem blue, 0 1rem 1.5rem white;";
  }
}

export function getRecognitionAnimationStyle(
  animation,
  isMobile,
  width,
  itemWidth
) {
  return {
    "@keyframes moveLeftRight": {
      "0%": {
        left: 0,
      },
      "50%": {
        left: width - itemWidth - 60,
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
        right: width - itemWidth - 60,
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
  };
}

export function getRecognitionAnimation(left, up, horizTime) {
  if (left && up)
    return `moveLeftRight ${horizTime} infinite, moveUpDown 15s infinite`;
  else if (left)
    return `moveLeftRight ${horizTime} infinite, moveDownUp 15s infinite`;
  else if (!left && up)
    return `moveRightLeft ${horizTime} infinite, moveUpDown 15s infinite`;
  else return `moveRightLeft ${horizTime} infinite, moveDownUp 15s infinite`;
}

export function getRecognitionMargin(left, isMobile) {
  const leftMargin = "2rem 0 2rem 1rem";
  const rightMargin = "2rem 2rem 2rem auto";
  const leftMobileMargin = "2rem 0 0rem 1rem";
  const rightMobileMargin = "2rem 2rem 0rem auto";
  return left
    ? isMobile
      ? leftMobileMargin
      : leftMargin
    : isMobile
    ? rightMobileMargin
    : rightMargin;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
