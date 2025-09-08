import HeroSection from "@/components/modules/Homepage/HeroSection";
import About from "./About";
import Features from "./Features";
import Contact from "./Contact";
import FAQ from "./FAQ";
import { useLocation } from "react-router";
import { useEffect } from "react";

export default function Homepage() {
  const location = useLocation();
  console.log("Location: ", location);

  useEffect(() => {
    const section = location.hash.replace("#", "");
    console.log("Section: ", section);
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <HeroSection />
      <About />
      <Features />
      <FAQ />
      <Contact />
    </div>
  );
}
