import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import Fleet from "./components/Fleet";
import Process from "./components/Process";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Advantages />
      <Fleet />
      <Process />
      <Calculator />
      <Contact />
    </>
  );
}

export default App;
