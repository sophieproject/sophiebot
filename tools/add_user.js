const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/sophie.db");
const main = require("../core.js");

function userUpdate(username, suspicious, pedophile) {
  db.run("SELECT * FROM users WHERE Username = ?", [username], function(
    err,
    result
  ) {
    if (err) main.log(err);
    if (result === undefined) {
      db.run(
        `INSERT INTO users (Username, Suspicious, Pedophile, Modified) VALUES('${username}', '${suspicious}', '${pedophile}', ${main.date()})`,
        function(err) {
          if (err) main.log(err);
        } // hash the Username later, and anticipate hashed usernames
      );
    } else {
      const UserID = result[0].ID;
      const UserAge = result[0].Age;
      db.run(
        `INSERT INTO users (ID, Suspicious, Pedophile, Age, Modified) VALUES('${UserID}', '${suspicious}', '${pedophile}', ${UserAge}, ${main.date()}) ON CONFLICT(ID) DO UPDATE SET Suspicious = '${suspicious}', Pedophile = '${pedophile}', Modified = '${main.date()}'`,
        function(err) {
          if (err) main.log(err);
        }
      );
    }
  });
}

var Args = process.argv.slice(2);
main.log("User is being force-added to database!");
main.log(`---------------------------------------------------------------`);
main.log(`Username: ${Args[0]} | Suspicious? ${Args[1]} | Pedophile? ${Args[2]}`); //Log admin actions
main.log(`---------------------------------------------------------------`);
userUpdate(Args[0], Args[1], Args[2]);
