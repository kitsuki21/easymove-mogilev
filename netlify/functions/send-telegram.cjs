const https = require("https");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Переменные окружения не заданы!");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: "Telegram не настроен" }),
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Неверный формат данных" }),
      };
    }

    const { name, phone, msg } = body;

    if (!name || !phone || !msg) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Заполните все поля" }),
      };
    }

    const message = `🚚 <b>Новая заявка с сайта esyMoveMogilev</b>

 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
💬 <b>Комментарий:</b> ${msg}

📅 <b>Дата:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`;

    const postData = JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML",
    });

    const options = {
      hostname: "api.telegram.org",
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.ok) {
              resolve({
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "Заявка отправлена" }),
              });
            } else {
              console.error("Telegram API error:", parsed);
              resolve({
                statusCode: 500,
                headers,
                body: JSON.stringify({
                  message:
                    "Ошибка Telegram: " + (parsed.description || "неизвестно"),
                }),
              });
            }
          } catch (e) {
            resolve({
              statusCode: 500,
              headers,
              body: JSON.stringify({ message: "Ошибка обработки ответа" }),
            });
          }
        });
      });

      req.on("error", (e) => {
        console.error("Request error:", e);
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ message: "Ошибка сети: " + e.message }),
        });
      });

      req.write(postData);
      req.end();
    });
  } catch (error) {
    console.error("Critical error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Внутренняя ошибка: " + error.message,
      }),
    };
  }
};
