/* ##################
   #  REQUIREMENTS  #
   ################## */
   require("dotenv").config();
   const Snoowrap = require('snoowrap');
   const Snoostorm = require('snoostorm');
   const mysql = require("mysql");
   const fs = require("fs");
   const explicit = fs
	 .readFileSync("explicit.txt")
	 .toString()
	 .split("\r\n");
   const suspicious = fs
	 .readFileSync("suspicious.txt")
	 .toString()
	 .split("\r\n");
   /* #########################
		 #  END OFF REQUIREMENTS #
		 ######################### */

		    /* ###################
		 #  CONFIGURATION  #
		 ################### */
   
   // Change these values in the .env file for security
   const Username = process.env.RedditUser;
   const Password = process.env.RedditPass;
   const ClientID = process.env.RedditID;
   const ClientSecret = process.env.RedditSecret;
   const SQLPassword = process.env.SQLPassword;
   const SQLHost = process.env.SQLHost;
   const SQLUser = process.env.SQLUser;
   const SQLDatabase = process.env.SQLDatabase;
   /* #########################
		 #  END OF CONFIGURATION #
		 ######################### */

		 const r = new Snoowrap({
			userAgent: 'SophieBot',
			clientId: ClientID,
			clientSecret: ClientSecret,
			username: Username,
			password: Password
		});
		const client = new Snoostorm(r);
		
		const streamOpts = {
			subreddit: 'all',
		};
		// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    console.log(comment);
});
/*
Waiting for Reddit application to be accepted, then I'll look at everything and continue the work.
*/