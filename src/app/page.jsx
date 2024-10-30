import Image from "next/image";
import Link from "next/link";
import Main from "./components/home/Main";
import Header from "./components/Header";
import PricingSection from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <PricingSection />
      <Footer/>
    </>
  );
}
