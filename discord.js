require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const TOKEN = process.env.TOKEN;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: USER,
    password: PASSWORD,
    database: "sophie",
    debug: "True"
});

connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                process.exit("SQL_WONT_CONNECT")
            }

            console.log('connected as id ' + connection.threadId);
            // ensure a MySQL connection here

            const bot = new Discord.Client();
            bot.on('ready', () => {
                        console.info(`Logged in as ${bot.user.tag}!`); // active

                        //declaring some variables
                        var explicit = ["nudes", "wearing", "virgin", "eat your pussy", "dick", "underwear", "sex", "older men", "older women"];

                        bot.on('message', msg => {
                            console.log("message recieved")
                            // if (msg.content = "Sophie End Process 5485356" && msg.author.id == "367352445657022484") process.exit("ADMIN_TERMINATED_PROCESS")

                            // confirm ages
                            sql = `SELECT ${msg.author.id} FROM pedodb`
                            connection.query(sql),
                                function (err, result) {
                                    if (err) throw err;
                                    console.log(result);
                                    if (result.includes("Pedophile")) { // If the user is a pedophile
                                        msg.channel.send({
                                            embed: {
                                                color: 'e74c3c',
                                                author: {
                                                    name: bot.user.username
                                                },
                                                title: "WARNING",
                                                description: `<@${msg.author.id}>, a verified pedophile, has been detected. Proceed with extreme caution!`,
                                                timestamp: new Date(),
                                                footer: {
                                                    text: "This bot is not 100% accurate and results may be flawed or incorrect."
                                                }
                                            }
                                        });

                                    }
                                }
                        if (msg.content.toLowerCase().includes("i'm") || msg.content.toLowerCase().includes("i am") || msg.content.toLowerCase().includes("age:") || msg.content.toLowerCase().includes("age :")) {
                            console.log("Age Confession Detected")
                            if (msg.content.toLowerCase().includes("10") || msg.content.toLowerCase().includes("11") || msg.content.toLowerCase().includes("12") || msg.content.toLowerCase().includes("13") || msg.content.toLowerCase().includes("14") || msg.content.toLowerCase().includes("15") || msg.content.toLowerCase().includes("16")) {
                                console.log("Minor Age Detected")
                                result = connection.query(`SELECT EXISTS (SELECT ${msg.author.id} FROM pedodb)`)
                                        console.log("Query Initiated")
                                        console.log(result)
                                        msg.channel.send(`Age confirmed: Minor \n ID: ${msg.author.id}`);
                                        if (result.includes("Adult") || result.includes("Young Adult") || result.includes("Pedophile")) {
                                            msg.channel.send({
                                                embed: {
                                                    color: 'e74c3c',
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
                                            if (result = "0") {
                                                console.log("No Result Found... Creating")
                                                sql2 = `INSERT INTO pedodb (id, flag) VALUES (msg.author.id, 'Minor')`
                                            } else {
                                            sql2 = `UPDATE customers SET flag = 'Minor' WHERE id = msg.author.id`
                                            connection.query(sql)
                                            }
                                        }
                            } else {
                                if (msg.content.toLowerCase().includes("20") || msg.content.toLowerCase().includes("21") || msg.content.toLowerCase().includes("22") || msg.content.toLowerCase().includes("23") || msg.content.toLowerCase().includes("24") || msg.content.toLowerCase().includes("25") || msg.content.toLowerCase().includes("26") || msg.content.toLowerCase().includes("27") || msg.content.toLowerCase().includes("28") || msg.content.toLowerCase().includes("29") || msg.content.toLowerCase().includes("30") || msg.content.toLowerCase().includes("31") || msg.content.toLowerCase().includes("32") || msg.content.toLowerCase().includes("33") || msg.content.toLowerCase().includes("34") || msg.content.toLowerCase().includes("35") || msg.content.toLowerCase().includes("36") || msg.content.toLowerCase().includes("37") || msg.content.toLowerCase().includes("38") || msg.content.toLowerCase().includes("39") || msg.content.toLowerCase().includes("40") || msg.content.toLowerCase().includes("41") || msg.content.toLowerCase().includes("42") || msg.content.toLowerCase().includes("43") || msg.content.toLowerCase().includes("44") || msg.content.toLowerCase().includes("45") || msg.content.toLowerCase().includes("46") || msg.content.toLowerCase().includes("47") || msg.content.toLowerCase().includes("48") || msg.content.toLowerCase().includes("49") || msg.content.toLowerCase().includes("50") || msg.content.toLowerCase().includes("51") || msg.content.toLowerCase().includes("52") || msg.content.toLowerCase().includes("53") || msg.content.toLowerCase().includes("54") || msg.content.toLowerCase().includes("55") || msg.content.toLowerCase().includes("56") || msg.content.toLowerCase().includes("57") || msg.content.toLowerCase().includes("58") || msg.content.toLowerCase().includes("59") || msg.content.toLowerCase().includes("60") || msg.content.toLowerCase().includes("61") || msg.content.toLowerCase().includes("62") || msg.content.toLowerCase().includes("63") || msg.content.toLowerCase().includes("64") || msg.content.toLowerCase().includes("65") || msg.content.toLowerCase().includes("66") || msg.content.toLowerCase().includes("67") || msg.content.toLowerCase().includes("68") || msg.content.toLowerCase().includes("69") || msg.content.toLowerCase().includes("70") || msg.content.toLowerCase().includes("71") || msg.content.toLowerCase().includes("72") || msg.content.toLowerCase().includes("73") || msg.content.toLowerCase().includes("74") || msg.content.toLowerCase().includes("75") || msg.content.toLowerCase().includes("76") || msg.content.toLowerCase().includes("77") || msg.content.toLowerCase().includes("78") || msg.content.toLowerCase().includes("79") || msg.content.toLowerCase().includes("80") || msg.content.toLowerCase().includes("81") || msg.content.toLowerCase().includes("82") || msg.content.toLowerCase().includes("83") || msg.content.toLowerCase().includes("84") || msg.content.toLowerCase().includes("85") || msg.content.toLowerCase().includes("86") || msg.content.toLowerCase().includes("87") || msg.content.toLowerCase().includes("88") || msg.content.toLowerCase().includes("89") || msg.content.toLowerCase().includes("90") || msg.content.toLowerCase().includes("91") || msg.content.toLowerCase().includes("92") || msg.content.toLowerCase().includes("93") || msg.content.toLowerCase().includes("94") || msg.content.toLowerCase().includes("95") || msg.content.toLowerCase().includes("96") || msg.content.toLowerCase().includes("97") || msg.content.toLowerCase().includes("98") || msg.content.toLowerCase().includes("99") || msg.content.toLowerCase().includes("100") || msg.content.toLowerCase().includes("101") || msg.content.toLowerCase().includes("102") || msg.content.toLowerCase().includes("103") || msg.content.toLowerCase().includes("104") || msg.content.toLowerCase().includes("105") || msg.content.toLowerCase().includes("106") || msg.content.toLowerCase().includes("107") || msg.content.toLowerCase().includes("108") || msg.content.toLowerCase().includes("109") || msg.content.toLowerCase().includes("110") || msg.content.toLowerCase().includes("111") || msg.content.toLowerCase().includes("112") || msg.content.toLowerCase().includes("113") || msg.content.toLowerCase().includes("114") || msg.content.toLowerCase().includes("115") || msg.content.toLowerCase().includes("116") || msg.content.toLowerCase().includes("117") || msg.content.toLowerCase().includes("118") || msg.content.toLowerCase().includes("119") || msg.content.toLowerCase().includes("120") || msg.content.toLowerCase().includes("121") || msg.content.toLowerCase().includes("122") || msg.content.toLowerCase().includes("123") || msg.content.toLowerCase().includes("124") || msg.content.toLowerCase().includes("125") || msg.content.toLowerCase().includes("126") || msg.content.toLowerCase().includes("127") || msg.content.toLowerCase().includes("128") || msg.content.toLowerCase().includes("129") || msg.content.toLowerCase().includes("130") || msg.content.toLowerCase().includes("131") || msg.content.toLowerCase().includes("132") || msg.content.toLowerCase().includes("133") || msg.content.toLowerCase().includes("134") || msg.content.toLowerCase().includes("135") || msg.content.toLowerCase().includes("136") || msg.content.toLowerCase().includes("137") || msg.content.toLowerCase().includes("138") || msg.content.toLowerCase().includes("139") || msg.content.toLowerCase().includes("140") || msg.content.toLowerCase().includes("141") || msg.content.toLowerCase().includes("142") || msg.content.toLowerCase().includes("143") || msg.content.toLowerCase().includes("144") || msg.content.toLowerCase().includes("145") || msg.content.toLowerCase().includes("146") || msg.content.toLowerCase().includes("147") || msg.content.toLowerCase().includes("148") || msg.content.toLowerCase().includes("149") || msg.content.toLowerCase().includes("150") || msg.content.toLowerCase().includes("151") || msg.content.toLowerCase().includes("152") || msg.content.toLowerCase().includes("153") || msg.content.toLowerCase().includes("154") || msg.content.toLowerCase().includes("155")) {
                                    sql = `SELECT ${msg.author.id} FROM pedodb`
                                    connection.query(sql),
                                        function (err, result) {
                                            if (err) {
                                                console.log(err)
                                            }
                                            console.log(result);
                                            if (result.includes("Pedophile")) {
                                                msg.channel.send({
                                                    embed: {
                                                        color: 'e74c3c',
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
                                            } else {
                                                sql2 = `UPDATE customers SET flag = 'Adult' WHERE id = msg.author.id`
                                                connection.query(sql2),
                                                    function (err, result) {
                                                        console.log(`Age Updated: ${result.rowsaffected}`);
                                                    }
                                            }
                                        }

                                } else {
                                    if (msg.content.includes("17") || msg.content.includes("18") || msg.content.includes("19")) {
                                        console.log("young adult age detected")
                                        sql = `SELECT ${msg.author.id} FROM pedodb`
                                        connection.query(sql),
                                            function (err, result) {
                                                if (err) console.log(err);
                                                console.log(result);
                                                if (result.includes("Adult") || result.includes("Pedophile")) {
                                                    msg.channel.send({
                                                        embed: {
                                                            color: 'e74c3c',
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
                                                    sql2 = `UPDATE customers SET flag = 'Young Adult' WHERE id = msg.author.id`
                                                    connection.query(sql2),
                                                        function (err, result) {
                                                            console.log(`Age Updated: ${result.rowsaffected}`);
                                                        }
                                                }
                                            }
                                    }

                                    for (var i = 0; i < explicit.length; i++) {
                                        if (msg.content.toLowerCase().includes(explicit[i])) {
                                            console.log("Explicit Language Detected")
                                            sql = `SELECT ${msg.author.id} FROM pedodb`
                                            connection.query(sql),
                                                function (err, result) {
                                                    if (err) {
                                                        msg.channel.send({
                                                            embed: {
                                                                color: 'f1c40f',
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
                                                        if (result.includes("Adult")) {
                                                            msg.channel.send({
                                                                embed: {
                                                                    color: 'e74c3c',
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
                                            }
                                        }
        
                    }
                        
                };
                
                                        };
                        })
                    })
                    bot.login(TOKEN);                
                })
                