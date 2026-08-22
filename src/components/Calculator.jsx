import { useState } from "react";

export default function Calculator() {
  const [data, setData] = useState({
    zone: "city",
    distance: "",
    loaders: "1",
  });

  const handleLoadersChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value) || value === "0") {
      setData({ ...data, loaders: value });
    }
  };

  const handleDistanceChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value) || value === "0") {
      setData({ ...data, distance: value });
    }
  };

  const calculatePrice = () => {
    const loadersCount = parseInt(data.loaders) || 0;
    const oneWayDistance = parseInt(data.distance) || 0;
    const roundTripDistance = oneWayDistance * 2;
    const loadersPrice = loadersCount * 20;

    if (data.zone === "city") {
      return 40 + loadersPrice;
    } else {
      return Math.round(1.2 * roundTripDistance + 40) + loadersPrice;
    }
  };

  const price = calculatePrice();
  const loadersCount = parseInt(data.loaders) || 0;
  const oneWayDistance = parseInt(data.distance) || 0;
  const roundTripDistance = oneWayDistance * 2;

  return (
    <section id="calc" className="calculator-section">
      <div className="container">
        <h2 className="section-title">Калькулятор стоимости</h2>
        <p className="section-subtitle">Предварительный расчёт за 10 секунд</p>
        <div className="calc-wrap">
          <div className="calc-row">
            <div className="calc-field">
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
            <div className="calc-field">
              <label>Количество грузчиков</label>
              <input
                type="number"
                min="0"
                max="10"
                value={data.loaders}
                onChange={handleLoadersChange}
                placeholder="1"
              />
            </div>
          </div>

          {data.zone !== "city" && (
            <div className="calc-row">
              <div className="calc-field">
                <label>Расстояние до точки, км</label>
                <input
                  type="number"
                  min="1"
                  value={data.distance}
                  onChange={handleDistanceChange}
                  placeholder="Введите расстояние"
                />
                <small className="calc-hint">
                  💡 Расчёт идёт туда-обратно:{" "}
                  {oneWayDistance > 0
                    ? `${oneWayDistance} × 2 = ${roundTripDistance} км`
                    : ""}
                </small>
              </div>
              <div className="calc-field"></div>
            </div>
          )}

          <div className="calc-result">
            Примерная стоимость:{" "}
            <strong>{price.toLocaleString("ru-RU")} BYN</strong>
            <div className="calc-details">
              {data.zone === "city" ? (
                "Фиксированная ставка по городу"
              ) : (
                <>
                  Маршрут: {oneWayDistance} км (туда-обратно:{" "}
                  {roundTripDistance} км)
                  <br />
                  Грузчиков: {loadersCount} × 20 BYN
                </>
              )}
            </div>
          </div>

          {data.zone !== "city" && oneWayDistance > 0 && (
            <div className="calc-notice">
              <strong>️ Важно:</strong> Стоимость включает обратный путь (
              {roundTripDistance} км), так как машина должна вернуться после
              доставки груза.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
