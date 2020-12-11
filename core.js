const fs = require("fs");
const { callbackify } = require("util");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/sophie.db");
const main = require("./core.js");
require("dotenv").config();

exports.msgCheck = async function(message) {
 const result = await nlp.process("en", message);
  return new Promise((resolve, reject) => {
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
  console.log(content);
};

exports.userPoints = function(username) {
  return new Promise((resolve, reject) => {
  db.get(
    "SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?",
    [username],
   async function(err, result) {
      // expected result: {"Points": 0, "Pedophile": 0, "Suspicious": 0}
      if (err) {
        main.log(err);
        reject(err);
      }
      console.log(result);
      if (result === undefined) { resolve("404"); return; }
      console.log(result.Pedophile)
      if (result.Pedophile == 1) { resolve("P"); return; }
      if (result.Suspicious == 1) { resolve("S" + result[0].Points); return; }
      resolve (result[0].Points)
      return;
    }
  );
  });
};

exports.userAge = function(username) {
  db.get(
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
  db.get("SELECT * FROM users WHERE Username = ?", [username], function(
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
  db.get(
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
  db.get("SELECT Username FROM users WHERE Pedophile = '1'", [], function(
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
