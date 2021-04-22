/*
Sophiebot is designed with the intention to help,
but is provided with no warannty of any kind, implied
or otherwise.

Sophiebot is protected under the MIT License

(c) MIT License by the Sophie Foundation

We have compressed Sophie into multiple different
files, one of which is core.js
which is designed to make updates to Sophie
as universal and painless as possible

index.js is used to load the needed files and keep
them loaded should a crash start, to minimize downtime

any files in /bots are to be loaded below

training the AI here so it doesn't have to be done
on every crash to minimize downtime
*/
const main = require("./core.js");
const creds = require("./creds.js")
const fetch = require("node-fetch")

function checkAI() {
  fetch("http://" + creds.url).then(res => {
    if (res.ok) {
      main.log("Sophie's AI Server has been loaded (1/2)")
      // Load all bots here
      main.log("Loading Sophie Bots (2/2)")
      var botPath = require("path").join(__dirname, "bots");
      require("fs").readdirSync(botPath).forEach(function (file) {
        main.log("Loading " + file)
        bot = require("./bots/" + file);
        main.log("Starting " + file)
        bot.init();
      });
      main.log("All Sophie Bots started! (2/2)")
    } else {
      (async () => {
        await delay(1000) // Wait a second to allow the port to open
        main.log("Awating Sophie's AI Server")
        checkAI();
      });
    }
  });
}

main.log("Checking Sophie's AI Server (1/2)")
checkAI();
