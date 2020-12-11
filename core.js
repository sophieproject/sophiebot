const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/sophie.db");
const main = require("./core.js");
require("dotenv").config();

async function msgCheck1(message) {
  const response = await nlp.process("en", message);
  return response;
}

exports.msgCheck = function(message) {
  return msgCheck1(message);
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

  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
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
  fs.appendFileSync(
    `./logs/${main.date()}.txt`,
    `\n [${main.timestamp()}] ${content}`,
    error => {
      // logging function
      if (error) {
        console.error("Error on Logging: " + error);
        process.exit("LOG_ERROR");
      }
    }
  );
};

exports.userPoints = async function(username) {
  db.run(
    "SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?",
    [username],
    function(err, result) {
      // result: {"Points": 0 , "Pedophile": 0, "Suspicious": 0}
      if (err) {
        main.log(err);
        return err;
      }
      console.log(result);
      if (result === undefined) return "404";
      if ((result[0].Pedophile = "1")) return "P";
      if ((result[0].Suspicious = "1")) return "S" + result[0].Points;
      return result[0].Points;
    }
  );
};

exports.userAge = function(username) {
  db.run(
    "SELECT Age, Timestamp FROM users WHERE Username = ?",
    [username],
    function(err, result) {
      if (err) {
        main.log(err);
        return err;
      }
      if (result === undefined) return "404";
      return result[0].Age;
    }
  );
};

exports.update = function(username, age, points) {
  db.run("SELECT * FROM users WHERE Username = ?", [username], function(
    err,
    result
  ) {
    if (err) main.log(err);
    if (result === undefined) {
      const UserID = result[0].ID;
      db.run(
        `INSERT INTO users (ID, Age, Points, Modified) VALUES('${UserID}', '${age}', '${points}', ${main.date()}) ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${main.date()}'`,
        function(err) {
          if (err) main.log(err);
        }
      );
    } else {
      db.run(
        `INSERT INTO users (Username, Age, Points, Modified) VALUES('${username}', '${age}', '${points}', ${main.date()}) ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${main.date()}'`,
        function(err) {
          if (err) main.log(err);
        } // hash the Username later, and anticipate hashed usernames
      );
    }
  });
};

exports.userBirthday = function(username, age) {
  if (age > 117) return "606";
  db.run(
    "SELECT Age, Modified FROM users WHERE Username = ?",
    [username],
    function(err, result) {
      if (err) {
        main.log(err);
        return err;
      }
      const currentAge = main.userAge(username);
      if (age > currentAge + 1) return "606";
      if ((result[0].Modified = main.date())) return "606";
      main.update(username, age);
    }
  );
};

exports.allPedophiles = function() {
  db.run("SELECT Username FROM users WHERE Pedophile = '1'", [], function(
    err,
    result
  ) {
    if (err) main.log(err);
    const blacklist = [];
    for (let i = 0; i < result.length; i++) {
      blacklist.push(result[i].ID);
    }
    return blacklist;
  });
};
