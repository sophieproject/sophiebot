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

  bot.on('guildMemberAdd', (member) => {
    db.query(`SELECT * FROM pedodb WHERE ID = ?`, [member.id], function(
        err,
        result,
    ) {
      if (err) throw err;
      if (result.length > 0) {
        if (result[0].Flag === 'P') {
          console.log('Pedophile found!');
		  member.kick()
		  .then (console.log("Pedophile Found - Removed"))
		  .catch (console.log("Error on Kick"));
        }
      }
    });
  });

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
			guild.members.ban(banned[i])
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
	  try {
      for (let i = 0; i < found.length; i++) {
        const number = parseInt(found[i]);
        if (number > min && number < max) {
          containsNumber = true;
        }
	  } 
	  return containsNumber;
	} catch {
		  return false
	  }
      
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
			console.log(result[0].Flag)
          if (['A', 'YA', 'S', 'P'].includes(result[0].Flag)) {
            ageflair();
          } else {
			update(id, 'M');
			msg.react('👍')
          }
        } else {
		  update(id, 'M');
		  msg.react('👍')
        }
      }
    }

    function ageYA(string, result, id) {
      if (ageCheck(string, '17', '18')) {
        if (result.length >= 1) {
			console.log(result[0].Flag)
          if (['A', 'S', 'P'].includes(result[0].Flag)) {
            ageflair();
          } else {
			msg.react('👍')
            update(id, 'YA');
          }
        } else {
		  update(id, 'YA');
		  msg.react('👍')
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
			msg.react('👍')
          }
        } else {
		  update(id, 'A');
		  msg.react('👍')
        }
      }
    }

    function explicitActivity(result) {
      if (result.length < 1) {
		msg.react('⚠');
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
		/*
		bot.channels.cache.get('762753428727660574').send({
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
			  */
      } else {
        if ((result[0].Flag = 'A')) {
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
		  /*
		  bot.channels.cache.get('762753428727660574').send({
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
			  */
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
      if (result.length == 1) {
        if (result[0] == 'P') {
			msg.author.ban(msg.author)
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
		}
	 } else {
          for (let i = 0; i < explicit.length; i++) {
            if (msg.content.toLowerCase().includes(explicit[i])) {
				  if (
                msg.content.toLowerCase().includes('don\'t') ||
					 msg.content.toLowerCase().includes('not') ||
					 msg.content.toLowerCase().includes('no') ||
					 msg.content.toLowerCase().includes('dont')
				  ) { return } else {
                db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function(err, result) {
				  if (err) throw err;
				  if (result[0].Flag == 'M' || result[0].Flag == 'YA') { } else {
					  explicitActivity(result);
				  }
				},
			
				);
				break;
				  }
				  
            }
			  }
      }
    });
  });
});

bot.login(DiscordToken);
