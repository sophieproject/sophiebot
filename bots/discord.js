const main = require("../core.js"); // require SQLite functions, logging, etc
const logins = require("../creds.js")
const Discord = require("discord.js")

exports.init = function () {
    main.log("Sophie is starting on Discord");
    main.log("Loading configuration (1/1)");
    const DiscordToken = logins.DiscordToken
    const bot = new Discord.Client()

    function warning(msg, warning) {
        if (!msg.guild.me.hasPermission("SEND_MESSAGES")) return;
        msg.channel.send(msg.channel.id, {
            embed: {
                color: "e74c3c",
                author: {
                    name: bot.user.username
                },
                title: "WARNING",
                description: warning,
                timestamp: new Date(),
                footer: {
                    text: "If you believe this to be a mistake, contact us at support@sophiefoundation.org"
                }
            }
        })
    }

    function query(msg, query, author) {
        return new Promise((resolve) => {
            msg.author.send({
                embed: {
                    color: "7289da",
                    author: {
                        name: bot.user.username
                    },
                    title: "QUERY",
                    description: query,
                    timestamp: new Date(),
                    footer: {
                        text: "If you believe this to be a mistake, contact us at support@sophiefoundation.org"
                    }
                }
            }).then(msg => {
                msg.react("👍").then(() => msg.react("👎"));
                const filter = (reaction, user) => {
                    return (
                        ["👍", "👎"].includes(reaction.emoji.name) && user.id === author.id);
                };
                msg.awaitReactions(filter, {
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === "👍") {
                        resolve("true")
                        return ("true")
                    } else {
                        resolve("false")
                        return ("false")
                    }
                }).catch();
            });
        });
    }
    main.log("Configuration loaded! (1/1)");
    bot.on("ready", () => {
        main.log("Sophie's Discord Bot has started!");
    });
    bot.on("guildMemberAdd", member => {
        memberPoints = main.userPoints(member.id)
        if (memberPoints == "P") {
            member.kick("Believed to be a pedophile user.").catch();
        }
    }); // this will remove the pedophiles when they join back, making a softban
    bot.on("message", msg => {
        if (msg.author.id == bot.user.id) return;
        if (msg.author.bot) return;
        const startTime = new Date();
        main.log("Message has been recieved")
        main.log("Message recieved at: " + startTime)
        bot.user.setActivity(`${(bot.guilds.fetch, bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0))} users`, {
            type: "WATCHING"
        });
        const username = main.hashUsername(msg.author.id)
        let user = main.userPoints(username);
        if (user == "P") {
            if (msg.channel.type == "dm") {
                main.log("Message processing discarded. Reason: Direct Messages")
                return;
            }
            msg.member.kick("Believed to be a pedophile").catch(main.log("Message processing discarded. Reason: Sender is a pedophile, error removing!"));
            main.log("Message processing discarded. Reason: Sender is a pedophile.")
            return;
        } else if (user > 10 || user == 404) {
            main.log("Message processing discarded. Reason: Max Point Limit reached, message deleted.")
            msg.delete().catch();
            return;
            // not kicking because there is time for an appeal
        }
        main.explicitCheck(msg.content)
            .then(function (json) {
                const message = json
                if (message.score == 'NaN' || message.score == 0) {
                    main.logFinish(startTime)
                    return;
                }
                ageNumber = msg.content.match(/(\d+)/);
                if (message.score == "AGE" && ageNumber !== null) {
                    const currentAge = main.userAge(username);
                    if (ageNumber == currentAge) return;
                    const queryResult = query(msg, `You claimed to be ${match[0]} years old, correct?`, msg.author)
                    if (queryResult == "true") {
                        const validBirthday = main.userBirthday(username, match[0])
                        if (validBirthday == 606) {
                            warning(msg, "This user is claiming to be inconsistent ages. Proceed with caution.")
                        }
                    }
                } else if (message.score == "PII") {
                    msg.delete().catch()
                    warning(msg, "Please refrain from posting personal information in public. This message has been removed for your safety or the safety of others.")
                } else {
                    if (message.score >= 1) {
                        main.addStrike(username, message.points, msg.content);
                        if (message.score > 1) {
                            warning(msg, "This user has a strike investigation pending. Proceed with caution.")
                        }
                    }
                }
            }).catch((error) => {
                main.log(error)
            })
            const finishedTime = new Date
    const timeToExecute = finishedTime - startTime
    main.log("Message processed in " + timeToExecute + " ms")
    responseTimes.push(timeToExecute)
    total = 0
    for (var i = 0; i < responseTimes.length; i++) {
        total += responseTimes[i];
    }
    var averageResponseTime = total / responseTimes.length;
    main.log("Average response time is " + averageResponseTime + " ms")
        return;
    });
    bot.login(DiscordToken)
};