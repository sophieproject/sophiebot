const core = require('C:/Users/billy/Documents/GitHub/thesophiebot/core.js') // require SQLite functions, logging, etc
// we packaged everything in core.js to make it easier to fix bugs and add more bots
require('dotenv').config();
const Discord = require('discord.js');
const { dockStart } = require('@nlpjs/basic');


function init() {
core.log("Starting Discord bot initiation sequence.")

(async () => {
  core.log("Loading configuration (3/?)")
  DiscordToken = process.env.DiscordToken;
  const bot = new Discord.Client();
  core.log("Configuration loaded! (3/?)")

  bot.on("ready", () => {
      core.log("Sophie is online!")
      bot.user.setActivity("the chats.", {type: "WATCHING"});
    bot.on('guildCreate', (guild) => { // this is for removing all pedophiles in guild
        blacklist = core.allPedophiles()
          for (let i = 0; i < blacklist.length; i++) {
            // remove all marked pedophiles
            guild.members.kick(blacklist[i]).catch()
          } // this doesn't protect from pedophiles added to the database after the bot joined
        });
      });

      bot.on('guildMemberAdd', (member) => {
        if(core.userPoints(member.id) = "P") {
              member.kick().catch()
            }
      }); // this will remove the pedophiles when they join back, making a softban

    bot.on("message", msg => {
        const score = core.userPoints(msg.author.id)
        if (score = "P"){ msg.author.kick().catch(); return; }
        if (score = "404") {
            msg.author.createDM().then(() => {
                msg.author
                    .send(
                        'Hey there! This server has Sophie installed! Please state your age (\'I am 15\', for example) to be able to speak in this server. By doing this, you agree to our Privacy Policy. This means we will log your ID, age, and any messages we find suspicious. Most messages will not be logged, and we will always tell you when we log them!',
                    )
                    .catch(() =>
                      msg.reply(
                          'Hey there! This server has Sophie installed! Please state your age (\'I am 15\', for example) in Sophie\'s DMs to be able to speak in this server. By doing this, you agree to our Privacy Policy. This means we will log your ID, age, and any messages we find suspicious. Most messages will not be logged, and we will always tell you when we log them!',
                      ),
                    );
              });
              msg.delete();
              return;
        }
        if (score > 10) { // add a setting to change this
           msg.delete();
           return;
           // not kicking because there is time for an appeal
        }
        const message = core.msgcheck(msg)
        // intent handling here
        console.log(message)
    });
  });
  bot.login(DiscordToken);
}
 // start the INIT sequence

module.exports = init();