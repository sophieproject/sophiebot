const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/sophie.db");
const main = require("../core.js");

function search_user(username) {
  db.get("SELECT * FROM users WHERE Username = ?", [username], function(
    err,
    result
  ) {
    if (err) main.log(err);
    main.log("User being searched!");
    if (result === undefined) {
      main.log("User not found");
      return;
    }
    console.log(
      `-------------------------------------------------------------------------------------`
    );
    console.log(
      `Username: ${result.Username} | Points: ${result.Points} | Pedophile? ${result.Pedophile} | Suspicious? ${results.Suspicious}`
    );
    console.log(
      `-------------------------------------------------------------------------------------`
    );
  });
}

var Args = process.argv.slice(2);
search_user(Args[0]);
