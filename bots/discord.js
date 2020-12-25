const main = require("../core.js"); // require SQLite functions, logging, etc
// we packaged everything in core.js to make it easier to fix bugs and add more bots
require("dotenv").config();
const Discord = require("discord.js");
exports.init = async function init(nlp) {
	main.log("Starting Discord bot initiation sequence.");
	main.log("Loading configuration (3/3)");
	const DiscordToken = process.env.DiscordToken;
	const bot = new Discord.Client();

	function warning(msg, warning) {
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
		msg.channel.send({
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
						return("true")
					} else {
						resolve("false")
						return("false")
					}
        }).catch();
      });
		});
	}
	main.log("Configuration loaded! (3/3)");
	bot.on("ready", () => {
		main.log("Sophie is active on Discord!");
		bot.user.setActivity(`${(bot.guilds.fetch, bot.guilds.cache.size)} servers`, {
			type: "WATCHING"
		});
	});
	bot.on("guildMemberAdd", member => {
		if (main.userPoints(member.id) == "P") {
			member.kick().catch();
		}
	}); // this will remove the pedophiles when they join back, making a softban
	bot.on("message", async msg => {
		if (msg.author.bot) return;
		const smain = await main.userPoints(msg.author.id);
		if (smain == "P") {
			if (msg.channel.type == "dm") return;
			msg.member.kick().catch();
			return;
		}
		if (smain > 10) {
			// add a setting to change this
			msg.delete().catch();
			return;
			// not kicking because there is time for an appeal
		}
		const message = await main.msgCheck(msg.content, nlp);
    if (message.intent == "None") return;
    match = msg.content.match(/(\d+)/); // this system is temp but nlpjs has broken entity extraction
		if (message.intent == "AGE" && match !== null) {
      const currentAge = await main.userAge(main.hashUsername(msg.author.id));
      if (match == currentAge) return;
      var queryr = await query(msg, `You claimed to be ${match[0]} years old, correct?`, msg.author)
			if (queryr == "true") {
        if (await main.userBirthday(msg.author.id, match[0]) == 606) {
					warning(msg, "This user is claiming to be inconsistent ages. Proceed with caution.")
				}
			}
		} else {
      if (message.intent >= 1) {
			main.addStrike(msg.author.id, message.intent, message.score, msg.content);
			if (message.intent > 1) {
				warning(msg, "This user has a strike investigation pending. Proceed with caution.")
			}
    }
  }
	});
	bot.login(DiscordToken);
};
// start the INIT sequence