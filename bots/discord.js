const main = require("../core.js"); // require SQLite functions, logging, etc
// we packaged everything in core.js to make it easier to fix bugs and add more bots
require("dotenv").config();
const Discord = require("discord.js");
const fetch = require("node-fetch")
exports.init = async function init() {
	main.log("Starting Discord bot initiation sequence.");
	main.log("Loading configuration (3/3)");
	const DiscordToken = process.env.DiscordToken;
	const bot = new Discord.Client();

	function warning(msg, warning) {
		if (!msg.guild.me.hasPermission("SEND_MESSAGES")) return;
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
						return ("true")
					} else {
						resolve("false")
						return ("false")
					}
				}).catch();
			});
		});
	}
	main.log("Configuration loaded! (3/3)");
	bot.on("ready", () => {
		main.log("Sophie is active on Discord!");
	});
	bot.on("guildMemberAdd", async member => {
		memberPoints = await main.userPoints(member.id)
		if (memberPoints == "P") {
			member.kick().catch();
		}
	}); // this will remove the pedophiles when they join back, making a softban
	bot.on("message", async msg => {
		bot.user.setActivity(`${(bot.guilds.fetch, bot.guilds.cache.size)} servers`, {
			type: "WATCHING"
		});
		if (msg.author.bot) return;
		let smain = await main.userPoints(msg.author.id);
		if (smain == "P") {
			if (msg.channel.type == "dm") return;
			msg.member.kick().catch();
			return;
		} else if (smain > 10 || smain == 404) {
			//add a setting to change this
			msg.delete().catch();
			return;
			// not kicking because there is time for an appeal
		}
		messageContent = msg.content.replace(/\//g, "")
		const body = {
			text: messageContent,
		}
		fetch("http://localhost:5005/model/parse/", {
				method: "post",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(res => res.json()) //res.json()
			.then(json => {
				var message = json
				if (message.intent.name == "None" || message.intent.name == 0) return;
				match = msg.content.match(/(\d+)/); // this system is temp but nlpjs has broken entity extraction
				if (message.intent.name == "AGE" && match !== null) {
					var currentAge = main.userAge(main.hashUsername(msg.author.id));
					if (match == currentAge) return;
					var queryResult = query(msg, `You claimed to be ${match[0]} years old, correct?`, msg.author)
					if (queryResult == "true") {
						var validBirthday = main.userBirthday(msg.author.id, match[0])
						if (validBirthday == 606) {
							warning(msg, "This user is claiming to be inconsistent ages. Proceed with caution.")
						}
					}
				} else {
					if (message.intent.name >= 1) {
						main.addStrike(msg.author.id, message.intent.name, message.intent.confidence, msg.content);
						if (message.intent.name > 1) {
							warning(msg, "This user has a strike investigation pending. Proceed with caution.")
						}
					}
				}
			}).catch((error) => {
				main.log(error)
			})
	});
	bot.login(DiscordToken);
};
// start the INIT sequence