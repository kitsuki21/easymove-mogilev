// 1. Импортируем картинки как переменные (укажите ваши реальные расширения: .jpg, .png или .webp)
import buildingMat from "../assets/building_mat.jpg";
import moto from "../assets/moto.jpg";
import tree from "../assets/tree.jpg";
import rolls from "../assets/black.jpg";
import piano from "../assets/piano.jpg";
import furniture from "../assets/furniture.jpg";

export default function Fleet() {
  // 2. Используем импортированные переменные вместо строк
  const cargoTypes = [
    {
      img: buildingMat, // <-- Здесь переменная, а не строка в кавычках
      title: "Стройматериалы",
      text: "Цемент, сухие смеси, кирпич и другие строительные материалы",
    },
    {
      img: moto,
      title: "Мототехника",
      text: "Безопасная перевозка мотоциклов с надёжным креплением ремнями",
    },
    {
      img: tree,
      title: "Пиломатериалы и лес",
      text: "Перевозка брёвен, досок и пиломатериалов с фиксацией груза",
    },
    {
      img: rolls,
      title: "Рулонные материалы",
      text: "Плёнка, сетка, рубероид и другие материалы в рулонах",
    },
    {
      img: piano,
      title: "Крупногабаритные грузы",
      text: "Пианино и хрупкие грузы с аккуратной погрузкой и креплением",
    },
    {
      img: furniture,
      title: "Корпусная мебель",
      text: "Перевозка кухонь, шкафов-купе и мебельных гарнитуров в разобранном виде",
    },
  ];

  return (
    <section id="fleet">
      <div className="container">
        <h2 className="section-title">Что мы перевозим</h2>
        <p className="section-subtitle">
          Реальные примеры грузов наших клиентов
        </p>
        <div className="fleet-grid">
          {cargoTypes.map((cargo, i) => (
            <div key={i} className="fleet-card">
              <img
                src={cargo.img}
                alt={`Грузоперевозка: ${cargo.title} в Могилёве и по Беларуси`}
                loading="lazy"
              />
              <div className="fleet-info">
                <h3>{cargo.title}</h3>
                <p>{cargo.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
