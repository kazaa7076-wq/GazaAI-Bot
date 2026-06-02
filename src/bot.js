require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
ctx.reply("🤖 سلام! من GazaAI هستم.");
});

bot.on("text", async (ctx) => {
const text = ctx.message.text.toLowerCase();

if (text.includes("سلام")) {
return ctx.reply("سلام! حالت چطوره؟ 😊");
}

if (text.includes("اسم")) {
return ctx.reply("من GazaAI هستم.");
}

if (text.includes("کمک")) {
return ctx.reply("دستور خاصی بنویس یا سوالت را بپرس.");
}

return ctx.reply("پیامت دریافت شد: " + ctx.message.text);
});

bot.launch();
console.log("🚀 GazaAI Bot Started");
