const fs = require("fs");
const { dockStart } = require("@nlpjs/basic");
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./data/sophie.db");
const main = require('./core.js')
var path = require("path");
global.root = path.resolve(__dirname);

exports.msgCheck = function(message){
  async () => {
    const response = await nlp.process("en", message);
    return response;
  };
}
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
  }
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
  }

  exports.log = function(content) {
    // logging function
    fs.appendFileSync(
      `${root}/logs/${main.date()}.txt`,
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
  }

  exports.userPoints = function(username) {
    db.run(
      `SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?`,
      [username],
      function(err, result) {
        if (err) {
          main.log(err);
          return err;
        }
        if (result.length < 2) return "404";
        if ((result[0].Pedophile = 1)) return "P";
        if ((result[0].Suspicious = 1)) {
          return "S" + result[0].Points;
        } else {
          return result[0].Points;
        }
      }
    );
  }

  exports.userAge = function(username) {
    db.run(
      `SELECT Age, Timestamp FROM users WHERE Username = ?`,
      [username],
      function(err, result) {
        if (err) {
          main.log(err);
          return err;
        }
        if (result.length < 2) return "404";
        return result[0].Age;
      }
    );
  }

  exports.update = function(username, age, points) {
    db.run(`SELECT * FROM users WHERE Username = ?`, [username], function(
      err,
      result
    ) {
      if (err) main.log(err);
      if (result.length > 2) {
        UserID = result[0].ID;
        db.run(
          `INSERT INTO users (ID, Age, Points, Modified) VALUES('${UserID}', '${age}', '${points}', ${date()}) ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${date()}'`,
          function(err) {
            if (err) main.log(err);
          }
        );
      } else {
        db.run(
          `INSERT INTO users (Username, Age, Points, Modified) VALUES('${username}', '${age}', '${points}', ${date()}) ON DUPLICATE KEY UPDATE Age = '${age}', Points = '${points}', Modified = '${date()}'`,
          function(err) {
            if (err) main.log(err);
          } // hash the Username later, and anticipate hashed usernames
        );
      }
    });
  }

 exports.userBirthday = function(username, age) {
    if (age > 117) return "606";
    db.run(
      `SELECT Age, Modified FROM users WHERE Username = ?`,
      [username],
      function(err, result) {
        if (err) {
          main.log(err);
          return err;
        }
        let currentAge = userAge(username);
        if (age > currentAge + 1) return "606";
        if ((result[0].Modified = main.date())) return "606";
        main.update(username, age);
      }
    );
  }

  exports.allPedophiles = function() {
    db.run("SELECT Username FROM users WHERE Pedophile = '1'", [], function(
      err,
      result
    ) {
      if (err) main.log(err);
      blacklist = [];
      for (let i = 0; i < result.length; i++) {
        blacklist.push(result[i].ID);
      }
      return blacklist;
    });
  }
