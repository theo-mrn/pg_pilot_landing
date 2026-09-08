import { Commands } from "@/components/sections/commands";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Footer, Install } from "@/components/sections/install";
import { Marquee, Nav } from "@/components/sections/nav";
import { Steps } from "@/components/sections/steps";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenu">
        <Hero />
        <Marquee />
        <Steps />
        <Commands />
        <Features />
        <Install />
      </main>
      <Footer />
    </>
  );
}
