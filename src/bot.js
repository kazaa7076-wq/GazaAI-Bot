require("dotenv").config();

const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
ctx.reply(
"🚀 به ربات تولید محتوای اینستاگرام خوش آمدید",
Markup.keyboard([
["📝 تولید کپشن", "🎬 ایده ریلز"],
["#️⃣ هشتگ", "📢 متن تبلیغاتی"],
["👑 خرید اشتراک", "ℹ️ راهنما"]
]).resize()
);
});

bot.hears("📝 تولید کپشن", (ctx) => {
ctx.reply("موضوع کپشن را ارسال کنید.\nمثال: فروش موبایل");
});

bot.hears("🎬 ایده ریلز", (ctx) => {
ctx.reply("موضوع ریلز را ارسال کنید.");
});

bot.hears("#️⃣ هشتگ", (ctx) => {
ctx.reply("موضوع را ارسال کنید تا هشتگ دریافت کنید.");
});

bot.hears("📢 متن تبلیغاتی", (ctx) => {
ctx.reply("موضوع تبلیغ را ارسال کنید.");
});

bot.hears("👑 خرید اشتراک", (ctx) => {
ctx.reply(
"نسخه ویژه:\n\n✅ تولید محتوای بیشتر\n✅ ایده‌های حرفه‌ای\n✅ پشتیبانی ویژه\n\nبرای خرید با ادمین تماس بگیرید."
);
});

bot.hears("ℹ️ راهنما", (ctx) => {
ctx.reply(
"از منوی پایین گزینه مورد نظر را انتخاب کنید."
);
});

bot.on("text", (ctx) => {
const text = ctx.message.text;

if (
text.startsWith("📝") ||
text.startsWith("🎬") ||
text.startsWith("#️⃣") ||
text.startsWith("📢") ||
text.startsWith("👑") ||
text.startsWith("ℹ️")
) {
return;
}

ctx.reply(
`📌 نمونه محتوا برای:\n${text}\n\n✨ اینجا بعداً تولید محتوای هوشمند اضافه می‌شود.`
);
});

bot.launch();

console.log("🚀 Content Bot Started");
