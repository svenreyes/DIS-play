import Hero from "./components/sections/Hero";
import EventInfo from "./components/sections/EventInfo";
import Schedule from "./components/sections/Schedule";
import Tracks from "./components/sections/Tracks";
import GetInvolved from "./components/sections/GetInvolved";
import Footer from "./components/sections/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <EventInfo />
      <Schedule />
      <Tracks />
      <GetInvolved />
      <Footer />
    </>
  );
}
