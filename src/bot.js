require("dotenv").config();

const { Telegraf } = require("telegraf");

console.log("BOT =", !!process.env.BOT_TOKEN);
console.log("GROQ =", !!process.env.GROQ_API_KEY);

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
Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
model: "llama-3.3-70b-versatile",
messages: [
{
role: "system",
content: "You are a helpful Persian AI assistant.",
},
{
role: "user",
content: ctx.message.text,
},
],
}),
}
);

```
const data = await response.json();

console.log("GROQ RESPONSE:", JSON.stringify(data));

if (!response.ok) {
  return ctx.reply("❌ خطا در ارتباط با Groq");
}

const answer = data.choices?.[0]?.message?.content;

if (!answer) {
  return ctx.reply("❌ پاسخی از هوش مصنوعی دریافت نشد");
}

await ctx.reply(answer);
```

} catch (err) {
console.error("FULL ERROR:", err);
await ctx.reply("❌ خطا در ارتباط با هوش مصنوعی");
}
});

bot.launch();
console.log("🚀 GazaAI Bot Started");
