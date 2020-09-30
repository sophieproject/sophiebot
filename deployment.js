/* ##################
   #  REQUIREMENTS  #
   ################## */
   require("dotenv").config();
   const Discord = require("discord.js");
   const bot = new Discord.Client();
   var mysql = require("mysql");
   var fs = require("fs");
   var explicit = fs
     .readFileSync("explicit.txt")
     .toString()
     .split("\r\n");
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
   const SQLHost = process.env.SQLHost;
   const SQLUser = process.env.SQLUser;
   const SQLDatabase = process.env.SQLDatabase;
   /* #########################
      #  END OF CONFIGURATION #
      ######################### */
   
   // Start Connecting to MySQL and Load the Explicit Reg
   var db = mysql.createConnection({
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
     console.log("SOPHIE is active!");
   
     bot.on("guildCreate", guild => {
       console.log(guild);
       // when bot is added to server
       guild.members.fetch();
       memberIDs = guild.members.cache.keyArray();
       console.log(memberIDs)
       for (var i = 0; i < memberIDs.length; i++) {
         // memberIDs[i] is the ID
         db.query(`SELECT * FROM pedodb WHERE ID = ?`, [memberIDs[i]], function(
           err,
           result,
           fields
         ) {
           if (err) console.error(err);
           
if (result.length >= 1){
    console.log(result[0].Flag)
             if (result[0].Flag == "P") {
                const user = bot.users.fetch(memberIDs[i])
                const member = guild.member(user)
               member.kick();
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
                     text:
                       "This bot is not 100% accurate and results may be flawed or incorrect."
                   }
                 }
               });
             }
           }
         });
       }
     });
   
     bot.on("guildMemberAdd", member => {
       db.query(`SELECT * FROM pedodb WHERE ID = ?`, [member.id], function(
         err,
         result,
         fields
       ) {
         if (err) throw err;
         try {
           if (result[0].Flag == "P") {
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
                   text:
                     "This bot is not 100% accurate and results may be flawed or incorrect."
                 }
               }
             });
             //
             let member = member.id
             guild.member.kick();
           }
         } catch {}
       });
     });
   
     bot.on("message", msg => {
     /* #######################
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
   
       function update(id, flags) {
         var sql = `INSERT INTO pedodb (ID, Flag) VALUES('${id}', '${flags}') ON DUPLICATE KEY UPDATE Flag='${flags}'`;
         db.query(sql, function(err) {
           if (err) throw err;
           console.log(`Database Updated: ${flags} Added for ${id}`);
         });
       }
   
       function AgeMinor(string, result, id) {
         if (ageCheck(string, "8", "16")) {
           if (result.length >= 1) {
             if (["A", "YA", "S", "P"].includes(result[0].Flag)) {
               ageflair();
             } else {
               update(id, "M");
             }
           } else {
             update(id, "M");
           }
         }
       }
   
       function AgeYA(string, result, id) {
         if (ageCheck(string, "17", "18")) {
           if (result.length >= 1) {
             if (["A", "S", "P"].includes(result[0].Flag)) {
               ageflair();
             } else {
               update(id, "YA");
             }
           } else {
             update(id, "YA");
           }
         }
       }
   
       function AgeAdult(string, result, id) {
         if (ageCheck(string, "19", "110")) {
           if (result.length >= 1) {
             if (["S", "P"].includes(result[0].Flag)) {
               ageflair();
             } else {
               update(id, "A");
             }
           } else {
             update(id, "A");
           }
         }
       }
   
       function explicitActivity(result) {
         if (result.length < 1) {
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
           if ((result[0].Flag = "A")) {
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
       }
   
       function multithread(functions, timeout) {
         for (var i = 0; i < functions.length; i++) {
           setTimeout(function() {
             functions[i];
           }, 0.05);
         }
       }
   
       /* #########################
        #   END OF FUNCTIONS    #
        ######################### */
   
       if (msg.author.bot) return;
       if (msg.content.toLowerCase().startsWith("sophie")) {
         db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function(
           err,
           result,
           fields
         ) {
           if (result[0].Flag2 == "A") {
             if (msg.content.toLowerCase().includes("warning")) {
               if (msg.mentions.has(bot.user)) return;
               update(msg.mentions.members.first().user.id, "P");
               msg.channel.send({
                   embed: {
                       description: "User added to Warning List - Flagged as Pedophile"
                   }
               })
             }
             if (msg.content.toLowerCase().includes("alert")) {
               if (msg.mentions.has(bot.user)) return;
               console.log("Suspicious")
               update(msg.mentions.members.first().user.id, "S");
               msg.channel.send({
                embed: {
                    description: "User added to Alert List - Flagged as Suspicious User"
                }
            })
             }
             if (msg.content.toLowerCase().includes("reload")) {
               var explicit = fs
                 .readFileSync("explicit.txt")
                 .toString()
                 .split("\r\n");
               msg.channel.send({
                 embed: {
                   description: "Explicit Language refreshed."
                 }
               });
             }
           }
         });
       }
       if (
         msg.content.toLowerCase().includes("im") ||
         msg.content.toLowerCase().includes("i am") ||
         msg.content.toLowerCase().includes("ima") ||
         msg.content.toLowerCase().includes("age:") ||
         msg.content.toLowerCase().includes("age :") ||
         msg.content.toLowerCase().includes("my age")
       ) {
         db.query(`SELECT * FROM pedodb WHERE ID = ${msg.author.id}`, [], function(
           err,
           result,
           fields
         ) {
           multithread(
             [
               AgeMinor(msg.content, result, msg.author.id),
               AgeYA(msg.content, result, msg.author.id),
               AgeAdult(msg.content, result, msg.author.id)
             ],
             0.01
           );
         });
       } else {
         for (var i = 0; i < explicit.length; i++) {
           if (msg.content.toLowerCase().includes(explicit[i])) {
             db.query(
               `SELECT * FROM pedodb WHERE ID = ${msg.author.id}`,
               [],
               function(err, result, fields) {
                 explicitActivity(result);
               }
             );
             bot.channels.cache.get(`760568855738581102`).send({
               embed: {
                 color: "e74c3c",
                 author: {
                   name: "Automated Ticket"
                 },
                 title: `${msg.author.username}#${msg.author.discriminator}`,
                 description: `${msg.content}`,
                 timestamp: new Date(),
                 footer: {
                   text: `${msg.author.id}`
                 }
               }
             });
             break;
           }
         }
       }
     });
   });
   
   bot.login(DiscordToken);
   