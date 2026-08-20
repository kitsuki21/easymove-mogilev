import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const patterns = {
    name: /^[А-Яа-яЁёA-Za-z\s]+$/,
    phone: /^\+375\s(29|33|25|44)\s\d{3}-\d{2}-\d{2}$/,
    msg: /[А-Яа-яЁёA-Za-z0-9]/,
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    let cleanDigits = digits;
    if (digits.startsWith("375")) cleanDigits = digits.slice(3);
    else if (digits.startsWith("8")) cleanDigits = digits.slice(1);

    cleanDigits = cleanDigits.slice(0, 9);
    let formatted = "+375 ";
    if (cleanDigits.length > 0) formatted += cleanDigits.slice(0, 2);
    if (cleanDigits.length >= 3) formatted += " " + cleanDigits.slice(2, 5);
    if (cleanDigits.length >= 6) formatted += "-" + cleanDigits.slice(5, 7);
    if (cleanDigits.length >= 8) formatted += "-" + cleanDigits.slice(7, 9);
    return formatted;
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Введите имя";
        if (!patterns.name.test(value))
          return "Имя должно содержать только буквы";
        if (value.trim().length < 2) return "Имя слишком короткое";
        return "";
      case "phone":
        if (!value.trim()) return "Введите номер телефона";
        if (!patterns.phone.test(value))
          return "Формат: +375 (29|33|25|44) XXX-XX-XX";
        return "";
      case "msg":
        if (!value.trim()) return "Напишите комментарий";
        if (!patterns.msg.test(value))
          return "Комментарий должен содержать буквы или цифры";
        if (value.trim().length < 5)
          return "Комментарий слишком короткий (минимум 5 символов)";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? formatPhone(value) : value;
    setForm({ ...form, [name]: newValue });
    setErrors({ ...errors, [name]: validateField(name, newValue) });
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", form.name),
      phone: validateField("phone", form.phone),
      msg: validateField("msg", form.msg),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          msg: form.msg,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setForm({ name: "", phone: "", msg: "" });
        setErrors({});
      } else {
        alert("Ошибка отправки: " + data.message);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка сети. Проверьте интернет.");
    } finally {
      setIsSending(false);
    }
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
              <a
                href="tel:+375291234567"
                style={{ color: "#ff7a00", textDecoration: "none" }}
              >
                +375 (29) 123-45-67
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

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div>
              <input
                name="name"
                required
                placeholder="Ваше имя"
                value={form.name}
                onChange={handleChange}
                style={{
                  borderColor: errors.name
                    ? "#ff4444"
                    : "rgba(255,255,255,0.2)",
                }}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div>
              <input
                name="phone"
                required
                type="tel"
                placeholder="+375 29 123-45-67"
                value={form.phone}
                onChange={handleChange}
                style={{
                  borderColor: errors.phone
                    ? "#ff4444"
                    : "rgba(255,255,255,0.2)",
                }}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>

            <div>
              <textarea
                name="msg"
                required
                placeholder="Комментарий (откуда, куда, что везём)"
                value={form.msg}
                onChange={handleChange}
                style={{
                  borderColor: errors.msg ? "#ff4444" : "rgba(255,255,255,0.2)",
                }}
              />
              {errors.msg && <span className="error-text">{errors.msg}</span>}
            </div>

            <button
              type="submit"
              className="btn"
              disabled={
                isSending || Object.values(errors).some((e) => e !== "")
              }
            >
              {isSending
                ? "Отправка..."
                : isSuccess
                  ? "✓ Заявка отправлена!"
                  : "Отправить заявку"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
