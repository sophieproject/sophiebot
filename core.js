const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const main = require("./core.js");
const db = new sqlite3.Database("./data/sophie.db");
const crypto = require("crypto");
require("dotenv").config();
exports.msgCheck = async function(message, nlp) {
	const result = await nlp.process("en", message);
	return new Promise(resolve => {
		resolve(result);
	});
};
exports.timestamp = function() {
	const dateOb = new Date();
	// current date
	// adjust 0 before single digit date
	const date = ("0" + dateOb.getDate()).slice(-2);
	// current month
	const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
	// current year
	const year = dateOb.getFullYear();
	// current hours
	const hours = dateOb.getHours();
	// current minutes
	const minutes = dateOb.getMinutes();
	// current seconds
	const seconds = dateOb.getSeconds();
	return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
};
exports.date = function() {
	const dateOb = new Date();
	// current date
	// adjust 0 before single digit date
	const date = ("0" + dateOb.getDate()).slice(-2);
	// current month
	const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
	// current year
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
	console.log(content);
	return;
};
exports.hashUsername = async function(username) {
	return new Promise((resolve, reject) => {
		hash = crypto.createHash("sha256", username).digest("hex");
		resolve(hash);
	});
};
exports.userPoints = async function(username) {
	return new Promise((resolve, reject) => {
		db.get("SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?", [main.hashUsername(username)], async function(err, result) {
			// expected result: {"Points": 0, "Pedophile": 0, "Suspicious": 0}
			if (err) {
				main.log(err);
				reject(err);
			}
			if (result === undefined) {
				resolve(0);
				return;
			}
			if (result.Pedophile == 1) {
				resolve("P");
				return;
			}
			if (result.Suspicious == 1) {
				resolve("S" + result.Points);
				return;
			}
			resolve(result.Points);
		});
	});
};
exports.userAge = async function(username) {
  const hashedUsername = await main.hashUsername(username)
	return new Promise((resolve, reject) => {
		db.get("SELECT Age FROM users WHERE Username = ?", [hashedUsername], async function(err, result) {
			if (err) {
				main.log(err);
				reject(err);
      }
			if (result === undefined) {
				resolve("404");
				return;
			} else {
			resolve(result.Age);
      return;
      }
		});
	});
};
exports.addStrike = async function(username, severity, score, message) {
	return new Promise((resolve, reject) => {
		db.get("SELECT Age FROM users WHERE Username = ?", [main.hashUsername(username)], async function(err, result) {
			if (err) {
				main.log(err);
				reject(err);
			}
			if (result === undefined) {
				points = severity * score;
				AgeValue = undefined;
			} else {
				if (result.Age > 17 || result.Age === undefined) {
					const age = 0;
				} else {
					const age = 1;
				}
				points = severity - result.Age - result.Verified * score;
				AgeValue = result.Age;
			}
			main.update(username, AgeValue, points);
			db.run(`INSERT INTO messages (Message, Sender, Points) VALUES(?, '${username}', '${points}');`, message)
			main.log(`User ${username} had an automated strike placed against them. Run sophie logs to review the strike.`);
		});
	});
};
exports.update = async function(username, age, points) {
	const hashedUsername = await main.hashUsername(username);
		db.get(`SELECT Username, Points FROM users WHERE Username = '${hashedUsername}'`, async function(err, result) { // remove as userPoints does this
			if (err) main.log(err); // Error with SQLite statement Range (Fixed)
			if (result === undefined) {
				db.run(`INSERT INTO users (Username, Age, Points, Modified) VALUES('${hashedUsername}', '${age}', '${points}', '${main.date()}')`, function(err) {
						if (err) main.log(err);
					} // usernames are hashed to protect privacy when privacy is due
				);
			} else {
				db.run(`UPDATE users SET Age = '${age}', Points = '${result.Points +
              points}' , Modified = '${main.date()}' WHERE Username = '${
              result.Username
            }'`);
			}
	});
};
exports.userBirthday = async function(username, age1) {
  return new Promise((resolve, reject) => async function() {
  if (age1 > 117) resolve(606);
  const hashedUsername = await main.hashUsername(username);
  db.get(`SELECT Points, Modified FROM users WHERE Username = '${hashedUsername}'`, async function(err, result) {
		if (currentAge == 404) {
      main.update(username, age1, 0);
      return;
    } else if (age1 > (currentAge + 1) || age1 < currentAge) {
      resolve(606);
      return(606);
		} else
		if ((result.Modified = main.date())) {
      resolve(606);
      return(606);
    } else {
    main.update(username, age1, result.Points);
    }
  });
});
}