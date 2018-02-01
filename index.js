var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

//creation of mysql connection 
var connection = mysql.createConnection({
	host:'localhost',
	user : 'root',
	password :'9495',
	database : 'crudnodejs'
});

connection.connect(function (err){
	if (err) throw err
		console.log('you are now connected ');
});

//configuration of bodyParser
//for support JSON - encoded bodies 
app.use(bodyParser.json());
//to support url-encoded bodies
app.use(bodyParser.urlencoded({
	extended:true
}));
//create the server 
var server = app.listen(3000,"127.0.0.1",function(){
	var host = server.address().address;
	var port =server.address().port;
	console.log("app lten at http://%s:%s",host,port)
});

//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from customer', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
app.get('/customer/:id', function (req, res) {
   connection.query('select * from customer where Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to create a new customer record into mysql database
app.post('/customer', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//api for update record into a mysql 
app.put('/customer',function(req,res){
	connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?',[req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function(error,results,fields){
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});

//api to delete record from mysql 
app.delete('/customer', function(req,res){
	console.log(req.body);
	connection.query('DELETE FROM `customer` WHERE `Id`=? ',[req.body.Id], function(error,results,fields){
    if(error) throw error;
    res.end('Record has been updated');
	});
});
