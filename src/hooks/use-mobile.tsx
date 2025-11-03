import * as React from "react";

/**
 * Tailwind default breakpoints:
 * sm: 640px
 * md: 768px (tablet start)
 * lg: 1024px (desktop start)
 */
const BREAKPOINTS = {
  mobile: 768,   // <768px
  tablet: 1024,  // 768px–1023px
};

export function useResponsive() {
  const [viewport, setViewport] = React.useState<"mobile" | "tablet" | "desktop">(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < BREAKPOINTS.mobile) return "mobile";
    if (width < BREAKPOINTS.tablet) return "tablet";
    return "desktop";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) setViewport("mobile");
      else if (width < BREAKPOINTS.tablet) setViewport("tablet");
      else setViewport("desktop");
    };

    // Run once on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    viewport,
    isMobile: viewport === "mobile",
    isTablet: viewport === "tablet",
    isDesktop: viewport === "desktop",
  };
}
