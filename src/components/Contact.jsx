import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    msg: "",
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const patterns = {
    name: /^[А-Яа-яЁёA-Za-z\s]+$/,
    msg: /[А-Яа-яЁёA-Za-z0-9]/,
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
        if (!value) return "Введите номер телефона";
        if (value.length < 10) return "Номер слишком короткий";
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
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    setIsSuccess(false);
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
    setErrors({ ...errors, phone: validateField("phone", value) });
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
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Свяжитесь с нами</h2>

        <div className="contact-grid">
          {/* ЛЕВАЯ КОЛОНКА - Контактная информация */}
          <div className="contact-info-block">
            <div className="contact-info">
              <p>
                <strong>Адрес:</strong> г. Дрибин, ул. Юбилейная, 2
              </p>
              <p>
                <strong>Телефон:</strong>{" "}
                <a href="tel:+37544785-88-38" className="contact-phone-link">
                  +375 (44) 785-88-38
                </a>
              </p>
              <p>
                <strong>Email:</strong> info@easymovemogilev.by
              </p>
              <p>
                <strong>Режим работы:</strong> круглосуточно, без выходных
              </p>
              <p className="contact-info-note">
                Оставьте заявку — и наш менеджер свяжется с вами в течение 15
                минут, рассчитает точную стоимость и подберёт оптимальный
                маршрут.
              </p>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА - Форма */}
          <div className="form-wrapper">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  name="name"
                  required
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <div
                  className={`phone-input-container ${errors.phone ? "input-error" : ""}`}
                >
                  <PhoneInput
                    international
                    defaultCountry="BY"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="+375 (29) 123-45-67"
                  />
                </div>
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  name="msg"
                  required
                  placeholder="Комментарий (откуда, куда, что везём)"
                  value={form.msg}
                  onChange={handleChange}
                  className={`form-control ${errors.msg ? "input-error" : ""}`}
                  rows="4"
                />
                {errors.msg && <span className="error-text">{errors.msg}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary form-submit"
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
      </div>
    </section>
  );
}
