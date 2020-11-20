/* eslint-disable linebreak-style */ // <- I blame Windows Formatting for that
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// Ignore the above information - just for eslint linting
/* ##################
   #  REQUIREMENTS  #
   ################## */
   require("dotenv").config();
   
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
/*
This project was made by the Sophie Foundation and
is protected under the MIT License.
(c) 2020 - The Sophie Foundation
*/

/*
##############################################
# INIT SEQUENCE                              #
############################################## */
require('dotenv').config();
const Discord = require('discord.js');
const Keyv = require('keyv');
const mysql = require('mysql');
const fetch = require('node-fetch');
const fs = require('fs');

/*
#############################################
# CONFIGURATION                             #
#############################################
*/

// If you have this on a local copy and are not
// relying on GitHub or public repos - you can
// replace the .env config with the plain values

console.log('Loading configuration (1/3)');
const DiscordToken = process.env.DiscordToken;
const SQLPassword = process.env.SQLPassword;
const SQLHost = process.env.SQLHost;
const SQLUser = process.env.SQLUser;
const SQLDatabase = process.env.SQLDatabase;

const keyv = new Keyv(`mysql://${SQLUser}:${SQLPassword}@${SQLHost}/${SQLDatabase}`);
keyv.on('error', (err) => log('KeyV Error: ', err));

async function msgcheck(message) {
  message = message.split('/').join('');
  message = message.split('<').join('');
  message = message.split('>').join('');
  message = message.split('@').join('');
  console.log(message);
  const body = {
    text: message,
  };
  return fetch('http://localhost:5005/model/parse', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  })
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
}

async function setLimit(limit) {
  await keyv.set('limit', limit);
  return;
}

async function getLimit() {
  return (await keyv.get('limit'));
}

function update(username, age, points, date) {
  db.query(`SELECT * FROM users WHERE Username = ?`, [username], function(
      err,
      result,
  ) {
    if (err) log(err);
    if (result > 2) {
      UserID = result[0].ID;
      db.query(
          `INSERT INTO users (ID, Age, Points, Modified) VALUES('${UserID}', '${age}', '${points}', '${date}') ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${date}'`,
          function(err) {
            if (err) log(err);
          },
      );
    } else {
      db.query(
          `INSERT INTO users (Username, Age, Points, Modified) VALUES('${username}', '${age}', '${points}', '${date}') ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${date}'`,
          function(err) {
            if (err) log(err);
          },
      );
    }
  });
}

// Need to be able to quickly flag someone's age if they are misrepresenting it
function ageflair(msg) {
  msg.channel.send({
    embed: {
      color: 'e74c3c',
      author: {
        name: bot.user.username,
      },
      title: 'WARNING',
      description:
        'This user has claimed to be older in the past, proceed with extreme caution!',
      timestamp: new Date(),
      footer: {
        text:
          'This bot is not 100% accurate and results may be flawed or incorrect.',
      },
    },
  });
}

// need to be able to flair explicit activity quickly (adult)
function explicitflair(msg) {
  msg.react('⚠');
  msg.channel.send({
    embed: {
      color: 'e74c3c',
      author: {
        name: bot.user.username,
      },
      title: 'WARNING',
      description:
        'This user may be an adult! Please proceed with extreme caution!',
      timestamp: new Date(),
      footer: {
        text:
          'This bot is not 100% accurate and results may be flawed or incorrect.',
      },
    },
  });
}

function pointupdate(msg, points) {
  msg.react('⚠');
  msg.channel.send({
    embed: {
      color: 'e74c3c',
      author: {
        name: bot.user.username,
      },
      title: 'WARNING',
      description: `This user's credibility has recently changed, it's now ${points} - ${guildConf.pointmax} points and their account will be frozen on this server`,
      timestamp: new Date(),
      footer: {
        text:
          'Their message is under review, and if I am wrong then I will reverse the strike.',
      },
    },
  });
}

