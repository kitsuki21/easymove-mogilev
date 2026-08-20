exports.handler = async function (event) {
  // Разрешаем только POST запросы
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    // Получаем данные из формы
    const { name, phone, msg } = JSON.parse(event.body);

    // Проверяем обязательные поля
    if (!name || !phone || !msg) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Заполните все поля" }),
      };
    }

    // Данные для отправки в Telegram
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Telegram не настроен" }),
      };
    }

    // Формируем сообщение
    const message = `
🚚 <b>Новая заявка с сайта esyMoveMogilev</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
💬 <b>Комментарий:</b> ${msg}

📅 <b>Дата:</b> ${new Date().toLocaleString("ru-RU")}
    `.trim();

    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Ошибка отправки в Telegram" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Заявка отправлена" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Внутренняя ошибка сервера" }),
    };
  }
};
