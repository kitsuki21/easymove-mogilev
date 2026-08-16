import { useState } from "react";

export default function Calculator() {
  const [data, setData] = useState({
    zone: "city", // зона доставки
    distance: 0, // расстояние в км (для "Вне города" и "По Беларуси")
    loaders: 1, // количество грузчиков
  });

  // Расчёт стоимости
  const calculatePrice = () => {
    const loadersPrice = data.loaders * 20;

    if (data.zone === "city") {
      // По городу +5 км — фиксированная цена
      return 40 + loadersPrice;
    } else {
      // Вне города или По Беларуси — формула (1.2 * км) + 40
      return Math.round(1.2 * data.distance + 40) + loadersPrice;
    }
  };

  const price = calculatePrice();

  return (
    <section id="calc" style={{ background: "#fff" }}>
      <div className="container">
        <h2 className="section-title">Калькулятор стоимости</h2>
        <p className="section-subtitle">Предварительный расчёт за 10 секунд</p>
        <div className="calc-wrap">
          <div className="calc-row">
            <div>
              <label>Зона доставки</label>
              <select
                value={data.zone}
                onChange={(e) => setData({ ...data, zone: e.target.value })}
              >
                <option value="city">По городу +5 км</option>
                <option value="outside">Вне города</option>
                <option value="belarus">По Беларуси</option>
              </select>
            </div>
            <div>
              <label>Количество грузчиков</label>
              <input
                type="number"
                min="0"
                max="10"
                value={data.loaders}
                onChange={(e) =>
                  setData({ ...data, loaders: Math.max(0, +e.target.value) })
                }
              />
            </div>
          </div>

          {/* Поле расстояния показывается только для "Вне города" и "По Беларуси" */}
          {data.zone !== "city" && (
            <div className="calc-row">
              <div>
                <label>Расстояние, км</label>
                <input
                  type="number"
                  min="1"
                  value={data.distance}
                  onChange={(e) =>
                    setData({ ...data, distance: +e.target.value })
                  }
                />
              </div>
              <div></div>
            </div>
          )}

          <div className="calc-result">
            Примерная стоимость:{" "}
            <strong>{price.toLocaleString("ru-RU")} BYN</strong>
            <div style={{ fontSize: "14px", marginTop: "8px", opacity: 0.8 }}>
              {data.zone === "city"
                ? "Фиксированная ставка по городу"
                : `Расстояние: ${data.distance} км`}
              {" • "}
              Грузчиков: {data.loaders} × 20 BYN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
