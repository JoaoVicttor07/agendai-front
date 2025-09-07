import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/howItWorks";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <HowItWorks />
        <Footer />
      </main>
    </>
  );
}
