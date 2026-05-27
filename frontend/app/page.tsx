import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import SecuritySection from "@/components/SecuritySection";
import ContractsTable from "@/components/ContractsTable";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <SecuritySection />
        <ContractsTable />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
