"use client";
import PopularStories from "@/components/PopularStories/PopularStories";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Join from "@/components/Join/Join";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import AuthNavModalWrapper from "@/components/AuthNavModal/AuthNavModalWrapper";

export default function Home() {
  return (
    <>
      <Hero/>
      <About/>
      <PopularStories/>
      <OurTravellers/>
      <Join />
      <AuthNavModalWrapper />
    </>
  );
}
