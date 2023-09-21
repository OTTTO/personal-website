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

  const [initialWidth] = useState(windowDimensions.width);

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions();
      if (initialWidth !== dimensions.width) {
        setWindowDimensions(dimensions);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialWidth]);

  return windowDimensions;
}
