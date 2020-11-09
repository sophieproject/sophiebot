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
const Enmap = require('enmap');
const mysql = require('mysql');
const fetch = require('node-fetch');
const fs = require('fs');

/*
#############################################
*/

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

function msgcheck(message) {
  const body = {
    text: message,
  };
  fetch('http://localhost:5005/model/parse', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  })
      .then((res) => res.json())
      .then((json) => {
        const result = json;
        console.log(result);
        return `
      {
        "intent": "${result.intent}",
        "entity": "${result.entity}",
        "certainty": "${result.certainty}"
      }
      `;
      })
      .catch((err) => log(err));
}

function update(username, age, points, date) {
  db.query(`SELECT * FROM users WHERE Username = ?`, [username], function(
      err,
      result,
  ) {
    if (err) log(err);
    UserID = result[0].ID;
  });
  db.query(
      `INSERT INTO users (ID, Age, Points, Modified) VALUES('${UserID}', '${age}', '${points}) ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${date}'`,
      function(err) {
        if (err) throw err;
        log(
            `Database Updated (Automated): '${db.query(
                `SELECT Username, Age, Points FROM users WHERE Username = ${username}`,
            )}'`,
        );
      },
  );
}

client.settings = new Enmap({
  name: 'settings',
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
});

// Just setting up a default configuration object here, to have something to insert.
const defaultSettings = {
  pointmax: '10',
};

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

    client.on('guildDelete', (guild) => {
      // When the bot leaves or is kicked, delete settings to prevent stale entries.
      client.settings.delete(guild.id);
    });

    client.on('guildCreate', (guild) => {
      db.query(`SELECT * FROM users WHERE Pedophile = '1'`, [], function(
          err,
          result,
      ) {
        if (err) throw err;
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
      // Before we check messages, we need to declare a few functions.
      db.query(`SELECT Username FROM users`, [], function(err, result) {
        if (err) log(err);
        if (
          !result.includes(msg.author) &&
          !msg.author.bot &&
          !msg.channel.type == 'dm'
        ) {
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
        // Message is from a user that is in the database, a bot, or this is a DM
      });
      db.query(
          `SELECT * FROM users WHERE Username = ?`, // may not be in the database, get ready to CATCH
          [msg.author.id],
          function(err, result) {
            if (err) log(err);
            if ((result = undefined)) {
            // NOT in the database - check language, if it is AGE then verify and continue.
              msgcheck(msg.content);
              if (msg.channel.type == 'dm') {
                if (result.intent == 'AGE') {
                  result.entity.result; // age
                }
              // NOT age, ignore
              }
            } else {
            // First, ensure the settings exist
              client.settings.ensure(member.guild.id, defaultSettings);
              const guildConf = client.settings.ensure(
                  message.guild.id,
                  defaultSettings,
              );
              if (result[0].Pedophile == '1') {
                msg.delete();
                msg.author.kick();
              } else if (result[0].Points > guildConf.pointmax) {
                msg.delete();
              }
              if (msg.content.toLowerCase == 'sophiebot delete my data') {
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

                      message
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
                                db.query('DELETE FROM users WHERE Username = ?;', [
                                  msg.author.id,
                                ]);
                              }
                            }
                          });
                    })
                    .catch((collected) => {
                      // Ignore
                    });
              }

              // Placeholder before API Wrapper is finished
              const APIresult = msgcheck(msg.content);
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
                if (pointSystem > 0.8) {
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
                      }); // We may have a legal obligation to report these messages, if it is a false-positive they are purged.
                }
              } else {
                const APIEntity = APIresult.entities;
                const age = APIEntity.value;
                if (age > result[0].Age + 1) {
                  ageflair();
                } else if (result[0].Modified == new Date()) {
                  ageflair();
                } else {
                  update(msg.author.id, age, result[0].Points, new Date());
                }
              }
            }
          },
      );
    });
  });
  client.login(DiscordToken);
});
