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
            alt="easyMove Mogilev - грузоперевозки"
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
        <a href="tel:+375447858838" className="phone">
          📞 +375 (44) 785-88-38
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </header>
  );
}
