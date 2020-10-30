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
   const fetch = require("node-fetch");
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
   
   function update(username, age, points) {
	 const sql = `INSERT INTO users (Username, Age, Points) VALUES('${username}', '${age}', '${points}) ON DUPLICATE KEY UPDATE Flag='${age}', '${points}`;
	 db.query(sql, function(err) {
	   if (err) throw err;
	   console.log(
		 `Database Updated \n '${db.query(
		   `SELECT Username, Age, Points FROM users WHERE Username = ${username}`
		 )}'`
	   );
	 });
   }
   
   bot.on("ready", () => {
	 db.connect(function(err) {
	   if (err) throw err;
	 });
   
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
	   msg.member({
		embed: {
		  color: "7289da",
		  author: {
			name: bot.user.username
		  },
		  title: "Privacy",
		  description: `Hey there! This server has Sophie installed in it - this means Sophie will be logging any suspicious actvity. If you don't say anything explicit, then it's nothing to worry about - we will always notifiy you when we see suspicious activity and when your messages are logged.`,
		  timestamp: new Date(),
		  footer: {
			text: `https://thesophieproject.github.com/privacy has more information - by continuing in this server, you agree to these terms.`
		  }
		}
	  })
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
	   // These are all the functions that make the code work
   
	   function AGE(confidence, age) {
		 msg.author
		   .send({
			 embed: {
			   color: "7289da",
			   author: {
				 name: bot.user.username
			   },
			   title: "Age Verification",
			   description: `Hello, ${msg.author.username}! I think you were trying to set your age! Just to confirm, you are ${age}, right?`,
			   timestamp: new Date(),
			   footer: {
				 text: `Just for the record, I was ${confidence}% sure you were trying to get your age.`
			   }
			 }
		   })
		   .then(msg => {
			 msg.react("👍").then(() => msg.react("👎"));
   
			 const filter = (reaction, user) => {
			   return (
				 ["👍", "👎"].includes(reaction.emoji.name) &&
				 user.id === msg.author.id
			   );
			 };
   
			 message
			   .awaitReactions(filter, {
				 max: 1,
				 time: 600000000,
				 errors: ["time"]
			   })
			   .then(collected => {
				 const reaction = collected.first();
   
				 if (reaction.emoji.name === "👍") {
				   // Yes, they are the age - update database
				 }
			   })
			   .catch(collected => {
				 // Ignore
			   });
		   });
	   }
   
	   // ---
   
	   const body = {
		 text: msg.content,
		 message_id: msg.id
	   };
   
	   fetch("http://localhost:5005/model/parse", {
		 method: "post",
		 body: JSON.stringify(body),
		 headers: { "Content-Type": "application/json" }
	   })
		 .then(res => {
		   res.json(); //res.json()
		 })
		 .then(json => {
		   const result = json;
		   console.log(result.intent);
		   console.log(result.intent.name);
		   console.log(result.intent.confidence);
		   window[result.intent.name](
			 result.intent.confidence,
			 result.entities.age
		   );
		 })
		 .catch(err => console.log(err));
	 });
   });
   
   bot.login(DiscordToken);