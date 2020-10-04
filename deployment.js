/* eslint-disable linebreak-style */ // <- I blame Windows Formatting for that
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// Ignore the above information - just for eslint linting
/* ##################
   #  REQUIREMENTS  #
   ################## */
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const fs = require('fs');
const explicit = fs
    .readFileSync('explicit.txt')
    .toString()
    .split('\r\n');
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
  database: SQLDatabase,
});

bot.on('ready', () => {
  db.connect(function(err) {
    if (err) throw err;
  });
  console.log('SOPHIE is active!');

  bot.on('guildCreate', (guild) => {
	db.query(`SELECT * FROM pedodb WHERE Flag = 'P'`, [], function(
        err,
        result,
    ) {
		if (err) throw err;
		let banned = []
		for (let i = 0; i < result.length; i++) {
			banned.push(result[i].ID);
		  }
		for (let i = 0; i < banned.length; i++) {
			banned[i].kick(banned[i])
			.then (console.log("Pedophile Found - Removed"))
			.catch (console.log("Error on Kick")); // use this as a fallback - when a new member joins it counts as a message from that user.
		}
  })
})

  bot.on('message', (msg) => {
    /* #########################
       #  START OF FUNCTIONS   #
       ######################### */

    // Age Checker to check for a number in the age
    function ageCheck(string, min, max) {
      const found = string.match(/\d{2,3}/gm);
      let containsNumber = false;
      for (let i = 0; i < found.length; i++) {
        const number = parseInt(found[i]);
        if (number > min && number < max) {
          containsNumber = true;
        }
      }
      return containsNumber;
    }

    function ageflair() {
      msg.channel.send({
        embed: {
          color: 'e74c3c',
          author: {
            name: bot.user.username,
          },
          title: 'WARNING',
          description: 'This user has claimed to be older in the past, proceed with extreme caution!',
          timestamp: new Date(),
          footer: {
            text:
                 'This bot is not 100% accurate and results may be flawed or incorrect.',
          },
        },
      });
    }

    function update(id, flags) {
      const sql = `INSERT INTO pedodb (ID, Flag) VALUES('${id}', '${flags}') ON DUPLICATE KEY UPDATE Flag='${flags}'`;
      db.query(sql, function(err) {
        if (err) throw err;
        console.log(`Database Updated: ${flags} Added for ${id}`);
      });
    }

    function ageMinor(string, result, id) {
      if (ageCheck(string, '8', '16')) {
        if (result.length >= 1) {
          if (['A', 'YA', 'S', 'P'].includes(result[0].Flag)) {
            ageflair();
          } else {
            update(id, 'M');
          }
        } else {
          update(id, 'M');
        }
      }
    }

    function ageYA(string, result, id) {
      if (ageCheck(string, '17', '18')) {
        if (result.length >= 1) {
          if (['A', 'S', 'P'].includes(result[0].Flag)) {
            ageflair();
          } else {
            update(id, 'YA');
          }
        } else {
          update(id, 'YA');
        }
      }
    }

    function ageAdult(string, result, id) {
      if (ageCheck(string, '19', '110')) {
        if (result.length >= 1) {
          if (['S', 'P'].includes(result[0].Flag)) {
            ageflair();
          } else {
            update(id, 'A');
          }
        } else {
          update(id, 'A');
        }
      }
    }

    function explicitActivity(result) {
      if (result.length < 1) {
		message.react('⚠');
        msg.channel.send({
          embed: {
            color: 'f1c40f',
            author: {
              name: bot.user.username,
            },
            title: 'Alert!',
            description:
                 'I could not find this user\'s age in my database. Proceed with caution!',
            timestamp: new Date(),
            footer: {
              text: `Psst! You can set your age by saying "I am (age)", that way you won't be flagged again!`,
            },
          },
		});
		bot.channels.cache.get('760568855738581102').send({
			embed: {
				  color: 'e74c3c',
				  author: {
				name: 'Automated Ticket',
				  },
				  title: `${msg.author.username}#${msg.author.discriminator}`,
				  description: `${msg.content}`,
				  timestamp: new Date(),
				  footer: {
				text: `${msg.author.id}`,
				  },
			},
			  });
      } else {
        if ((result[0].Flag = 'A')) {
			message.react('⚠');
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
		  bot.channels.cache.get('760568855738581102').send({
			embed: {
				  color: 'e74c3c',
				  author: {
				name: 'Automated Ticket',
				  },
				  title: `${msg.author.username}#${msg.author.discriminator}`,
				  description: `${msg.content}`,
				  timestamp: new Date(),
				  footer: {
				text: `${msg.author.id}`,
				  },
			},
			  });
        }
      }
    }

    function multithread(functions) {
      for (let i = 0; i < functions.length; i++) {
        setTimeout(function() {
          functions[i];
        }, 0.001);
      }
    }

    /* #########################
       #   END OF FUNCTIONS    #
       ######################### */

    if (msg.author.bot) return; // return if it's a bot
    db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function(
        err,
        result,
    ) { // Set up the query
      if (result.length > 0) {
        if (result[0] == 'P') {
			msg.author.kick(msg.author)
			.then (console.log("Pedophile Found - Removed"))
			.catch (console.log("Error on Kick")); // use this as a fallback - when a new member joins it counts as a message from that user.
		}
	}
		
		if (
          msg.content.toLowerCase().includes('im') ||
				 msg.content.toLowerCase().includes('i am') ||
				 msg.content.toLowerCase().includes('ima') ||
				 msg.content.toLowerCase().includes('age:') ||
				 msg.content.toLowerCase().includes('age :') ||
				 msg.content.toLowerCase().includes('my age')
			  ) {
				  if (!msg.content.toLowerCase().includes('not') || !msg.content.toLowerCase().includes('no')){
          if (err) throw err;
          multithread(
              [
					  ageMinor(msg.content, result, msg.author.id),
					  ageYA(msg.content, result, msg.author.id),
					  ageAdult(msg.content, result, msg.author.id),
              ],
          );
        } else {
          for (let i = 0; i < explicit.length; i++) {
            if (msg.content.toLowerCase().includes(explicit[i])) {
				  if (
                !msg.content.toLowerCase().includes('don\'t') ||
					 !msg.content.toLowerCase().includes('do not') ||
					 !msg.content.toLowerCase().includes('dont')
				  ) {
                db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function(err, result) {
                  if (err) throw err;
					  explicitActivity(result);
                },
                );
				  }
				  break;
            }
			  }
      }
      if (msg.content.toLowerCase().startsWith('sophie')) {
        if (err) throw err;
        if (result.length == 0) return;
        if (result[0].Flag2 == 'A') {
          if (msg.content.toLowerCase().includes('warning')) {
            if (msg.mentions.has(bot.user)) return;
			update(msg.mentions.members.first().user.id, 'P');
			msg.react('✔')
            msg.channel.send({
              embed: {
                description: 'User added to Warning List - Flagged as Pedophile',
              },
            });
          }
          if (msg.content.toLowerCase().includes('alert')) {
            if (msg.mentions.has(bot.user)) return;
            console.log('Suspicious');
			update(msg.mentions.members.first().user.id, 'S');
			msg.react('✔')
            msg.channel.send({
              embed: {
                description:
                     'User added to Alert List - Flagged as Suspicious User',
              },
            });
          }
        }
	  }
	}
    });
  });
});

bot.login(DiscordToken);
