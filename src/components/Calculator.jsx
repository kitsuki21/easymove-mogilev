import { useState } from "react";

export default function Calculator() {
  const [data, setData] = useState({
    distance: 500,
    weight: 1,
    type: "standart",
  });
  const rates = { standart: 25, express: 40, refrigerator: 55 };
  const price = Math.round(
    (data.distance * (10 + data.weight * 5) * rates[data.type]) / 10,
  );

  return (
    <section id="calc" style={{ background: "#fff" }}>
      <div className="container">
        <h2 className="section-title">Калькулятор стоимости</h2>
        <p className="section-subtitle">Предварительный расчёт за 10 секунд</p>
        <div className="calc-wrap">
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
            <div>
              <label>Вес груза, тонн</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: +e.target.value })}
              />
            </div>
          </div>
          <div className="calc-row">
            <div>
              <label>Тип перевозки</label>
              <select
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                <option value="standart">Стандарт</option>
                <option value="express">Экспресс</option>
                <option value="refrigerator">Рефрижератор</option>
              </select>
            </div>
            <div></div>
          </div>
          <div className="calc-result">
            Примерная стоимость:{" "}
            <strong>{price.toLocaleString("ru-RU")} BYN</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
