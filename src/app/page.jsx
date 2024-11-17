import Image from "next/image";
import Link from "next/link";
import Main from "./components/home/Main";
import Header from "./components/Header";
import PricingSection from "./components/Pricing";
import Footer from "./components/Footer";
import BenefitsSection from "./components/BenefitsSection";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <BenefitsSection />
      <PricingSection />
      <Footer/>
    </>
  );
}
