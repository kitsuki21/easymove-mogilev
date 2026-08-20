import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import Process from "./components/Process";
import Cargo from "./components/Cargo";
import SEOText from "./components/Seotext";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Cargo />
        <Process />
        <Calculator />
      </main>
      <SEOText />
      <Contact />
    </>
  );
}

export default App;
