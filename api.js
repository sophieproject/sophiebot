/*
    This API is designed to help other bots help take down pedophiles with our database.
    We provide this service for FREE with a time cap to prevent abuse of the API.
    We do this so if someone wants to use the FREE API to brute-force all entries it will be denied.
    Abuse of this API on our own servers can result in a direct IP BAN as well as a SUSPICIOUS flag inside Pedophile DB.
    IF YOU PLAN TO USE THIS API FOR CONTINUOUS REQUESTS PLEASE CONTACT US!!! */

/* ####################
   #   REQUIREMENTS   #
   #################### */

    var http = require("http");
    var express = require('express');
    var app = express();
    var mysql      = require('mysql');
    var bodyParser = require('body-parser');
    var cors = require('cors');
    require("dotenv").config();

/* #######################
   # END OF REQUIREMENTS #
   ####################### */

/* ###################
   #  CONFIGURATION  #
   ################### */
   // Change these values in the .env file for security
   // If you aren't going to publically post this code then replace the process.env.object with the configuration option
   const SQLPassword = process.env.SQLPassword;
   const SQLHost= process.env.SQLHost;
   const SQLUser = process.env.SQLUser;
   const SQLDatabase = process.env.SQLDatabase;

/* #########################
   #  END OF CONFIGURATION #
   ######################### */
   var db = mysql.createConnection({ // Create and Establish the connection
    host: SQLHost,
    user: SQLUser,
    password: SQLPassword,
    database: SQLDatabase
  });
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
}));
app.use(cors({origin: 'http://localhost'}));
var server = app.listen(6969, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("API Active on http://%s:%s", host, port)
  
  });
  //rest api to get a single entry
app.get('/api/pedodb/:id', function (req, res) {
    try {
    db.query("SELECT * FROM users WHERE ID = ?", [req.params.id], function (error, results, fields) {
       if (error){
           res.end(error)
       }
       res.end(JSON.stringify(results));
     }); 
    } catch(e) {
         res.end(e)
     }
 });
 app.get('/api/ai/:string', function (req, res) {
	// insert code for AI lookup
 });