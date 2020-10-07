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
			Twitter.get('users/suggestions/:slug', { slug: 'pro-map' }, function (err, data, response) {
				if (err) throw err
				console.log(data)
			  })
			  Twitter.get('users/suggestions/:slug', { slug: 'map' }, function (err, data, response) {
				if (err) throw err
				console.log(data)
			  })
		  })


