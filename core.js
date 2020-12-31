const fs = require("fs");
const Database = require('better-sqlite3');
const main = require("./core.js");
const db = new Database('./data/sophie.db', {
	verbose: main.log
});
const crypto = require("crypto");
require("dotenv").config();
exports.timestamp = function() {
	const dateOb = new Date();
	const hours = dateOb.getHours();
	const minutes = dateOb.getMinutes();
	const seconds = dateOb.getSeconds();
	return (main.date() + " " + hours + ":" + minutes + ":" + seconds);
};
exports.date = function() {
	const dateOb = new Date();
	const date = ("0" + dateOb.getDate()).slice(-2);
	const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
	const year = dateOb.getFullYear();
	return year + "-" + month + "-" + date;
};
exports.log = function(content) {
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
exports.hashUsername = function(username) {
	return crypto.createHash("sha1").update(username).digest("hex");
};
exports.userPoints = function(username) {
	var result = db.prepare("SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?").get(username)
	if (result === undefined) {
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
exports.userAge = function(username) {
	hashedUsername = main.hashUsername(username)
	var result = db.prepare(`SELECT Age FROM users WHERE Username = ?`).get(hashedUsername);
	if (result === undefined) {
		return (404);
	} else {
		return (result.Age);
	}
};
exports.addStrike = function(username, severity, score, message) {
	var age = main.userAge(username)
	if (age == "404") {
		points = severity * score;
	} else {
		if (age > 17) {
			age = 0;
		} else {
			age = 1;
		}
		points = severity * score - age;
	}
	if (points >= 0.5) {
		main.update(username, age, points);
		main.log(`User ${username} was hit with a ${points} point strike, for the message ${message}. Run sophie messages for more information.`)
		// easier access to messages for Admins
		db.prepare(`INSERT INTO messages (Message, Sender, Points) VALUES(?, '${username}', '${score}');`).run(message);
	}
}
exports.update = function(username, age, points) {
	hashedUsername = main.hashUsername(username);
	var userPoints = main.userPoints(hashedUsername)
	if (points === undefined) {
		points = 0
	}
	if (main.userExists(hashedUsername) == "false") {
		db.prepare(`INSERT INTO users (Username, Age, Points, Modified) VALUES('${hashedUsername}', '${age}', '${points}', '${main.date()}')`).run()
	} else {
		db.prepare(`UPDATE users SET Age = '${age}', Points = '${userPoints + points}' , Modified = '${main.date()}' WHERE Username = '${hashedUsername}'`).run()
	}
};
exports.userExists = function(username) {
	var result = db.prepare(`SELECT Age FROM users WHERE Username = ?`).get(username);
	if (result === undefined) {
		return "false";
	} else {
		return "true";
	}
}
exports.userBirthday = function(username, requestedAge) {
	if (requestedAge > 117) return (606);
	hashedUsername = main.hashUsername(username);
	currentAge = main.userAge(username)
	var result = db.prepare(`SELECT Modified FROM users WHERE Username =  ?`).get(hashedUsername);
	if (currentAge == requestedAge) return;
	if (currentAge == 404) {
		main.update(username, requestedAge, 0);
		return;
	} else if (requestedAge > (currentAge + 1) || requestedAge < currentAge) {
		return (606);
	} else
	if ((result.Modified = main.date())) {
		return (606);
	} else {
		main.update(username, requestedAge, 0);
	}
}