function timestamp() {
  const dateOb = new Date();

  // current date
  // adjust 0 before single digit date
  const date = ('0' + dateOb.getDate()).slice(-2);

  // current month
  const month = ('0' + (dateOb.getMonth() + 1)).slice(-2);

  // current year
  const year = dateOb.getFullYear();

  // current hours
  const hours = dateOb.getHours();

  // current minutes
  const minutes = dateOb.getMinutes();

  // current seconds
  const seconds = dateOb.getSeconds();

  return (
    year +
    '-' +
    month +
    '-' +
    date +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds
  );
}
const prefix = 'Sophie ';
console.log('Configuration loaded (1/3)');
/*
#############################################
*/

// Set up the logging systems
function log(content) {
  const today = new Date();
  const date =
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const timestamp = date + ' @ ' + time;
  fs.appendFileSync('log.txt', `\n [${timestamp}] ${content}`, (err) => {
    // logging function
    if (err) {
      console.error('Error on Logging: ' + err);
      process.exit('LOG_ERROR');
    }
  });
  console.log(content);
}

// Start connecting to MySQL
log('Connecting to MySQL (2/3)');
const db = mysql.createConnection({
  host: SQLHost,
  user: SQLUser,
  password: SQLPassword,
  database: SQLDatabase,
});

