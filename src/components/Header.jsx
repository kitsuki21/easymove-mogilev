import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container nav">
        <div className="logo">
          <img
            className="img-logo"
            src="/logo.png"
            alt="esyMove Mogilev - грузоперевозки"
          />
        </div>
        <ul className={menuOpen ? "active" : ""}>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Услуги
            </a>
          </li>
          <li>
            <a href="#fleet" onClick={() => setMenuOpen(false)}>
              Ваши фото
            </a>
          </li>
          <li>
            <a href="#calc" onClick={() => setMenuOpen(false)}>
              Калькулятор
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Контакты
            </a>
          </li>
        </ul>
        <a href="tel:+375291234567" className="phone">
          📞 +375 (29) 123-45-67
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </header>
  );
}
