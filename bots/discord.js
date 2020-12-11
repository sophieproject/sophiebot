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
    bot.on("guildCreate", guild => {
      // this is for removing all pedophiles in guild
      const blacklist = main.allPedophiles();
      for (let i = 0; i < blacklist.length; i++) {
        // remove all marked pedophiles
        guild.members.kick(blacklist[i]).catch();
      } // this doesn't protect from pedophiles added to the database after the bot joined
    });
  });

  bot.on("guildMemberAdd", member => {
    if (main.userPoints(member.id) == "P") {
      member.kick().catch();
    }
  }); // this will remove the pedophiles when they join back, making a softban

  bot.on("message", msg => {
    if (msg.author.bot) return;
      const smain = main.userPoints(msg.author.id)
        console.log(smain + " awaited")
        if (smain == "P") {
          if(msg.channel.type == "dm") return;
          msg.author.kick().catch();
          msg.delete()
          return;
        }
        if (smain === undefined) {
          // AOK! msg.channel.send(msg.author.id);
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
        const message = main.msgCheck(msg.content);
        // intent handling here
        console.log(message)
    });

  bot.login(DiscordToken);
}
// start the INIT sequence

module.exports = init();
