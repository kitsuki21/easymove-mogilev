import { useState } from "react";

export default function Footer() {
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });

  const submit = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${form.name}! Мы перезвоним по номеру ${form.phone}`);
    setForm({ name: "", phone: "", msg: "" });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Свяжитесь с нами</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>
              <strong>Адрес:</strong> г. Могилёв, ул. Логистическая, 25
            </p>
            <p>
              <strong>Телефон:</strong>{" "}
              <a className="contact-phone" href="tel:+375298384338">
                +375 29 838 4338
              </a>
              <a className="contact-phone" href="tel:+375447858838">
                {" "}
                +375 44 785 88 38
              </a>
            </p>
            <p>
              <strong>Email:</strong> info@esymovemogilev.by
            </p>
            <p>
              <strong>Режим работы:</strong> круглосуточно, без выходных
            </p>
            <p style={{ marginTop: 20 }}>
              Оставьте заявку — и наш менеджер свяжется с вами в течение 15
              минут, рассчитает точную стоимость и подберёт оптимальный маршрут.
            </p>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <input
              required
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Комментарий (откуда, куда, что везём)"
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
            />
            <button type="submit" className="btn">
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
