const fs = require("fs");
const fetch = require("node-fetch")
const Database = require('better-sqlite3');
const main = require("./core.js");
const db = new Database('./data/sophie.db', {
    verbose: main.log
});
const crypto = require("crypto");
const creds = require('./creds.js')
const url = creds.url
responseTimes = []

/* Variables for repeated messages */

/* --- --- --- --- --- --- --- --- */

exports.explicitCheck = function (message) {
    return new Promise(function (resolve, reject) {
        message = message.replace(/\//g, "")
        const body = {
            text: message,
        }
        fetch(`http://${url}/model/parse/`, {
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
                resolve(result);
            })
            .catch(error => {
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
    fs.appendFileSync(`./logs/${main.date()}.txt`, `\n [${main.timestamp()}] ${content}`, error => {
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

}