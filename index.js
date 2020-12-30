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
const portfinder = require('portfinder');
portfinder.basePort = 5005; // default port: 5005
portfinder.highestPort = 5005;
portfinder.getPortPromise().then(() => {
	main.log("Sophie's AI server is not deployed. Closing.")
	process.exit()
}).catch(() => {
	const discord = require("./bots/discord.js")
	discord.init();
});