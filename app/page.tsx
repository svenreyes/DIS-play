import Hero from "./components/sections/Hero";
import EventInfo from "./components/sections/EventInfo";
import Schedule from "./components/sections/Schedule";
import Footer from "./components/sections/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Schedule />
      <EventInfo />
      <Footer />
    </>
  );
}
