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
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const main = require("./core.js");
async function Init() {
  main.log("Starting the training process! (1/3)")
 // const { stdout, stderr } = await exec("cd .\\model && .\\venv\\Scripts\\activate && rasa train")
 // main.log(stdout);
  main.log("Training Finished! (1/3)")
  exec("cd .\\model && .\\venv\\Scripts\\activate && rasa run --enable-api")
  const discord = require("./bots/discord.js")
  discord.init();
}

Init();
