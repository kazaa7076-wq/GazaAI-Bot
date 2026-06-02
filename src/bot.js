require("dotenv").config();

const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");

if (!process.env.BOT_TOKEN) {
console.error("BOT_TOKEN not found");
process.exit(1);
}

if (!process.env.GROQ_API_KEY) {
console.error("GROQ_API_KEY not found");
process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
ctx.reply("🤖 سلام! من GazaAI هستم. هر سوالی داری بپرس.");
});

bot.on("text", async (ctx) => {
try {
const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "llama-3.3-70b-versatile",
messages: [
{
role: "system",
content: "You are a helpful Persian AI assistant. Answer in Persian."
},
{
role: "user",
content: ctx.message.text
}
]
})
}
);

```
const data = await response.json();

if (!response.ok) {
  console.error("GROQ ERROR:", data);
  return ctx.reply("❌ خطا در پاسخ هوش مصنوعی");
}

const answer =
  data &&
  data.choices &&
  data.choices[0] &&
  data.choices[0].message &&
  data.choices[0].message.content;

if (!answer) {
  console.error("INVALID RESPONSE:", data);
  return ctx.reply("❌ پاسخی دریافت نشد");
}

await ctx.reply(answer);
```

} catch (error) {
console.error("FULL ERROR:", error);
onsole.error("FULL ERROR MESSAGE:", error.message);
console.error("FULL ERROR OBJECT:", error);
await ctx.reply("ERROR: " + error.message)
}
});

bot.launch();

console.log("🚀 GazaAI Bot Started");
