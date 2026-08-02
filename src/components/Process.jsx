export default function Process() {
  const steps = [
    { n: "1", t: "Заявка", d: "Оставьте заявку на сайте или позвоните" },
    { n: "2", t: "Расчёт", d: "Менеджер рассчитает стоимость за 15 минут" },
    { n: "3", t: "Подача", d: "Подаём машину в согласованное время" },
    { n: "4", t: "Доставка", d: "Доставляем груз точно в срок" },
  ];

  return (
    <section className="process">
      <div className="container">
        <h2 className="section-title">Как мы работаем</h2>
        <p className="section-subtitle">Простой и понятный процесс</p>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
