const Discord = require("discord.js");
require("dotenv").config();
const DiscordToken = process.env.DiscordToken;
const bot = new Discord.Client();
const fetch = require("node-fetch");

bot.on("message", async msg => {

    const body = {
        text: msg.content
    }

    fetch("http://localhost:5005/model/parse", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            const result = json
            console.log(result.intent)
        })
        .catch(err => console.log(err))
});

bot.login(DiscordToken)