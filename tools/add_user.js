const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sophie.db');
const main = require('../core.js');

function userUpdate(username, suspicious, pedophile) {
    db.run('SELECT * FROM users WHERE Username = ?', [username], function(
        err,
        result,
    ) {
      if (err) main.log(err);
      console.log(result)
      if (result === undefined) {
        db.run(
            `INSERT INTO users (Username, Suspicious, Pedophile, Age, Modified) VALUES('${username}', '${suspicious}', '${pedophile}', '0' , ${main.date()})`,
            function(err) {
              if (err) main.log(err);
            }, // hash the Username later, and anticipate hashed usernames
        );
        
      } else {
        const UserID = result[0].ID;
        const UserAge
        db.run(
            `INSERT INTO users (ID, Suspicious, Pedophile, Modified) VALUES('${UserID}', '${suspicious}', '${pedophile}', ${main.date()}) ON CONFLICT(ID) DO UPDATE SET Suspicious = '${suspicious}', Pedophile = '${pedophile}', Modified = '${main.date()}'`,
            function(err) {
              if (err) main.log(err);
            },
        );
      }
    });
  };

var Args = process.argv.slice(2);
userUpdate(Args[0], Args[1], Args[2])