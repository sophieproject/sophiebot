require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
//
const TOKEN = process.env.TOKEN;
bot.on('ready', () => {
            console.info(`Logged in as ${bot.user.tag}!`); // active

            //declaring some variables
            age = ["i", "i'm", "i am"];
            minornumber = ["10", "11", "12", "13", "14", "15", "16"]
            adultnumber = ["21"];
            youngadultnumber = ["17", "18", "19"]; // unfortunatly this doesn't protect against lies - but if an age has already been filled it'll say so
            explicit = [];

            bot.on('message', msg => {
                // confirm ages
                for (var i = 0; i < age.length; i++) {
                    if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(minornumber[i])) {
                        msg.channel.send(`Age confirmed: Minor \n ID: ${msg.author.id}`);
                        fs.readFile(`db/${msg.author.id}`, 'utf8', function(err, data) {
                                userage = (data);
                                if (fs.existsSync(`${msg.author.id}`) && userage == "Adult" || fs.existsSync(`${msg.author.id}`) && userage == "Young Adult" || fs.existsSync(`${msg.author.id}`) && userage == "Pedophile") {
                                  message.channel.send({
                                      embed: {
                                          color: e74c3c,
                                          author: {
                                              name: client.user.username,
                                              icon_url: client.user.avatarURL
                                          },
                                          title: "WARNING",
                                          description: "This user has claimed to be older in the past, proceed with extreme caution!",
                                          timestamp: new Date(),
                                          footer: {
                                              text: "This bot is not 100% accurate and results may be flawed or incorrect."
                                          }
                                      }
                                  });
                                } else {
                                    fs.writeFile(`db/${msg.author.id}`, "Minor", function(err) {
                                        if (err) {
                                            return console.log(err);
                                        }
                                        msg.channel.send("Age saved!");
                                    });
                                    break;
                                }
                            });
                        }



                    for (var i = 0; i < age.length; i++) {
                        if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(adultnumber[i])) {
                            msg.channel.send(`Age confirmed: Adult \n ID: ${msg.author.id}`);
                            fs.writeFile(`db/${msg.author.id}`, "Adult", function(err) {
                                if (err) {
                                    return console.log(err);
                                }
                                msg.channel.send("Age saved!");
                            });
                        }
                        break;
                    }
                }


                for (var i = 0; i < age.length; i++) {
                    if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(youngadultnumber[i])) {
                        msg.channel.send(`Age confirmed: Young Adult \n ID: ${msg.author.id}`);
                        fs.writeFile(`db/${msg.author.id}`, "Young Adult", function(err) {
                            if (err) {
                                return console.log(err);
                            }
                            msg.channel.send("Age saved!");
                        });
                        break;
                    }
                }



                for (var i = 0; i < explicit.length; i++) {
                    fs.readFile(`db/${msg.author.id}`, 'utf8', function(err, data) {
                        if (err) {
                            console.log(err);
                            message.channel.send({
                                embed: {
                                    color: f1c40f,
                                    author: {
                                        name: client.user.username,
                                        icon_url: client.user.avatarURL
                                    },
                                    title: "Alert!",
                                    description: "I could not find this user's age in my database. Proceed with caution!",
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Psst! You can set your age by saying "I am (age)", that way you won't be flagged again!`
                                    }
                                }
                            });
                        }
                        userage = (data);
                    });
                    if (msg.content.toLowerCase().includes(explicit[i]) && userage == Adult {
                            message.channel.send({
                                embed: {
                                    color: e74c3c,
                                    author: {
                                        name: client.user.username,
                                        icon_url: client.user.avatarURL
                                    },
                                    title: "WARNING",
                                    description: "This user may be an adult! Please proceed with extreme caution!",
                                    timestamp: new Date(),
                                    footer: {
                                        text: "This bot is not 100% accurate and results may be flawed or incorrect."
                                    }
                                }
                            });
                        }
                        if (msg.content.toLowerCase().includes(explicit[i]) && userage == Pedophile {
                                message.channel.send({
                                    embed: {
                                        color: e74c3c,
                                        author: {
                                            name: client.user.username,
                                            icon_url: client.user.avatarURL
                                        },
                                        title: "WARNING",
                                        description: `@${msg.author.id}, a verified pedophile, has been detected. Proceed with extreme caution!`,
                                        timestamp: new Date(),
                                        footer: {
                                            text: "This bot is not 100% accurate and results may be flawed or incorrect."
                                        }
                                    }
                                });
                            }
                        }

                        /*
                        // IF FILE NOT FOUND


                        // IF AGE MISMATCH


                        // IF ADULT -> CHILD


                        // IF PRETEEN -> CHILD
                        message.channel.send({embed: {
                            color: f1c40f,
                            author: {
                              name: client.user.username,
                              icon_url: client.user.avatarURL
                            },
                            title: "ALERT",
                            description: "This user is 16-19, please proceed with caution.",
                            timestamp: new Date(),
                            footer: {
                              text: "This bot is not 100% accurate and results may be flawed or incorrect."
                            }
                          }
                        });

                        // IF PEDOPHILE (banned)

                        */

                        // EOC
                    });
            });
            bot.login(TOKEN);
