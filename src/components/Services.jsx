export default function Services() {
  const items = [
    {
      icon: "🚚",
      title: "Межгород",
      text: "Перевозки между городами Беларуси",
    },
    {
      icon: "🏙️",
      title: "По Могилёву",
      text: "Доставка внутри города за 2 часа",
    },
    {
      icon: "📦",
      title: "Сборные грузы",
      text: "Экономичная доставка малых партий",
    },
    {
      icon: "🏗️",
      title: "Негабарит",
      text: "Перевозка крупногабаритных грузов",
    },
  ];

  return (
    <section id="services">
      <div className="container">
        <h2 className="section-title">Наши услуги</h2>
        <div className="services-grid">
          {items.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
