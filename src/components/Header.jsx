import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className={`container nav ${menuOpen ? "mobile-menu-open" : ""}`}>
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

        <div className="header-phones">
          <a href="tel:+375447858838" className="header-phone">
            <span className="operator-indicator a1"></span>
            <span className="phone-number">+375 (44) 785-88-38</span>
          </a>
          <a href="tel:+375298384338" className="header-phone">
            <span className="operator-indicator mts"></span>
            <span className="phone-number">+375 (29) 838-43-38</span>
          </a>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
