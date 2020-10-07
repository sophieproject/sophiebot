// THIS BOT IS A WORK IN PROGRESS AND IS IN NO WAY FUNCTIONAL. FEEL FREE TO CONTRIBUTE BUT PLEASE DO NOT REPORT ANY ISSUES WITH THIS SCRIPT AS IT IS NOT DONE

/* ##################
   #  REQUIREMENTS  #
   ################## */
   require("dotenv").config();
   const Twit = require('twit');
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
   const Consumer_Key = process.env.TwitterConsumer_Key;
   const Consumer_Secret = process.env.TwitterConsumer_Secret;
   const Access_Token = process.env.TwitterAccess_Token;
   const Access_Token_Secret = process.env.TwitterAccess_Token_Secret;
   const SQLPassword = process.env.SQLPassword;
   const SQLHost = process.env.SQLHost;
   const SQLUser = process.env.SQLUser;
   const SQLDatabase = process.env.SQLDatabase;
   /* #########################
		 #  END OF CONFIGURATION #
		 ######################### */


		 var Twitter = new Twit({
			consumer_key: Consumer_Key
			, consumer_secret: Consumer_Secret
			, access_token: Access_Token
			, access_token_secret: Access_Token_Secret
		 });
		 stream.on('connect', function (request) {
			const db = mysql.createConnection({
				// Create and Establish the connection
				host: SQLHost,
				user: SQLUser,
				password: SQLPassword,
				database: SQLDatabase
			  }); 
		  })
		  stream.on('connected', function (response) {
			stream.on('user_event', function (eventMsg) {
				console.log(eventMsg)
				if(eventMsg == "follow"){
					console.log("Sophie was followed")
				}
				if(eventMsg == "unfollow"){
					console.log("Sophie was unfollowed")
				}
			  })
		  })

		  /*
		  This bot is no longer is progress.
		  Twitter declined our application for use
		  of their API. We are no longer updating
		  this part of the bot as we cannot
		  use the source code on Twitter.

		  Sorry! 

		  -Will from Development
		  */
