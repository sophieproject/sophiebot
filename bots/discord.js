const main = require("../core.js"); // require SQLite functions, logging, etc
// we packaged everything in core.js to make it easier to fix bugs and add more bots
require("dotenv").config();
const Discord = require("discord.js");

async function init() {
  main.log("Starting Discord bot initiation sequence.");
  main.log("Loading configuration (3/3)");
  const DiscordToken = process.env.DiscordToken;
  const bot = new Discord.Client();
  main.log("Configuration loaded! (3/3)");

  bot.on("ready", () => {
    main.log("Sophie is active on Discord!");
    bot.user.setActivity("the chats.", { type: "WATCHING" });
  });

  bot.on("guildMemberAdd", member => {
    if (main.userPoints(member.id) == "P") {
      member.kick().catch();
    }
  }); // this will remove the pedophiles when they join back, making a softban

  bot.on("message", msg => {
    async function onmessage(msg) {
    if (msg.author.bot) return;
      const smain = await main.userPoints(msg.author.id)
        if (smain == "P") {
          if(msg.channel.type == "dm") return;
          msg.member.kick().catch();
          return;
        }
        if (smain === undefined) {
          msg.author.createDM().then(() => {
            msg.author
              .send(
                "Hey there! This server has Sophie installed! Please state your age ('I am 15', for example) to be able to speak in this server. By doing this, you agree to our Privacy Policy. This means we will log your ID, age, and any messages we find suspicious. Most messages will not be logged, and we will always tell you when we log them!"
              )
              .catch(() =>
                msg.reply(
                  "Hey there! This server has Sophie installed! Please state your age ('I am 15', for example) in Sophie's DMs to be able to speak in this server. By doing this, you agree to our Privacy Policy. This means we will log your ID, age, and any messages we find suspicious. Most messages will not be logged, and we will always tell you when we log them!"
                )
              );
          });
          if(msg.channel.type == "dm") return;
          msg.delete().catch()
          return;
        }
        if (smain > 10) {
          // add a setting to change this
          msg.delete().catch()
          return;
          // not kicking because there is time for an appeal
        }
        const message = await main.msgCheck(msg.content);
        // intent handling here
        console.log(message)
      }
      onmessage(msg)
    });
  

  bot.login(DiscordToken);
}
// start the INIT sequence

module.exports = init();
