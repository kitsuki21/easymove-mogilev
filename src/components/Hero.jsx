import { useState } from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>Грузоперевозки по Могилёву и Беларуси</h1>
          <p>
            Грузоперевозки до 3 тонн по Могилёву и Беларуси. Доставляем грузы
            любой сложности по городу, межгороду и международным направлениям.
            Возможен вызов машины с грузчиками.
          </p>
          <a href="#contact" className="btn">
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
