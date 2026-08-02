export default function Advantages() {
  const items = [
    { num: "2", title: "года на рынке" },
    { num: "2000+", title: "Довольных клиентов" },
    { num: "99%", title: "Доставок в срок" },
  ];

  return (
    <section className="advantages">
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="adv-grid">
          {items.map((a, i) => (
            <div key={i} className="adv-item">
              <div className="adv-num">{a.num}</div>
              <h4>{a.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
