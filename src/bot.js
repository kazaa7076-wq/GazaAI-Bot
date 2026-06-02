require("dotenv").config();

const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
ctx.reply("🤖 سلام! من GazaAI هستم. هر سوالی داری بپرس.");
});

bot.on("text", async (ctx) => {
try {
const userText = ctx.message.text;

```
const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a helpful Persian AI assistant."
        },
        {
          role: "user",
          content: userText
        }
      ],
      temperature: 0.7
    })
  }
);

const data = await response.json();

if (!response.ok) {
  console.log("GROQ ERROR:", data);
  return ctx.reply("❌ خطا در پاسخ Groq");
}

const answer =
  data?.choices?.[0]?.message?.content ||
  "❌ پاسخی دریافت نشد";

await ctx.reply(answer);
```

} catch (err) {
console.error("FULL ERROR:", err);
await ctx.reply("❌ خطا در ارتباط با هوش مصنوعی");
}
});

bot.launch();

console.log("🚀 GazaAI Bot Started");
