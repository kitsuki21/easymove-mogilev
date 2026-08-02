export default function Fleet() {
  const trucks = [
    {
      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500",
      title: "Газель",
      text: "до 1.5 т, 9 м³",
    },
    {
      img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500",
      title: "Бычок",
      text: "до 3 т, 18 м³",
    },
    {
      img: "https://images.unsplash.com/photo-1586191582056-b5d6147e4c24?w=500",
      title: "5-тонник",
      text: "до 5 т, 32 м³",
    },
    {
      img: "https://images.unsplash.com/photo-1580906853203-f493e1445987?w=500",
      title: "Фура",
      text: "до 20 т, 82 м³",
    },
  ];

  return (
    <section id="fleet">
      <div className="container">
        <h2 className="section-title">Наш автопарк</h2>
        <p className="section-subtitle">Современная техника для любых задач</p>
        <div className="fleet-grid">
          {trucks.map((t, i) => (
            <div key={i} className="fleet-card">
              <img src={t.img} alt={t.title} />
              <div className="fleet-info">
                <h3>{t.title}</h3>
                <p>Грузоподъёмность: {t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
