const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./data/sophie.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
		console.log(err.message);
	} else {
		db.run('CREATE TABLE `users` (`ID` INTEGER PRIMARY KEY AUTOINCREMENT, `Username` LONGTEXT NOT NULL, `Age` INTEGER(3) NOT NULL, `Points` INTEGER(3), `Admin` INTEGER(1) DEFAULT \'0\', `Pedophile` INTEGER(1) DEFAULT \'0\', `Suspicious` INTEGER(1) DEFAULT \'0\', `Modified` TIMESTAMP NOT NULL);');
		db.run('CREATE TABLE `messages` (`ID` INTEGER PRIMARY KEY AUTOINCREMENT, `Message` LONGTEXT NOT NULL, `Sender` INTEGER NOT NULL);');
	}
});