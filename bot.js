require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
//
const TOKEN = process.env.TOKEN;
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`); // active

  //declaring some variables
  age = ["i", "i'm", "i am"];
  minornumber = ["10", "11", "12", "13", "14", "15", "16"]
  adultnumber = ["21"];
  youngadultnumber = ["17", "18", "19"]; // unfortunatly this doesn't protect against lies - but if an age has already been filled it'll say so
  explicit = [];

bot.on('message', msg => {
  // confirm ages



for (var i = 0; i < age.length; i++) {
if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(minornumber[i])) {
  msg.channel.send(`Age confirmed: Minor \n ID: ${msg.author.id}`);
  fs.writeFile(`db/${msg.author.id}`, "Minor", function(err) {
    if(err) {
        return console.log(err);
    }
    msg.channel.send("Age saved!");
});
  break;
}
}


for (var i = 0; i < age.length; i++) {
if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(adultnumber[i])) {
  msg.channel.send(`Age confirmed: Adult \n ID: ${msg.author.id}`);
  fs.writeFile(`db/${msg.author.id}`, "Adult", function(err) {
    if(err) {
        return console.log(err);
    }
    msg.channel.send("Age saved!");
});
  break;
}
}


for (var i = 0; i < age.length; i++) {
if (msg.content.toLowerCase().includes(age[i]) && msg.content.includes(youngadultnumber[i])) {
  msg.channel.send(`Age confirmed: Young Adult \n ID: ${msg.author.id}`);
  fs.writeFile(`db/${msg.author.id}`, "Young Adult", function(err) {
    if(err) {
        return console.log(err);
    }
    msg.channel.send("Age saved!");
});
  break;
}
}

/*
// IF FILE NOT FOUND
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Alert!",
    description: "I could not find this user's age in my database. Proceed with caution!",
    timestamp: new Date(),
    footer: {
      text: "Psst! You can set your age by saying "I am (age)", that way you won't be flagged again!"
    }
  }
});

// IF AGE MISMATCH
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "WARNING",
    description: "This user claimed to be older in another server, and they may not be the age they claim to be! Proceed wth extreme caution!",
    timestamp: new Date(),
    footer: {
      text: "This bot is not 100% accurate and results may be flawed or incorrect."
    }
  }
});

// IF ADULT -> CHILD
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "WARNING",
    description: "This user is an adult! Please proceed with extreme caution!",
    timestamp: new Date(),
    footer: {
      text: "This bot is not 100% accurate and results may be flawed or incorrect."
    }
  }
});

// IF PRETEEN -> CHILD
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "ALERT",
    description: "This user is 16-19, please proceed with caution.",
    timestamp: new Date(),
    footer: {
      text: "This bot is not 100% accurate and results may be flawed or incorrect."
    }
  }
});

// IF PEDOPHILE (banned)
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "WARNING",
    description: "A verified pedophile has been detected. Proceed with extreme caution!",
    timestamp: new Date(),
    footer: {
      text: "This bot is not 100% accurate and results may be flawed or incorrect."
    }
  }
});
*/

// EOC
});
});
bot.login(TOKEN);
