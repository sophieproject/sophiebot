const Database = require('better-sqlite3');
const main = require("../core.js");
const db = new Database('./data/sophie.db', {
    verbose: main.log
});
db.prepare("CREATE TABLE `users` (`ID` INTEGER PRIMARY KEY AUTOINCREMENT, `Username` LONGTEXT NOT NULL, `Age` INTEGER(3) NOT NULL, `Points` INTEGER(3) DEFAULT '0' NOT NULL, `Admin` INTEGER(1) DEFAULT '0', `Pedophile` INTEGER(1) DEFAULT '0', `Suspicious` INTEGER(1) DEFAULT '0', `Modified` TIMESTAMP NOT NULL);").run();
db.prepare("CREATE TABLE `messages` (`ID` INTEGER PRIMARY KEY AUTOINCREMENT, `Message` LONGTEXT NOT NULL, `Sender` LONGTEXT NOT NULL, `Points` INTEGER(3) DEFAULT '0' NOT NULL);").run();