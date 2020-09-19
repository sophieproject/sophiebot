require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
const TOKEN = process.env.TOKEN;
function ageCheck(string, a, b) { 
    const found = string.match(/\d{2,3}/gm) 
    let containsNumber = false 
    for (let i = 0; i < found.length; i++) { 
      const number = parseInt(found[i]) 
      if (number > a && number < b) { 
        containsNumber = true 
      } 
    } 
    return containsNumber 
  } 


bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`); // Log when deployed
      bot.on("guildCreate", guild => {
      guild.members.fetch()
      memberIDs = guild.members.cache.keyArray()
      let dbraw = fs.readFileSync('db.json');
      var db = JSON.parse(dbraw);
      for (var i = 0; i < memberIDs.length; i++) {
          if (db.memberIDs[i] == "P") {
            guild.members.kick(member.id);
          }
      }
      });

      bot.on("guildMemberAdd", member => {
        console.log("New Member");
        let dbraw = fs.readFileSync('db.json');
        var db = JSON.parse(dbraw);
            if (db[member.id].includes("Pedophile")) {
              console.log("Pedophile found!");
              msg.channel.send({
                embed: {
                  color: "e74c3c",
                  author: {
                    name: bot.user.username
                  },
                  title: "WARNING",
                  description: `<@${member.id}>, a verified pedophile, has been detected. Proceed with extreme caution!`,
                  timestamp: new Date(),
                  footer: {
                    text:
                      "This bot is not 100% accurate and results may be flawed or incorrect."
                  }
                }
              });
              //
              guild.members.kick(member.id);
            }
        
      });
    });
  
bot.on("message", msg => {
    if (msg.author.bot) return; // stop if it's a bot
    if (msg.content == "Sophie End Process" && msg.author.id == "367352445657022484") { // if an Admin calls for the bot's termination
        console.error(`ADMIN_TERMINATED_PROCESS \n Admin: ${msg.author.id} \n Via: Discord \n GRACEFUL TERMINATION`)
        process.exit("ADMIN_TERMINATED_PROCESS");
      } else if (msg.content == "Sophie Add Alert" && msg.author.id == "367352445657022484") {
        db.msg.mentions.users.first() = "A";
        msg.channel.send("I have put an alert for that user.")
        fs.writeFileSync('db.json', db);
    } else if (msg.content == "Sophie Add Warning" && msg.author.id == "367352445657022484") {
        db.msg.mentions.users.first() = "P";
        msg.channel.send("I have put a warning out for that user.")
        fs.writeFileSync('db.json', db);
      } else {
        let dbraw = fs.readFileSync('db.json');
        var db = JSON.parse(dbraw);
        if (
            msg.content.toLowerCase().includes("i'm") ||
            msg.content.toLowerCase().includes("im") ||
            msg.content.toLowerCase().includes("i am") ||
            msg.content.toLowerCase().includes("age:") ||
            msg.content.toLowerCase().includes("age :") 
          ) {
              if (ageCheck(msg.content.toLowerCase(), "8", "100")) {
            // Check if an age was specified
            // if it was, upon update let data = JSON.stringify(db);
            if (ageCheck(msg.content.toLowerCase(), "8", "15")){
                if (db[msg.author.id] in {1: "P", 2: "S", 3: "YA", 4: "A"}) {
                    msg.channel.send({
                        embed: {
                          color: "e74c3c",
                          author: {
                            name: bot.user.username
                          },
                          title: "WARNING",
                          description:
                            "This user has claimed to be older in the past, proceed with extreme caution!",
                          timestamp: new Date(),
                          footer: {
                            text:
                              "This bot is not 100% accurate and results may be flawed or incorrect."
                          }
                        }
                      });
                } else {
                    db.msg.author.id = "M";
                    fs.writeFileSync('db.json', db);
                }
            } else if (ageCheck(msg.content.toLowerCase(), "15", "19")) {
                if (db[msg.author.id] in {1: "P", 2: "S", 3: "A"}) {
                    msg.channel.send({
                        embed: {
                          color: "e74c3c",
                          author: {
                            name: bot.user.username
                          },
                          title: "WARNING",
                          description:
                            "This user has claimed to be older in the past, proceed with extreme caution!",
                          timestamp: new Date(),
                          footer: {
                            text:
                              "This bot is not 100% accurate and results may be flawed or incorrect."
                          }
                        }
                      });
                } else {
                    db.msg.author.id = "YA";
                    fs.writeFileSync('db.json', db);
                }
            } else if (ageCheck(msg.content.toLowerCase(), "19", "100")) {
                if (db[msg.author.id] in {1: "S"}) {
                    msg.channel.send({
                        embed: {
                          color: "e74c3c",
                          author: {
                            name: bot.user.username
                          },
                          title: "ALERT",
                          description:
                            "This user has been flagged by the Sophie Investigations Team as suspicious, proceed with caution!",
                          timestamp: new Date(),
                          footer: {
                            text:
                              `This warning can be removed if <@${msg.author.id}> contacts Sophie Investigations to get the flag removed.`
                          }
                        }
                      });
                    } else if (db[msg.author.id] in {1: "P"}) {
                        msg.channel.send({
                            embed: {
                              color: "e74c3c",
                              author: {
                                name: bot.user.username
                              },
                              title: "WARNING",
                              description:
                                "This user may be a pedophile, proceed with extreme caution!",
                              timestamp: new Date(),
                              footer: {
                                text:
                                  "This bot is not 100% accurate and results may be flawed or incorrect."
                              }
                            }
                          });
                    } else {
                    db.msg.author.id = "A";
                    fs.writeFileSync('db.json', db);
                }
            }
        }
          } else {
            var explicit = fs.readFileSync('explicit.txt').toString().split("\n");
            for (var i = 0; i < explicit.length; i++) {
                if (msg.content.toLowerCase().includes(explicit[i])) {
                  console.log("Explicit Language Detected");
                        if (err) {
                          msg.channel.send({
                            embed: {
                              color: "f1c40f",
                              author: {
                                name: bot.user.username
                              },
                              title: "Alert!",
                              description:
                                "I could not find this user's age in my database. Proceed with caution!",
                              timestamp: new Date(),
                              footer: {
                                text: `Psst! You can set your age by saying "I am (age)", that way you won't be flagged again!`
                              }
                            }
                          });
                        } else {
                          if (result.includes("Adult")) {
                            msg.channel.send({
                              embed: {
                                color: "e74c3c",
                                author: {
                                  name: bot.user.username
                                },
                                title: "WARNING",
                                description:
                                  "This user may be an adult! Please proceed with extreme caution!",
                                timestamp: new Date(),
                                footer: {
                                  text:
                                    "This bot is not 100% accurate and results may be flawed or incorrect."
                                }
                              }
                            });
                          }
                        }
                }
              }
          } // After Explicit Checks
      }

    // on message reload Database



});
bot.login(TOKEN);

