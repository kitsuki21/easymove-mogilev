import { useState } from "react";

export default function Hero() {
  const [form, setForm] = useState({ from: "", to: "", cargo: "" });

  const submit = (e) => {
    e.preventDefault();
    alert(
      `Заявка принята!\nОткуда: ${form.from}\nКуда: ${form.to}\nГруз: ${form.cargo}`,
    );
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>Грузоперевозки по Могилёву и Беларуси</h1>
          <p>
            Быстрая и надёжная доставка грузов любой сложности. Работаем по
            городу, межгороду и международным направлениям.
          </p>
          <a href="#contact" className="btn">
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
