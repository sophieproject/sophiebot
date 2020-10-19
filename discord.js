/* eslint-disable linebreak-style */ // <- I blame Windows Formatting for that
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// Ignore the above information - just for eslint linting
/* ##################
   #  REQUIREMENTS  #
   ################## */
   require("dotenv").config();
   const Discord = require("discord.js");
   const bot = new Discord.Client();
   const mysql = require("mysql");
   const fs = require("fs");
   /* #########################
		 #  END OFF REQUIREMENTS #
		 ######################### */
   
   /* ###################
		 #  CONFIGURATION  #
		 ################### */
   
   // Change these values in the .env file for security
   const DiscordToken = process.env.DiscordToken;
   const SQLPassword = process.env.SQLPassword;
   const SQLHost = process.env.SQLHost;
   const SQLUser = process.env.SQLUser;
   const SQLDatabase = process.env.SQLDatabase;
   /* #########################
		 #  END OF CONFIGURATION #
		 ######################### */
   
   // Start Connecting to MySQL and Load the Explicit Reg
   const db = mysql.createConnection({
	 // Create and Establish the connection
	 host: SQLHost,
	 user: SQLUser,
	 password: SQLPassword,
	 database: SQLDatabase
   });
   
   bot.on("ready", () => {
	 db.connect(function(err) {
	   if (err) throw err;
	 });
	 bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./discord').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./discord/${file}`);
	bot.commands.set(command.name, command);
}
	 console.log("SOPHIE is active!");
   
	 bot.on("guildMemberAdd", member => {
	   db.query(`SELECT * FROM pedodb WHERE ID = ?`, [member.id], function(
		 err,
		 result
	   ) {
		 if (err) throw err;
		 if (result.length > 0) {
		   if (result[0].Flag === "P") {
			 console.log("Pedophile found!");
			 member
			   .kick()
			   .then(console.log("Pedophile Found - Removed"))
			   .catch(console.log("Error on Kick"));
		   }
		 }
	   });
	 });
   
	 bot.on("guildCreate", guild => {
	   db.query(`SELECT * FROM pedodb WHERE Flag = 'P'`, [], function(
		 err,
		 result
	   ) {
		 if (err) throw err;
		 let banned = [];
		 for (let i = 0; i < result.length; i++) {
		   banned.push(result[i].ID);
		 }
		 for (let i = 0; i < banned.length; i++) {
		   guild.members
			 .ban(banned[i])
			 .then(console.log("Pedophile Found - Removed"))
			 .catch(console.log("Error on Kick")); // use this as a fallback - when a new member joins it counts as a message from that user.
		 }
	   });
	 });
   
	 bot.on("message", msg => {
		fetch('https://localhost:5005/webhooks/rest/webhook') 
    .then(res => res.json()) 
	.then(json => console.log(json)); 
	
		bot.commands.get(command).execute(result, args);
	 });
   });
   
   bot.login(DiscordToken);
