require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
var mysql = require('mysql');
const TOKEN = process.env.TOKEN;
const MySQLPassword = process.env.MySQLPassword;

var con = mysql.createConnection({ // Establish Connection
    host: "localhost",
    user: "sophiebot",
    password: MySQLPassword,
    database: "sophie"
  });

function ageCheck(string, a, b) {
    const found = string.match(/\d{2,3}/gm)
    let containsNumber = false
    for (let i = 0; i < found.length; i++) {
        const number = parseInt(found[i])
        if (number > a && number < b) {
            containsNumber = true // Thanks to the people on Stackoverflow I figured out the problem with this!
        }
    }
    return containsNumber
}


bot.on("ready", () => {
// On INIT
console.info(`Logged in as ${bot.user.tag}!`); // Log when deployed
con.connect(function(err) {
    if (err) throw err;
    console.log("Connection to MySQL Established") //  Log when connected
});

bot.on("guildCreate", guild => { // when bot is added to server
    guild.members.fetch()
    memberIDs = guild.members.cache.keyArray()
    //callback(null, rows, fields);
    console.log("Query Initiated")
    for (var i = 0; i < memberIDs.length; i++) {
        // memberIDs[i] is the ID
        con.query(`SELECT * FROM pedodb WHERE ID = ?`, [memberIDs[i]],
        function (err, result, fields) {
            if (err) throw err; console.error(err)
            try {
                if (result.length > 1) {
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
                }
            } catch {
                console.log("User is not in database or there has been an error.")
            }
        })
    }
});
// After Server Joined

bot.on("guildMemberAdd", member => {
    console.log("New Member");
    con.query(`SELECT * FROM pedodb WHERE ID = ?`, [msg.author.id],
    function (err, result, fields) {
   //callback(null, rows, fields);
   console.log("Query Initiated")
        try {
            if (result.length > 1) {
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
        }
        } catch {
            console.log("User is not in database or an error has occured.")
        }
    })
})
// After checking new member
bot.on("message", msg => {
    if (msg.author.bot) return; // stop if it's a bot
    if (msg.content.toLowerCase() == "sophie end process" && msg.author.id == "367352445657022484") { // if an Admin calls for the bot's termination
        console.error(`ADMIN_TERMINATED_PROCESS \n Admin: ${msg.author.id} \n Via: Discord \n GRACEFUL TERMINATION`)
        process.exit("ADMIN_TERMINATED_PROCESS");
    } else if (msg.content.toLowerCase().startsWith("sophie add alert") && msg.author.id == "367352445657022484") {
        var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'S')`;
        con.query(sql, function (err) {
          if (err) throw err;
          console.log("Database Updated: Suspicious User Added")
        });
    } else if (msg.content.toLowerCase().startsWith("sophie add warning") && msg.author.id == "367352445657022484") {
        var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'P')`;
        con.query(sql, function (err) {
          if (err) throw err;
          console.log("Database Updated: Pedophile Added")
        });
    } else {
        if (
            msg.content.toLowerCase().includes("i'm") ||
            msg.content.toLowerCase().includes("im") ||
            msg.content.toLowerCase().includes("i am") ||
            msg.content.toLowerCase().includes("age:") ||
            msg.content.toLowerCase().includes("age :")
        ) {
            if (ageCheck(msg.content.toLowerCase(), "8", "100")) {
                console.log("Age Statement Detected")
                con.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], // ${msg.author.id}
                function (err, result, fields) {
               //callback(null, rows, fields);
               console.log(result)
               console.log(" ---- DEBUG INFORMATION ----")
               console.error(err)
               console.log("Query Initiated")
                if (ageCheck(msg.content.toLowerCase(), "8", "15")) {
                    try {
                        if (result.length > 1) {
                        if (result[1].flag in {
                            1: "P",
                            2: "S",
                            3: "YA",
                            4: "A"
                        }) {
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
                    
                    } else {
                        var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'M')`;
                        con.query(sql, function (err) {
                          if (err) throw err;
                          console.log("Database Updated: Minor Added")
                        });
                    }
                }
                    } catch (e){
                        console.log(e)
                        var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'M')`;
                        con.query(sql, function (err) {
                          if (err) throw err;
                          console.log("Database Updated: Minor Added")
                        });
                    } 
                } else if (ageCheck(msg.content.toLowerCase(), "15", "19")) {
                    try {
                        if (result.length > 1) {
                    if (result[1].flag in {
                            1: "P",
                            2: "S",
                            3: "A"
                        }) {
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
                    } else {
                        var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'YA')`;
                        con.query(sql, function (err) {
                          if (err) throw err;
                          console.log("Database Updated: Young Adult Added")
                        });
                    }
                }
                } catch {
                    var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'YA')`;
                    con.query(sql, function (err) {
                      if (err) throw err;
                      console.log("Database Updated: Young Adult Added")
                    });
                }
                } else if (ageCheck(msg.content.toLowerCase(), "19", "100")) {
                        try {
                            if (result.length > 1) {
                        if (result[1].flag == "S") {
                        msg.channel.send({
                            embed: {
                                color: "e74c3c",
                                author: {
                                    name: bot.user.username
                                },
                                title: "ALERT",
                                description: "This user has been flagged by the Sophie Investigations Team as suspicious, proceed with caution!",
                                timestamp: new Date(),
                                footer: {
                                    text: `This warning can be removed if <@${msg.author.id}> contacts Sophie Investigations to get the flag removed.`
                                }
                            }
                        });
                        return
                    
                    } else {
                     if (result[1].flag == "P") {
                        msg.channel.send({
                            embed: {
                                color: "e74c3c",
                                author: {
                                    name: bot.user.username
                                },
                                title: "WARNING",
                                description: "This user may be a pedophile, proceed with extreme caution!",
                                timestamp: new Date(),
                                footer: {
                                    text: "This bot is not 100% accurate and results may be flawed or incorrect."
                                }
                            }
                        });
                        return
                    }
                        var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'A')`;
                        con.query(sql, function (err) {
                          if (err) throw err;
                          console.log("Database Updated: Adult Added")
                        });
                    }
                }
                } catch {
                    var sql = `INSERT IGNORE INTO pedodb (id, flag) VALUES ('${msg.author.id}', 'A')`;
                    con.query(sql, function (err) {
                      if (err) throw err;
                      console.log("Database Updated: Adult Added")
                    });
                }
                }
            });
            }
        } else {
            var fs = require('fs');
            var explicit = fs.readFileSync('explicit.txt').toString().split("\n");
            for (var i = 0; i < explicit.length; i++) {
                if (msg.content.toLowerCase().includes(explicit[i])) {
                    console.log("Explicit Language Detected");
                    con.query(`SELECT * FROM pedodb WHERE ID = ?`, [msg.author.id],
                    function (err, result, fields) {
                   //callback(null, rows, fields);
                   console.log("Query Initiated")
                    if (result == undefined) {
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
                        try {
                            if (result.length > 1) {
                        if (result[1].flag = ("A")) {
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
                    } catch {
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
                    }
                }  
                });
                }
            }
        } // After Explicit Checks
    }
})

});
bot.login(TOKEN);