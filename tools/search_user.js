const Database = require('better-sqlite3');
const main = require("../core.js");
const db = new Database('./data/sophie.db', {
    verbose: main.log
});
const Args = process.argv.slice(2);
    const result = db.prepare("SELECT * FROM users WHERE Username = ?", [Args[0]]).get();
    if (err) main.log(err);
    main.log("User being searched: " + Args[0]);
    if (!result) {
        main.log("User not found");
        return;
    }
    console.log(`-------------------------------------------------------------------------------------`);
    console.log(`Username: ${result.Username} | Points: ${result.Points} | Pedophile? ${result.Pedophile} | Suspicious? ${result.Suspicious}`);
    console.log(`-------------------------------------------------------------------------------------`);