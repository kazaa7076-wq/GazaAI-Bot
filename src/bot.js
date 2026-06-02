require("dotenv").config();

const { Telegraf } = require("telegraf");
const OpenAI = require("openai");

const bot = new Telegraf(process.env.BOT_TOKEN);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.start((ctx) => {
  ctx.reply(
    "🤖 سلام!\n\nمن GazaAI هستم.\nهر سوالی داری بپرس."
  );
});

bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text;

    if (userMessage === "/start") return;

    await ctx.reply("⏳ در حال فکر کردن...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful Persian AI assistant.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    await ctx.reply(response.choices[0].message.content);
  } catch (error) {
    console.error(error);

    await ctx.reply(
      "❌ خطا در ارتباط با هوش مصنوعی"
    );
  }
});

bot.launch();

console.log("🚀 GazaAI Bot Started");