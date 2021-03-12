import * as fs from 'fs';
import fetch from 'node-fetch';
import Database from 'better-sqlite3';

const db = Database('./data/sophie.db', {
    verbose: console.log
});
import * as crypto from 'crypto';
import { load } from 'ts-dotenv';

const env = load({
    DiscordToken:String
})

var responseTimes:Array<Number> = []

export class check {

    public explicit(message:string) {

        return new Promise(function (resolve, reject) {
            message = message.replace(/\//g, "")
            const body = {
                text: message,
            }
            fetch(`http://localhost:5005/model/parse/`, {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())
                .then(json => {
                    const result:any = new Object;
                    result.score = parseInt(json.intent.name)
                    result.confidence = json.intent.confidence
                    result.points = result.score * result.confidence
                    result.footer = "This data is from the Sophie AI, and is not user data. We will never provide user PII in our APIs."
                    resolve(result);
                })
                .catch(error => {
                    console.log("The connection could not be made, try changing the URL in index.js or waiting. If you think Sophie's AI servers may be offline, check Sophie's API Documentation for server information and how to check status.")
                    reject(error)
                })
        })
        

    }

}

/* exports.explicitCheck = function (message) {
    return new Promise(function (resolve, reject) {
            message = message.replace(/\//g, "")
            const body = {
                text: message,
            }
            fetch(`http://localhost:5005/model/parse/`, {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())
                .then(json => {
                    const result = new Object;
                    result.score = parseInt(json.intent.name)
                    result.confidence = json.intent.confidence
                    result.points = result.score * result.confidence
                    result.footer = "This data is from the Sophie AI, and is not user data. We will never provide user PII in our APIs."
                    resolve(result);
                })
                .catch(error => {
                    console.log("The conneesolve(reesolve(rection could not be made, try changing the URL in index.js or waiting. If you think Sophie's AI servers may be offline, check Sophie's API Documentation for server information and how to check status.")
                    reject(error)
                })
        })
} */

export class time {

    public FullTime () {

        const self = new time;

        const dateOb = new Date();
        const hours = dateOb.getHours();
        const minutes = dateOb.getMinutes();
        const seconds = dateOb.getSeconds();
        return (self.date + " " + hours + ":" + minutes + ":" + seconds);

    }

    public date () {

        const dateOb = new Date();
        const date = ("0" + dateOb.getDate()).slice(-2);
        const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
        const year = dateOb.getFullYear();
        return year + "-" + month + "-" + date;

    }

}

export class monitor {

    public log (content:string) {

        const dates = new time;

        // logging function

        var data:string = `\n [${dates.FullTime}] ${content}`;

        fs.appendFile(`./logs/${dates.date}.txt`, data, (err) => {
            // logging function
            if (err) throw err;
            return process.exit(1);
        });
        console.log(content)
        return;
    };

    public logFinish (startTime) {
        const self = new monitor;
        const finishedTime:any = new Date
        const timeToExecute = finishedTime - startTime
        self.log("Message processed in " + timeToExecute + " ms")
        responseTimes.push(timeToExecute)
        var total:number = 0
        for(var i = 0; i < responseTimes.length; i++) {
            responseTimes.push(i);
        }
        let averageResponseTime = total / responseTimes.length;
        self.log("Average response time is " + averageResponseTime + " ms")
    }

}

export class pdb {

    private update(username, age, points) {
        const pd = new pdb;
        const t = new time;
    
        const userPoints = pd.userPoints(username)
        if (!points) {
            points = 0
        }
        if (!userPoints) {
            db.prepare(`INSERT INTO users (Username, Age, Points, Modified) VALUES('${username}', '${age}', '${points}', '${t.date()}')`).run()
        } else {
            db.prepare(`UPDATE users SET Age = '${age}', Points = '${userPoints + points}' , Modified = '${t.date()}' WHERE Username = '${username}'`).run()
        }
    };

    public hash (username:string) {

        return crypto.createHash("sha256").update(username).digest("hex");

    }

    public userPoints (username:string) {

        const result = db.prepare("SELECT Points, Pedophile, Suspicious FROM users WHERE Username = ?").get(username)
        if (!result) {
            return (0);
        }
        if (result.Pedophile == 1) {
            return ("P");
        }
        if (result.Suspicious == 1) {
            return ("S" + result.Points);
        }
        return (result.Points);

    }

    public userAge (username) {

        const result = db.prepare(`SELECT Age FROM users WHERE Username = ?`).get(username);
        if (!result) {
            return (404);
        } else {
            return (result.Age);
        }
    };

    public addStrike (username, points, message) {
        const self = new pdb;
        const mon = new monitor;
        var age = self.userAge(username)
        if (age != "404") {
            if (age > 17) {
                age = 0;
            } else {
                age = 1;
            }
            points = points - age;
        }
        if (points >= 0.8) {
            self.update(username, age, points);
            mon.log(`User ${username} was hit with a ${points} point strike, for the message ${message}. Run sophie messages for more information.`)
                // easier access to messages for Admins
            db.prepare(`INSERT INTO messages (Message, Sender, Points) VALUES(?, '${username}', '${points}');`).run(message);
        }
    }


    public userBirthday (username, requestedAge) {
        const self = new pdb;
        const t = new time;
        if (requestedAge > 117) return (606);
        const currentAge = self.userAge(username)
        if (currentAge == requestedAge) return;
        const result = db.prepare(`SELECT Modified FROM users WHERE Username =  ?`).get(username);
        if (currentAge == 404) {
            self.update(username, requestedAge, 0);
            return;
        } else if (requestedAge > (currentAge + 1) || requestedAge < currentAge) {
            return (606);
        } else
        if ((result.Modified = t.date())) {
            return (606);
        } else {
            self.update(username, requestedAge, 0);
        }
    }

}