/*
This project was made by the Sophie Foundation and
is protected under the MIT License.
(c) 2020 - The Sophie Foundation
*/

/*
##############################################
# INIT SEQUENCE                              #
############################################## */
require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');

/*
#############################################
*/

/*
#############################################
# CONFIGURATION                             #
#############################################
*/

// If you have this on a local copy and are not
// relying on GitHub or public repos - you can
// replace the .env config with the plain values

console.log('Loading configuration (1/3)');
const DiscordToken = process.env.DiscordToken;
const client = new Discord.Client();
client.on('ready', () => {
  client.on('message', (msg) => {
    if (msg.author.bot == true) return;
    message = msg.content;
    message = message.split('/').join('');
    message = message.split('\ ').join('');
    message = message.split('<').join('');
    message = message.split('>').join('');
    message = message.split('@').join('');
    console.log(message);
    const body = {
      text: message,
    };
    fetch('http://localhost:5005/model/parse', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    })
        .then((res) => res.json())
        .then((json) => {
          msg.channel.send(`Intent: ${json.intent.name} \n Certainty: ${json.intent.confidence} \n Entity: ${JSON.stringify(json.entities)}`);
        });
  });
});
client.login(DiscordToken);