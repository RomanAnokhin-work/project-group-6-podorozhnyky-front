import PopularStories from "@/components/PopularStories/PopularStories";
import css from "./Home.module.css";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Join from "@/components/Join/Join";
import OurTravellers from "@/components/OurTravellers/OurTravellers"
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import AuthNavModal from "@/components/AuthNavModal/AuthNavModal";
import TravellersStoriesItem from "@/components/TravellersStoriesItem/TravellersStoriesItem";
import AuthNavModalWrapper from "@/components/AuthNavModal/AuthNavModalWrapper";


export default function Home() {
  return (
    < >
      <h1>Home Page</h1>
      <Hero/>
      <About/>
      <PopularStories/>
      <OurTravellers/>
      <Join />
      {/* <MessageNoStories 
        text="Some Text"
        buttonText="Some Button Text"
        buttonRoute="/stories"
      /> */}
      {/* <TravellersStoriesItem /> */}
      <AuthNavModalWrapper />
    </>
  );
}
