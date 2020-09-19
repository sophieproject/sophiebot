require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const TOKEN = process.env.TOKEN;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: USER,
  password: PASSWORD,
  database: "sophie",
});
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    process.exit("SQL_WONT_CONNECT");
  }
  connection.on("close", function(err) {
    if (err) {
      // Oops! Unexpected closing of connection, lets reconnect back.
      connection = mysql.createConnection(connection.config);
    } else {
      console.log("Connection closed normally.");
    }
  });

  console.log("connected as id " + connection.threadId);
  // ensure a MySQL connection here

  const bot = new Discord.Client();
  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`); // active
    explicit = [
      "lick your",
      "suck your",
      "tits",
      "boobs",
      "breasts",
      "fuck your"
    ]; // I need to improve this list and enhance it's detection of censored attempts, wonder if Tensorflow could do it??
    bot.on("guildCreate", guild => {
      // when the bot is in a new guild, scan everyone's ID for potentional preadators
      // not tonight... please not tonight...
    });
    bot.on("guildMemberAdd", member => {
      console.log("New Member");
      connection.query(`SELECT * FROM pedodb WHERE ID='${msg.author.id}'`, [], 
    function (error, result, fields) {
          console.log("Query Submitted");
          if (result.includes("Pedophile")) {
            console.log("Pedophile found!");
            msg.channel.send({
              embed: {
                color: "e74c3c",
                author: {
                  name: bot.user.username
                },
                title: "WARNING",
                description: `<@${msg.author.id}>, a verified pedophile, has been detected. Proceed with extreme caution!`,
                timestamp: new Date(),
                footer: {
                  text:
                    "This bot is not 100% accurate and results may be flawed or incorrect."
                }
              }
            });
            //
            guild.members.ban(member.id);
          }
    });
  });

    //declaring some variables

    bot.on("message", msg => {
      if (msg.author.bot) return;
      console.log("message recieved");
      if (
        msg.content == "Sophie End Process" &&
        msg.author.id == "367352445657022484"
      )
        process.exit("ADMIN_TERMINATED_PROCESS");

      // confirm ages
      connection.query(`SELECT * FROM pedodb WHERE ID='${msg.author.id}'`, [], // baby don't hurt me, don't hurt me no mooore (seriously tho this code might be the death of me)
    function (error, result, fields) {
    //callback(null, rows, fields);
    console.log("Query Initiated")
    console.log(result)
    console.log("---------")
    //var rows = JSON.parse(JSON.stringify(result[0]));
    //console.log(rows)
   // console.log(fields)
      /*
      connection.query(`SELECT * FROM pedodb WHERE ID = "${msg.author.id}"`),
        function(err, result) {
          query.on("result", function(row) {
            */
            if (
              msg.content.toLowerCase().includes("i'm") ||
              msg.content.toLowerCase().includes("i am") ||
              msg.content.toLowerCase().includes("age:") ||
              msg.content.toLowerCase().includes("age :")
            ) {
              console.log("Age Confession Detected");
              console.log(result);
              try {
              if (result[0].flag == ("Pedophile")) {
                // If the user is a pedophile
                msg.channel.send({
                  embed: {
                    color: "e74c3c",
                    author: {
                      name: bot.user.username
                    },
                    title: "WARNING",
                    description: `<@${msg.author.id}>, a verified pedophile, has been detected. Proceed with extreme caution!`,
                    timestamp: new Date(),
                    footer: {
                      text:
                        "This bot is not 100% accurate and results may be flawed or incorrect."
                    }
                  }
                });
              }
            } catch{
              console.log("Error Caught")
            }
          

          if (
            msg.content.toLowerCase().includes("10") ||
            msg.content.toLowerCase().includes("11") ||
            msg.content.toLowerCase().includes("12") ||
            msg.content.toLowerCase().includes("13") ||
            msg.content.toLowerCase().includes("14") ||
            msg.content.toLowerCase().includes("15") ||
            msg.content.toLowerCase().includes("16")
          ) {
            console.log("Minor Age Detected");
                  msg.channel.send(
                    `Age confirmed: Minor \n ID: ${msg.author.id}`
                  );
                  try {
                  if (
                    result['flag'] == ("Adult") ||
                    result['flag'] == ("Young Adult") ||
                    result['flag'] == ("Pedophile")
                  ) {
                    msg.channel.send({
                      embed: {
                        color: "e74c3c",
                        author: {
                          name: bot.user.username
                        },
                        title: "WARNING",
                        description:
                          "This user has claimed to be older in the past, proceed with extreme caution!",
                        timestamp: new Date(),
                        footer: {
                          text:
                            "This bot is not 100% accurate and results may be flawed or incorrect."
                        }
                      }
                    });
                  }
                  if (result['flag'] == "Minor") {
                    connection.query(`UPDATE ID="${msg.author.id}", flag="Minor"`);
                  } // in case an entry is found
                 }
                 catch { // <-- Yeah finally I figured this out
                    console.log("Age Verified");
                    connection.query(
                      `INSERT INTO pedodb(id,flag) VALUES('${msg.author.id}','Minor'` //ID="${msg.author.id}", flag="Minor"
                    );
                 }
          } else {
            if (
              msg.content.toLowerCase().includes("20") ||
              msg.content.toLowerCase().includes("21") ||
              msg.content.toLowerCase().includes("22") ||
              msg.content.toLowerCase().includes("23") ||
              msg.content.toLowerCase().includes("24") ||
              msg.content.toLowerCase().includes("25") ||
              msg.content.toLowerCase().includes("26") ||
              msg.content.toLowerCase().includes("27") ||
              msg.content.toLowerCase().includes("28") ||
              msg.content.toLowerCase().includes("29") ||
              msg.content.toLowerCase().includes("30") ||
              msg.content.toLowerCase().includes("31") ||
              msg.content.toLowerCase().includes("32") ||
              msg.content.toLowerCase().includes("33") ||
              msg.content.toLowerCase().includes("34") ||
              msg.content.toLowerCase().includes("35") ||
              msg.content.toLowerCase().includes("36") ||
              msg.content.toLowerCase().includes("37") ||
              msg.content.toLowerCase().includes("38") ||
              msg.content.toLowerCase().includes("39") ||
              msg.content.toLowerCase().includes("40") ||
              msg.content.toLowerCase().includes("41") ||
              msg.content.toLowerCase().includes("42") ||
              msg.content.toLowerCase().includes("43") ||
              msg.content.toLowerCase().includes("44") ||
              msg.content.toLowerCase().includes("45") ||
              msg.content.toLowerCase().includes("46") ||
              msg.content.toLowerCase().includes("47") ||
              msg.content.toLowerCase().includes("48") ||
              msg.content.toLowerCase().includes("49") ||
              msg.content.toLowerCase().includes("50") ||
              msg.content.toLowerCase().includes("51") ||
              msg.content.toLowerCase().includes("52") ||
              msg.content.toLowerCase().includes("53") ||
              msg.content.toLowerCase().includes("54") ||
              msg.content.toLowerCase().includes("55") ||
              msg.content.toLowerCase().includes("56") ||
              msg.content.toLowerCase().includes("57") ||
              msg.content.toLowerCase().includes("58") ||
              msg.content.toLowerCase().includes("59") ||
              msg.content.toLowerCase().includes("60") ||
              msg.content.toLowerCase().includes("61") ||
              msg.content.toLowerCase().includes("62") ||
              msg.content.toLowerCase().includes("63") ||
              msg.content.toLowerCase().includes("64") ||
              msg.content.toLowerCase().includes("65") ||
              msg.content.toLowerCase().includes("66") ||
              msg.content.toLowerCase().includes("67") ||
              msg.content.toLowerCase().includes("68") ||
              msg.content.toLowerCase().includes("69") ||
              msg.content.toLowerCase().includes("70") ||
              msg.content.toLowerCase().includes("71") ||
              msg.content.toLowerCase().includes("72") ||
              msg.content.toLowerCase().includes("73") ||
              msg.content.toLowerCase().includes("74") ||
              msg.content.toLowerCase().includes("75") ||
              msg.content.toLowerCase().includes("76") ||
              msg.content.toLowerCase().includes("77") ||
              msg.content.toLowerCase().includes("78") ||
              msg.content.toLowerCase().includes("79") ||
              msg.content.toLowerCase().includes("80") ||
              msg.content.toLowerCase().includes("81") ||
              msg.content.toLowerCase().includes("82") ||
              msg.content.toLowerCase().includes("83") ||
              msg.content.toLowerCase().includes("84") ||
              msg.content.toLowerCase().includes("85") ||
              msg.content.toLowerCase().includes("86") ||
              msg.content.toLowerCase().includes("87") ||
              msg.content.toLowerCase().includes("88") ||
              msg.content.toLowerCase().includes("89") ||
              msg.content.toLowerCase().includes("90") ||
              msg.content.toLowerCase().includes("91") ||
              msg.content.toLowerCase().includes("92") ||
              msg.content.toLowerCase().includes("93") ||
              msg.content.toLowerCase().includes("94") ||
              msg.content.toLowerCase().includes("95") ||
              msg.content.toLowerCase().includes("96") ||
              msg.content.toLowerCase().includes("97") ||
              msg.content.toLowerCase().includes("98") ||
              msg.content.toLowerCase().includes("99") ||
              msg.content.toLowerCase().includes("100") ||
              msg.content.toLowerCase().includes("101") ||
              msg.content.toLowerCase().includes("102") ||
              msg.content.toLowerCase().includes("103") ||
              msg.content.toLowerCase().includes("104") ||
              msg.content.toLowerCase().includes("105") ||
              msg.content.toLowerCase().includes("106") ||
              msg.content.toLowerCase().includes("107") ||
              msg.content.toLowerCase().includes("108") ||
              msg.content.toLowerCase().includes("109") ||
              msg.content.toLowerCase().includes("110") ||
              msg.content.toLowerCase().includes("111") ||
              msg.content.toLowerCase().includes("112") ||
              msg.content.toLowerCase().includes("113") ||
              msg.content.toLowerCase().includes("114") ||
              msg.content.toLowerCase().includes("115") ||
              msg.content.toLowerCase().includes("116") ||
              msg.content.toLowerCase().includes("117") ||
              msg.content.toLowerCase().includes("118") ||
              msg.content.toLowerCase().includes("119") ||
              msg.content.toLowerCase().includes("120") ||
              msg.content.toLowerCase().includes("121") ||
              msg.content.toLowerCase().includes("122") ||
              msg.content.toLowerCase().includes("123") ||
              msg.content.toLowerCase().includes("124") ||
              msg.content.toLowerCase().includes("125") ||
              msg.content.toLowerCase().includes("126") ||
              msg.content.toLowerCase().includes("127") ||
              msg.content.toLowerCase().includes("128") ||
              msg.content.toLowerCase().includes("129") ||
              msg.content.toLowerCase().includes("130") ||
              msg.content.toLowerCase().includes("131") ||
              msg.content.toLowerCase().includes("132") ||
              msg.content.toLowerCase().includes("133") ||
              msg.content.toLowerCase().includes("134") ||
              msg.content.toLowerCase().includes("135") ||
              msg.content.toLowerCase().includes("136") ||
              msg.content.toLowerCase().includes("137") ||
              msg.content.toLowerCase().includes("138") ||
              msg.content.toLowerCase().includes("139") ||
              msg.content.toLowerCase().includes("140") ||
              msg.content.toLowerCase().includes("141") ||
              msg.content.toLowerCase().includes("142") ||
              msg.content.toLowerCase().includes("143") ||
              msg.content.toLowerCase().includes("144") ||
              msg.content.toLowerCase().includes("145") ||
              msg.content.toLowerCase().includes("146") ||
              msg.content.toLowerCase().includes("147") ||
              msg.content.toLowerCase().includes("148") ||
              msg.content.toLowerCase().includes("149") ||
              msg.content.toLowerCase().includes("150") ||
              msg.content.toLowerCase().includes("151") ||
              msg.content.toLowerCase().includes("152") ||
              msg.content.toLowerCase().includes("153") ||
              msg.content.toLowerCase().includes("154") ||
              msg.content.toLowerCase().includes("155")
            ) {
              connection.query(
                `SELECT * FROM pedodb WHERE ID = "${msg.author.id}"`
              ),
                function(err, result) {
                  query.on("result", function(row) {
                    if (err) {
                      console.log(err);
                    }
                    console.log(result);
                    if (result.includes("Pedophile")) {
                      msg.channel.send({
                        embed: {
                          color: "e74c3c",
                          author: {
                            name: bot.user.username
                          },
                          title: "WARNING",
                          description:
                            "This user may be a pedophile, proceed with extreme caution!",
                          timestamp: new Date(),
                          footer: {
                            text:
                              "This bot is not 100% accurate and results may be flawed or incorrect."
                          }
                        }
                      });
                    } else {
                      console.log("Age Verified");
                      connection.query(
                        `INSERT INTO pedodb(id,flag) VALUES('${msg.author.id}','Adult') ON DUPLICATE KEY UPDATE ID="${msg.author.id}", flag="Adult";`
                      );
                    }
                  });
                };
            } else {
              if (
                msg.content.includes("17") ||
                msg.content.includes("18") ||
                msg.content.includes("19")
              ) {
                console.log("young adult age detected");
                connection.query(
                  `SELECT * FROM pedodb WHERE ID = "${msg.author.id}"`
                ),
                  function(err, result) {
                    query.on("result", function(row) {
                      if (err) console.log(err);
                      console.log(result);
                      if (
                        result.includes("Adult") ||
                        result.includes("Pedophile")
                      ) {
                        msg.channel.send({
                          embed: {
                            color: "e74c3c",
                            author: {
                              name: bot.user.username
                            },
                            title: "WARNING",
                            description:
                              "This user has claimed to be older in the past, proceed with extreme caution!",
                            timestamp: new Date(),
                            footer: {
                              text:
                                "This bot is not 100% accurate and results may be flawed or incorrect."
                            }
                          }
                        });
                      } else {
                        connection.query(
                          `INSERT INTO pedodb(id,flag) VALUES('${msg.author.id}','Young Adult') ON DUPLICATE KEY UPDATE ID="${msg.author.id}", flag="Minor";`
                        );
                      }
                    });
                  };
              }

              for (var i = 0; i < explicit.length; i++) {
                if (msg.content.toLowerCase().includes(explicit[i])) {
                  console.log("Explicit Language Detected");
                  connection.query(
                    `SELECT * FROM pedodb WHERE ID = "${msg.author.id}"`
                  ),
                    function(err, result) {
                      query.on("result", function(row) {
                        if (err) {
                          msg.channel.send({
                            embed: {
                              color: "f1c40f",
                              author: {
                                name: bot.user.username
                              },
                              title: "Alert!",
                              description:
                                "I could not find this user's age in my database. Proceed with caution!",
                              timestamp: new Date(),
                              footer: {
                                text: `Psst! You can set your age by saying "I am (age)", that way you won't be flagged again!`
                              }
                            }
                          });
                        } else {
                          if (result.includes("Adult")) {
                            msg.channel.send({
                              embed: {
                                color: "e74c3c",
                                author: {
                                  name: bot.user.username
                                },
                                title: "WARNING",
                                description:
                                  "This user may be an adult! Please proceed with extreme caution!",
                                timestamp: new Date(),
                                footer: {
                                  text:
                                    "This bot is not 100% accurate and results may be flawed or incorrect."
                                }
                              }
                            });
                          }
                        }
                      });
                    };
                }
              }
            }
          }
        };
        });
  });
  });
  bot.login(TOKEN);
});
