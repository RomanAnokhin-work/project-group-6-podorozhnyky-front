import PopularStories from "@/components/PopularStories/PopularStories";
import css from "./Home.module.css";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Join from "@/components/Join/Join";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import TravellersList from "@/components/TravellersList/TravellersList";

export default function Home() {
  const more = () => {};
  return (
    <>
      <h1>Home Page</h1>
      <Hero />
      <About />
      <PopularStories />
      <OurTravellers />
      <Join />
      <TravellersList
        users={[
          { _id: "1", name: "Anna" },
          { _id: "2", name: "Maria" },
        ]}
        page={1}
        totalPages={2}
      />
    </>
  );
}
