import Image from "next/image";
import Link from "next/link";
import Main from "./components/home/Main";
import Header from "./components/Header";
import PricingSection from "./components/Pricing";
import Footer from "./components/Footer";
import BenefitsSection from "./components/BenefitsSection";
import ContactComponent from "./components/contact/page";
import Ctn from "./components/Ctn";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <BenefitsSection />
      <Ctn/>
      <PricingSection />
      <Footer/>
    </>
  );
}
