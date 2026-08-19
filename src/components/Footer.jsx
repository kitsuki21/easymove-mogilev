import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Регулярные выражения для валидации
  const patterns = {
    name: /^[А-Яа-яЁёA-Za-z\s]+$/, // только буквы и пробелы
    phone: /^\+375\s(29|33|25|44)\s\d{3}-\d{2}-\d{2}$/, // +375 (29|33|25|44) XXX-XX-XX
    msg: /[А-Яа-яЁёA-Za-z0-9]/, // должен содержать хотя бы один символ (не только пробелы)
  };

  // Форматирование телефона при вводе
  const formatPhone = (value) => {
    // Оставляем только цифры
    const digits = value.replace(/\D/g, "");

    // Если начинается с 375, убираем эти цифры (они добавятся автоматически)
    let cleanDigits = digits;
    if (digits.startsWith("375")) {
      cleanDigits = digits.slice(3);
    } else if (digits.startsWith("8")) {
      cleanDigits = digits.slice(1);
    }

    // Берём максимум 9 цифр после 375 (2 цифры код + 7 цифр номер)
    cleanDigits = cleanDigits.slice(0, 9);

    // Формируем красивый номер
    let formatted = "+375 ";
    if (cleanDigits.length > 0) {
      formatted += cleanDigits.slice(0, 2);
    }
    if (cleanDigits.length >= 3) {
      formatted += " " + cleanDigits.slice(2, 5);
    }
    if (cleanDigits.length >= 6) {
      formatted += "-" + cleanDigits.slice(5, 7);
    }
    if (cleanDigits.length >= 8) {
      formatted += "-" + cleanDigits.slice(7, 9);
    }

    return formatted;
  };

  // Валидация одного поля
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

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Для телефона применяем форматирование
    if (name === "phone") {
      newValue = formatPhone(value);
    }

    setForm({ ...form, [name]: newValue });

    // Валидируем в реальном времени (только если поле уже трогали)
    const error = validateField(name, newValue);
    setErrors({ ...errors, [name]: error });
    setSubmitted(false);
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидируем все поля
    const newErrors = {
      name: validateField("name", form.name),
      phone: validateField("phone", form.phone),
      msg: validateField("msg", form.msg),
    };

    setErrors(newErrors);

    // Если есть ошибки — не отправляем
    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return;

    // Всё валидно — отправляем
    console.log("Форма отправлена:", form);
    alert(`Спасибо, ${form.name}! Мы перезвоним по номеру ${form.phone}`);

    // Очищаем форму
    setForm({ name: "", phone: "", msg: "" });
    setErrors({});
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
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
                className="contact-phone"
                href="tel:+375291234567"
                href="tel:+375447858838"
              >
                +375 (29) 123-45-67
              </a>
              <a className="contact-phone" href="tel:+375447858838">
                +375 (44) 785-88-38
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
            {/* Имя */}
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

            {/* Телефон */}
            <div>
              <input
                name="phone"
                required
                type="tel"
                placeholder="+375 ** ***-**-**"
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

            {/* Комментарий */}
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
              disabled={Object.values(errors).some((e) => e !== "")}
            >
              {submitted ? "✓ Заявка отправлена!" : "Отправить заявку"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
