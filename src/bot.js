
console.log("OPENAI =", process.env.OPENAI_API_KEY);

const { Telegraf } = require("telegraf");
const OpenAI = require("openai");

const bot = new Telegraf(process.env.BOT_TOKEN);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.start((ctx) => {
  ctx.reply("🤖 سلام! من GazaAI هستم. هر سوالی داری بپرس.");
});

bot.on("text", async (ctx) => {
  try {
    const userText = ctx.message.text;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful Persian AI assistant." },
        { role: "user", content: userText }
      ]
    });

    await ctx.reply(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    await ctx.reply("❌ خطا در ارتباط با هوش مصنوعی");
  }
});

bot.launch();
console.log("🚀 GazaAI Bot Started");