db.connect(function(err) {
  if (err) {
    log('MySQL failed to connect because ' + err);
    process.exit('SQL_ERROR');
  } else {
    log('Connected to MySQL (2/3)');
  }

  const client = new Discord.Client();
  // Everything is set up - init Discord

  client.on('ready', () => {
    log('Discord is ready (3/3)');
    log('Sophie has started on Discord');

    client.on('guildCreate', (guild) => {
      db.query(`SELECT * FROM users WHERE Pedophile = '1'`, [], function(
          err,
          result,
      ) {
        if (err) log(err);
        const banned = [];
        for (let i = 0; i < result.length; i++) {
          banned.push(result[i].ID);
        }
        for (let i = 0; i < banned.length; i++) {
          // ban all marked pedophiles
          guild.members
              .ban(banned[i], 'Sophie Ban: Verified Pedophile')
              .then(log(`User ${banned[i]} was removed from ${guild.name}`))
              .catch(
                  log(`User ${banned[i]} couldn't be removed from ${guild.name}`),
              );
        } // this doesn't protect from pedophiles added to the database after addition, hince next .on
      });
    });

    // Test all recently-added users
    client.on('guildMemberAdd', (member) => {
      db.query(`SELECT * FROM users WHERE Username = ?`, [member.id], function(
          err,
          result,
      ) {
        if (err) log(err);
        if (result.length > 0) {
          if (result[0].Pedophile === '1') {
            console.log('Pedophile found!');
            member
                .kick()
                .then(
                    log(`User ${member.username} was removed from ${guild.name}`),
                )
                .catch(
                    log(
                        `User ${member.username} couldn't be removed from ${guild.name}`,
                    ),
                );
          }
        }
      });
    });

    // We're going to delete any messages sent by someone that isn't in the database
    // you are added when you consent. GDPR's rules.

    client.on('message', (msg) => {
      if (msg.author.bot) return;
      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if (command == 'delete-my-data') {
        msg.author
            .send(
                'Are you sure you want to delete your Sophie Record? You will NOT be able to speak in any servers that have Sophie enabled until you create a new record. We do not delete records of suspicious messages, as we may have a legal obligation to report them, and if you record contains more than 4 points we can not delete your data as we may have a legal obligation to keep it.',
            )
            .then((msg) => {
              msg.react('👍').then(() => msg.react('👎'));

              const filter = (reaction, user) => {
                return (
                  ['👍', '👎'].includes(reaction.emoji.name) &&
            user.id === msg.author.id
                );
              };

              msg
                  .awaitReactions(filter, {
                    max: 1,
                    time: 600000000,
                    errors: ['time'],
                  })
                  .then((collected) => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '👍') {
                      if (result[0].Points > 4) {
                        msg.channel.send(
                            'I\'m sorry, I cannot delete your data as you have a viable record. We have an obligation to store data and refuse removal if it is severe enough, as we may have a legal obligation. If you\'d like, you can message Sophie\'s development team at support@sophiebot.org - but they may not delete your data either. For more information, please check our privacy policy!',
                        );
                      } else {
                        msg.channel.send(
                            'Your record appears clean. I will remove your record under GDPR guidelines. Please note, you will not be able to speak in any Sophie-Enabled servers unless you have a Sophie Record.',
                        );
                        db.query('DELETE FROM users WHERE Username = ?', [
                          msg.author.id,
                        ]);
                      }
                    }
                  });
            })
            .catch((err) => (log(err)));
      } else if (command == 'limit' && msg.author.roles.find((role) => role.hasPermission('Administrator'))) {
        if (args[0]) {
          setLimit(args[0]);
        } else {
          msg.send(getLimit());
        }
      }
      db.query(
          `SELECT * FROM users WHERE Username = ?`, // may not be in the database, get ready to CATCH
          [msg.author.id],
          function(err, result) {
            if (err) log(err);
            if (result.length < 2) {
            // not in DB
              msgcheck(msg.content).then((airesult) => {
                if (msg.channel.type == 'dm' && airesult.intent.name == 'AGE') {
                  const AIEnt = airesult.entities;
                  const age = AIEnt[0].value;
                  update(msg.author.id, age, 0, timestamp());
                } else {
                  msg.author.createDM().then(() => {
                    msg.author
                        .send(
                            'Hey there! This server has Sophie installed! Please state your age (\'I am 15\', for example) to be able to speak in this server. By doing this, you agree to our Privacy Policy. This means we will log your ID, age, and any messages we find suspicious. Most messages will not be logged, and we will always tell you when we log them!',
                        )
                        .catch(() =>
                          msg.reply(
                              'Hey there! This server has Sophie installed! Please state your age (\'I am 15\', for example) in Sophie\'s DMs to be able to speak in this server. By doing this, you agree to our Privacy Policy. This means we will log your ID, age, and any messages we find suspicious. Most messages will not be logged, and we will always tell you when we log them!',
                          ),
                        );
                  });
                  msg.delete();
                  return;
                }
              });
            }
            pointLimit = getLimit();
            if (pointLimit != undefined) {
              pointLimit = 10;
            }
            if (result[0]) {
              if (result[0].Pedophile == '1') {
                msg.delete();
                msg.author.kick();
              } else if (result[0].Points > pointLimit) {
                msg.delete();
              } else {
                // Placeholder before API Wrapper is finished
                msgcheck(msg.content).then((APIresult) => {
                  if (APIresult.intent != 'AGE') {
                    if ((result[0].Suspicious = 1)) {
                      math = APIresult.intent.name + 1;
                    } else {
                      math = APIresult.intent.name;
                    }
                    if ((result[0].Teen = 1)) {
                      math2 = math - 1;
                    } else {
                      math2 = math;
                    }
                    if ((result[0].Verified = 1)) {
                      math3 = math2 - 1;
                    } else {
                      math3 = math2;
                    }
                    pointSystem = math3 * APIresult.intent.confidence;
                    if (pointSystem > 0.5) {
                      update(
                          msg.author.id,
                          result[0].Age,
                          result[0].Points + pointSystem,
                          result[0].Modified,
                      );
                      if (result[0].Age > 18) {
                        explicitflair(msg);
                        pointupdate(msg, result[0].Points);
                      } else {
                        pointupdate(msg, result[0].Points);
                      }
                      // also log the message
                      db.query(
                          `INSERT INTO messages (Author, Message) VALUES('${msg.author.id}', '${msg.content})`,
                          function(err) {
                            if (err) log(err);
                          },
                      ); // We may have a legal obligation to report these messages, if it is a false-positive they are purged.
                    }
                  } else {
                    const APIEntity = APIresult.entity;
                    const age = APIEntity.entity.value;
                    if (age > result[0].Age + 1) {
                      ageflair();
                    } else if (result[0].Modified == timestamp()) {
                      ageflair();
                    } else {
                      update(msg.author.id, age, result[0].Points, timestamp());
                    }
                  }
                });
              }
            }
          });
    });
  });
  client.login(DiscordToken);
});
