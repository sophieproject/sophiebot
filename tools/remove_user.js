const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/sophie.db");
const main = require("../core.js");

function remove_user(username) {
	db.get("SELECT * FROM users WHERE Username = ?", [username], function(err, result) {
		if (result === undefined) {
			main.log("User not found");
			return;
		}
		main.log("User being removed!");
		main.log(`-------------------------------------------------------------------------------------`);
		main.log(`Username: ${result.Username} | Points: ${result.Points} | Pedophile? ${result.Pedophile} | Suspicious? ${result.Suspicious}`);
		main.log(`-------------------------------------------------------------------------------------`);
		db.run("DELETE FROM users WHERE Username = ?", [username]);
	});
}
var Args = process.argv.slice(2);
try {
	remove_user(Args[0]);
	main.log("User Removed from Sophie's Database by Administratior!");
	main.log(`Username: ${Args[0]}`); //Log admin actions
} catch {
	console.log("cant do that chief!")
}