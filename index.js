require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
//
const TOKEN = process.env.TOKEN;
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "fuckpedos",
  password: "password",
  database: "pedodb"
});
});
age = ["i am 13", "i am 14", "i am 15", "i am 16", "i am 17"]
bot.on('message', msg => {
message = msg.content.toLowerCase();
ageconfirmed = age.includes(message);
if (ageconfirmed == true) {
  msg.channel.send("Age confirmed")
}

});
bot.login(TOKEN);
