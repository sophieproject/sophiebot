const fs = require("fs");
const fetch = require("node-fetch")
const Database = require('better-sqlite3');
const main = require("./core.js");
const db = new Database('./data/sophie.db', {
    verbose: main.log
});
const crypto = require("crypto");
require("dotenv").config();
responseTimes = []

exports.explicitCheck = function (message) {
    return new Promise(function (resolve, reject) {
            message = message.replace(/\//g, "")
            const body = {
                text: message,
            }
            fetch(`http://localhost:5005/model/parse/`, {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())
                .then(json => {
                    const result = new Object;
                    result.score = parseInt(json.intent.name)
                    result.confidence = json.intent.confidence
                    result.points = result.score * result.confidence
                    result.footer = "This data is from the Sophie AI, and is not user data. We will never provide user PII in our APIs."
                    resolve(result);
                })
                .catch(error => {
                    console.log("The connection could not be made, try changing the URL in index.js or waiting. If you think Sophie's AI servers may be offline, check Sophie's API Documentation for server information and how to check status.")
                    reject(error)
                })
        })
}
exports.timestamp = function () {
    const dateOb = new Date();
    const hours = dateOb.getHours();
    const minutes = dateOb.getMinutes();
    const seconds = dateOb.getSeconds();
    return (main.date() + " " + hours + ":" + minutes + ":" + seconds);
};
exports.date = function () {
    const dateOb = new Date();
    const date = ("0" + dateOb.getDate()).slice(-2);
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    const year = dateOb.getFullYear();
    return year + "-" + month + "-" + date;
};
exports.log = function (content) {
    // logging function
    fs.appendFileSync(`./logs/${main.date()}.txt`, `\n [${main.timestamp()}] ${content}`, error => {
        // logging function
        if (error) {
            console.error("Error on Logging: " + error);
            process.exit("LOG_ERROR");
        }
    });
    console.log(content)
    return;
};
exports.hashUsername = function (username) {
    return crypto.createHash("sha256").update(username).digest("hex");
};
exports.userPoints = function (username) {
    const result = db.prepare("SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?").get(username)
    if (!result) {
        return (0);
    }
    if (result.Pedophile == 1) {
        return ("P");
    }
    if (result.Suspicious == 1) {
        return ("S" + result.Points);
    }
    return (result.Points);
};
exports.userAge = function (username) {

    const result = db.prepare(`SELECT Age FROM users WHERE Username = ?`).get(username);
    if (!result) {
        return (404);
    } else {
        return (result.Age);
    }
};
exports.addStrike = function (username, points, message) {
    var age = main.userAge(username)
    if (age != "404") {
        if (age > 17) {
            age = 0;
        } else {
            age = 1;
        }
        points = points - age;
    }
    if (points >= 0.8) {
        update(username, age, points);
        main.log(`User ${username} was hit with a ${points} point strike, for the message ${message}. Run sophie messages for more information.`)
            // easier access to messages for Admins
        db.prepare(`INSERT INTO messages (Message, Sender, Points) VALUES(?, '${username}', '${points}');`).run(message);
    }
}
function update(username, age, points) {

    const userPoints = main.userPoints(username)
    if (!points) {
        points = 0
    }
    if (!userPoints) {
        db.prepare(`INSERT INTO users (Username, Age, Points, Modified) VALUES('${username}', '${age}', '${points}', '${main.date()}')`).run()
    } else {
        db.prepare(`UPDATE users SET Age = '${age}', Points = '${userPoints + points}' , Modified = '${main.date()}' WHERE Username = '${username}'`).run()
    }
};
exports.userBirthday = function (username, requestedAge) {
    if (requestedAge > 117) return (606);
    const currentAge = main.userAge(username)
    if (currentAge == requestedAge) return;
    const result = db.prepare(`SELECT Modified FROM users WHERE Username =  ?`).get(username);
    if (currentAge == 404) {
        update(username, requestedAge);
        return;
    } else if (requestedAge > (currentAge + 1) || requestedAge < currentAge) {
        return (606);
    } else
    if ((result.Modified = main.date())) {
        return (606);
    } else {
        update(username, requestedAge);
    }
}
exports.logFinish = function (startTime) {
    const finishedTime = new Date
    const timeToExecute = finishedTime - startTime
    main.log("Message processed in " + timeToExecute + " ms")
    responseTimes.push(timeToExecute)
    total = 0
    for(var i = 0; i < responseTimes.length; i++) {
        total += responseTimes[i];
    }
    var averageResponseTime = total / responseTimes.length;
    main.log("Average response time is " + averageResponseTime + " ms")
}