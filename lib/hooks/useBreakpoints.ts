import { useState, useEffect } from "react";
import useResize from "./useResize";
import { isMobile } from "../utils/isMobile";

const useBreakpoints = () => {
  const { width }: any = useResize();
  const setBreakpoints = () => {
    let breakpoints: any = {
      isSmall: false,
      isMedium: false,
      isLarge: true,
    };
    if (width <= 768) {
      breakpoints = {
        isSmall: true,
        isMedium: false,
        isLarge: false,
      };
    } else if (width > 768 && width < 1200) {
      breakpoints = {
        isSmall: false,
        isMedium: true,
        isLarge: false,
      };
    }
    const isDesktop = !isMobile();
    breakpoints.isDesktop = isDesktop;
    breakpoints.isMobile = !isDesktop && width < 768;
    breakpoints.isTablet = !isDesktop && width >= 768;
    return breakpoints;
  };
  const [state, setState] = useState(setBreakpoints());

  useEffect(() => {
    setState(setBreakpoints());
    // eslint-disable-next-line
  }, [width]);

  return state;
};

export default useBreakpoints;
