import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions();
      setWindowDimensions(dimensions);
    }
    const dimensions = getWindowDimensions();
    const isMobile = dimensions.width < 500;

    if (!isMobile) window.addEventListener("resize", handleResize);

    return !isMobile
      ? () => window.removeEventListener("resize", handleResize)
      : () => {};
  }, []);

  return windowDimensions;
}
