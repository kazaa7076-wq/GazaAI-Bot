const dotenv = require("dotenv");
dotenv.config();

const { Telegraf } = require("telegraf");
const OpenAI = require("openai");

const bot = new Telegraf(process.env.BOT_TOKEN);

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

bot.start((ctx) => {
ctx.reply("🤖 سلام! من GazaAI هستم.");
});

bot.on("text", async (ctx) => {
try {
const completion = await openai.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{
role: "user",
content: ctx.message.text,
},
],
});

```
await ctx.reply(completion.choices[0].message.content);
```

} catch (err) {
console.error("ERROR:", err);
console.error("MESSAGE:", err.message);

```
await ctx.reply("❌ خطا در ارتباط با OpenAI");
```

}
});

bot.launch();
console.log("🚀 Bot Started");
