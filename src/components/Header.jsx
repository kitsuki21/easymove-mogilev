import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container nav">
        <div className="logo">
          easy<span>Move</span>Mogilev
        </div>
        <ul className={menuOpen ? "active" : ""}>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Услуги
            </a>
          </li>
          <li>
            <a href="#fleet" onClick={() => setMenuOpen(false)}>
              Автопарк
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
        <a href="tel:+375298384338" className="phone">
          📞 +375 29 838 4338
        </a>
        <a href="tel:+375298384338" className="phone">
          📞 +375 44 785 8838
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </header>
  );
}
