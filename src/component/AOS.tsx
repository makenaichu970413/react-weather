import { useEffect } from "react";
import AOSLib from "aos";

export function AOS() {
  // Initialize AOS when component mounts
  useEffect(() => {
    AOSLib.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Easing type
      once: true, // Only animate once
      mirror: false, // Don't animate again when scrolling back up
    });

    // Refresh AOS when window resizes
    window.addEventListener("resize", AOSLib.refresh);

    return () => {
      window.removeEventListener("resize", AOSLib.refresh);
    };
  }, []);

  return <></>;
}

export default AOS;
