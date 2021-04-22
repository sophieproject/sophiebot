const Database = require('better-sqlite3');
const main = require("../core.js");
const db = new Database('./data/sophie.db', {
    verbose: main.log
});

function userAdd(username, suspicious, pedophile) {
    const result = db.prepare("SELECT Age FROM users WHERE Username = ?", [username]).get()
    if (!result) {
        db.prepare(`INSERT INTO users (Username, Suspicious, Pedophile, Modified) VALUES('${username}', '${suspicious}', '${pedophile}', ${main.date()})`).run();
    } else {
        const UserID = result[0].ID;
        const UserAge = result[0].Age;
        db.prepare(`INSERT INTO users (ID, Suspicious, Pedophile, Age, Modified) VALUES('${UserID}', '${suspicious}', '${pedophile}', ${UserAge}, ${main.date()}) ON CONFLICT(ID) DO UPDATE SET Suspicious = '${suspicious}', Pedophile = '${pedophile}', Modified = '${main.date()}'`).run();
    }
}
var Args = process.argv.slice(2);
main.log("User is being force-added to database!");
main.log(`---------------------------------------------------------------`);
main.log(`Username: ${Args[0]} | Suspicious? ${Args[1]} | Pedophile? ${Args[2]}`); //Log admin actions
main.log(`---------------------------------------------------------------`);
userAdd(Args[0], Args[1], Args[2]);