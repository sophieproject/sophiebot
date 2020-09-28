/* ##################
   #  REQUIREMENTS  #
   ################## */
require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
var mysql = require('mysql');
var fs = require('fs');
var explicit = fs.readFileSync('explicit.txt').toString().split("\n");
/* #########################
   #  END OFF REQUIREMENTS #
   ######################### */

/* ###################
   #  CONFIGURATION  #
   ################### */
   // Change these values in the .env file for security
   // If you aren't going to publically post this code then replace the process.env.object with the configuration option
   const DiscordToken = process.env.DiscordToken;
   const SQLPassword = process.env.SQLPassword;
   const SQLHost= process.env.SQLHost;
   const SQLUser = process.env.SQLUser;
   const SQLDatabase = process.env.SQLDatabase;
/* #########################
   #  END OF CONFIGURATION #
   ######################### */

    // Start Connecting to MySQL and Load the Explicit Reg
   var db = mysql.createConnection({ // Create and Establish the connection
    host: SQLHost,
    user: SQLUser,
    password: SQLPassword,
    database: SQLDatabase
  });
  var explicit = fs.readFileSync('explicit.txt').toString().split("\n"); // Load the Explicit reg

  /* #######################
   #  START OF FUNCTIONS   #
   ######################### */

   // Age Checker to check for a number in the age
   function ageCheck(string, min, max) {
    const found = string.match(/\d{2,3}/gm)
    let containsNumber = false
    for (let i = 0; i < found.length; i++) {
        const number = parseInt(found[i])
        if (number > min && number < max) {
            containsNumber = true
        }
    }
    return containsNumber
}

function ageflair(){
    msg.channel.send({
        embed: {
            color: "e74c3c",
            author: {
                name: bot.user.username
            },
            title: "WARNING",
            description: "This user has claimed to be older in the past, proceed with extreme caution!",
            timestamp: new Date(),
            footer: {
                text: "This bot is not 100% accurate and results may be flawed or incorrect."
            }
        }
    });
}

function update(id, flags){
    var sql = `INSERT INTO pedodb (ID, Flag) VALUES('${id}', '${flags}') ON DUPLICATE KEY UPDATE`;
    db.query(sql, function (err) {
      if (err) throw err;
      console.log(`Database Updated: ${flags} Added`);
    });
}

function AgeMinor(string) {
    if (ageCheck(string.toLowerCase(), "8", "16")) {
        if (result.length > 1) {
            if (result[0].flag in {
                1: "P",
                2: "S",
                3: "YA",
                4: "A"
            }) {
        ageflair()
            } else {
                update(msg.author.id, "M");
            }
        } else {
            update(msg.author.id, "M");
        }
    }
}

function AgeYA(string) {
    if (ageCheck(string.toLowerCase(), "17", "18")) {
        if (result.length > 1) {
            if (result[0].flag in {
                1: "P",
                2: "S",
                3: "A"
            }) {
        ageflair()
            } else {
                update(msg.author.id, "YA");
            }
        } else {
            update(msg.author.id, "YA");
        }
    }
}

function AgeAdult(string) {
    if (ageCheck(string.toLowerCase(), "19", "110")) {
        if (result.length > 1) {
            if (result[0].flag in {
                1: "P",
                2: "S"
            }) {
        ageflair()
            } else {
                update(msg.author.id, "A");
            }
        } else {
            update(msg.author.id, "A");
        }
    }
}

function explicitActivity() {
    console.log("Explicit Language Detected");
    if (result[0] == undefined) {
        msg.channel.send({
            embed: {
                color: "f1c40f",
                author: {
                    name: bot.user.username
                },
                title: "Alert!",
                description: "I could not find this user's age in my database. Proceed with caution!",
                timestamp: new Date(),
                footer: {
                    text: `Psst! You can set your age by saying "I am (age)", that way you won't be flagged again!`
                }
            }
        });
    } else {
        if (result[0].flag = ("A")) {
            msg.channel.send({
                embed: {
                    color: "e74c3c",
                    author: {
                        name: bot.user.username
                    },
                    title: "WARNING",
                    description: "This user may be an adult! Please proceed with extreme caution!",
                    timestamp: new Date(),
                    footer: {
                        text: "This bot is not 100% accurate and results may be flawed or incorrect."
                    }
                }
            });
        }
    }
}

function multithread(functions, timeout) {
    for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], timeout);
    }
  }

  /* #########################
     #   END OF FUNCTIONS    #
     ######################### */


     bot.on("ready", () => {
        db.connect(function(err) {
            if (err) throw err;
        });
         console.log("SOPHIE is active!")

         bot.on("guildCreate", guild => { // when bot is added to server
            guild.members.fetch()
            memberIDs = guild.members.cache.keyArray()
            //callback(null, rows, fields);
            console.log("Query Initiated")
            for (var i = 0; i < memberIDs.length; i++) {
                // memberIDs[i] is the ID
                db.query(`SELECT * FROM pedodb WHERE ID = ?`, [memberIDs[i]], function (err, result, fields) {
                    if (err) throw err; console.error(err)
                    try {
                            if (result[1].flag == "P") {
                                guild.members.kick(member.id);
                                msg.channel.send({
                                    embed: {
                                        color: "e74c3c",
                                        author: {
                                            name: bot.user.username
                                        },
                                        title: "WARNING",
                                        description: `<@${memberIDs[i]}>, a verified pedophile, has been detected. They have been removed.`,
                                        timestamp: new Date(),
                                        footer: {
                                            text: "This bot is not 100% accurate and results may be flawed or incorrect."
                                        }
                                    }
                                });
                            }
                    } catch {}
                })
            }
         });

         bot.on("guildMemberAdd", member => {
            db.query(`SELECT * FROM pedodb WHERE ID = ?`, [member.id],
            function (err, result, fields) {
                if (err) throw err;
                try {
                if (result[1].flag == ("P")) {
                
                console.log("Pedophile found!");
                msg.channel.send({
                    embed: {
                        color: "e74c3c",
                        author: {
                            name: bot.user.username
                        },
                        title: "WARNING",
                        description: `<@${member.id}>, a verified pedophile, has been detected. They have been removed.`,
                        timestamp: new Date(),
                        footer: {
                            text: "This bot is not 100% accurate and results may be flawed or incorrect."
                        }
                    }
                });
                //
                guild.members.kick(member.id);
            }
        } catch {}
            });
        });

         bot.on("message", msg => {
            if (msg.author.bot) return;

        if (
            msg.content.toLowerCase().includes("i'm") ||
            msg.content.toLowerCase().includes("im") ||
            msg.content.toLowerCase().includes("i am") ||
            msg.content.toLowerCase().includes("age:") ||
            msg.content.toLowerCase().includes("age :")
        ) {
            db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function (err, result, fields) {
                multithread([AgeMinor(msg.content), AgeYA(msg.content), AgeAdult(msg.content)], 0.01);});
        } else {
            db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function (err, result, fields) {
            for (var i = 0; i < explicit.length; i++) {
                if (msg.content.toLowerCase().includes(explicit[i])) {
                    explicitActivity();
                    break;
                }
                }
            });
        }
    });
    });
        
bot.login(DiscordToken);