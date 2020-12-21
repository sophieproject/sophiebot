const main = require("../core.js"); // require SQLite functions, logging, etc
// we packaged everything in core.js to make it easier to fix bugs and add more bots
require("dotenv").config();
const Discord = require("discord.js");

exports.init = async function init(nlp) {
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
      console.log("User Points: " + smain)
        if (smain == "P") {
          if(msg.channel.type == "dm") return;
          msg.member.kick().catch();
          return;
        }
        if (smain > 10) {
          // add a setting to change this
          msg.delete().catch()
          return;
          // not kicking because there is time for an appeal
        }
        const message = await main.msgCheck(msg.content, nlp);
        // intent handling here
        main.addStrike(msg.author.id, message.intent, message.score)
      }
      onmessage(msg)
    });
  

    bot.login(DiscordToken);
}
// start the INIT sequence
