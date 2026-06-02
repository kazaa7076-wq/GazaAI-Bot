require("dotenv").config();


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
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful Persian AI assistant." },
        { role: "user", content: userText }
      ]
    });

    catch (err) {
  console.error("ERROR MESSAGE:", err.message);
  console.error("ERROR STATUS:", err.status);

  try {
    console.error("ERROR JSON:", JSON.stringify(err, null, 2));
  } catch {}

  await ctx.reply("❌ خطا در ارتباط با هوش مصنوعی");
}
  
});

bot.launch();
console.log("🚀 GazaAI Bot Started");
