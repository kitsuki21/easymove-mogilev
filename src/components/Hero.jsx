import { useState } from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>Грузоперевозки по Могилёву и Беларуси</h1>
          <p>
            Быстрая и надёжная доставка грузов любой сложности. Работаем по
            городу, межгороду и международным направлениям. Возможен вызов
            машины вместе с грузчиками
          </p>
          <a href="#contact" className="btn">
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
