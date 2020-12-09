/*
Sophiebot is designed with the intention to help,
but is provided with no warannty of any kind, implied
or otherwise.

Sophiebot is protected under the MIT License

(c) MIT License by the Sophie Foundation
*/

// We have compressed Sophie into multiple different
// files, one of which is core.js
// which is designed to make updates to Sophie
// as universal and painless as possible

// index.js is used to load the needed files and keep
// them loaded should a crash start, to minimize downtime

// any files in /bots are to be loaded below

// training the AI here so it doesn't have to be done
// on every crash to minimize downtime
const { dockStart } = require('@nlpjs/basic');
require('./core.js')

(async () => {
const dock = await dockStart({ use: ['Basic']});
const nlp = dock.get('nlp');
core.log("Loading the Sophie Model (1/3)");
await nlp.addCorpus(`./models/en.json`);
core.log("Sophie Model loaded! (1/3)")
core.log("Training the Sophie AI Model (2/3)")
await nlp.train();
core.log("Sophie AI finished training! (2/3)")
})

jsfile.forEach((f, i) =>{
    let props = require(`./bots/${f}`);
    core.log(`[!] ${f} loaded!`);
  });

const discord = require('./bots/discord.js')

    discord.init()
    