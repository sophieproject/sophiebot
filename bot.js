require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
//
const TOKEN = process.env.TOKEN;
const SQLUSERNAME = process.env.SQLUSERNAME;
const SQLPASSWORD= process.env.SQLPASSWORD;
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  /*
  var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: (SQLUSERNAME),
  password: (SQLPASSWORD),
  database: "pedodb"
});
*/
bot.on('message', msg => {
  // confirm ages
    age = ["i", "i'm", "i am"];
    minornumber = ["10", "11", "12", "13", "14", "15", "16"]
    adultnumber = ["21"];
    youngadultnumber = ["17", "18", "19"];

for (var i = 0; i < age.length; i++) {
if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(minornumber[i])) {
  msg.channel.send(`Age confirmed: Minor \n ID: ${msg.author.id}`);
  break;
}
}
for (var i = 0; i < age.length; i++) {
if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(adultnumber[i])) {
  msg.channel.send(`Age confirmed: Adult \n ID: ${msg.author.id}`);
  break;
}
}
for (var i = 0; i < age.length; i++) {
if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(youngadultnumber[i])) {
  msg.channel.send(`Age confirmed: Young Adult \n ID: ${msg.author.id}`);
  break;
}
}

});
});
bot.login(TOKEN);
