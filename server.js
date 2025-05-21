import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;

app.post('/webhook', async (req, res) => {
  const message = req.body.message;

  if (message && message.text === '/start') {
    const chatId = message.chat.id;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
      text: `*Добро пожаловать в Web3/Crypto University!*

Ты оказался на территории свободного мышления, анархии и антихрупкого образования.

Здесь мы не просим разрешения у банков. Мы учимся, как обходить систему, хранить свободу и приумножать активы.

---

*Что нужно для старта?*

1. **Кошелёк и контроль над своими ключами**
2. **Биржа для пополнения** — выбери и зарегистрируйся:

- [Binance](https://accounts.binance.com/register?ref=477681384)
- [Bybit](https://www.bybit.com/invite?ref=B1XGLW)
- [Evedex](https://invite.evedex.com/ixjrpwo4)
- [Bingx](https://bingx.com/invite/4KQ2KY/)

3. **Желание стать независимым**.

---

Нажми кнопку ниже и начни обучение прямо в Telegram:
`,
      reply_markup: {
        inline_keyboard: [[
          {
            text: "🚀 Начать обучение",
            web_app: {
              url: "https://t.me/Web3CryptoUniversity_bot?startapp"
            }
          }
        ]]
      }
    });

    return res.sendStatus(200);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
