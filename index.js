const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require("child_process");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

	res.sendFile( __dirname + "/index.html" )
})

app.get("/secret.html",function(req,res){

	res.sendFile( __dirname + "/secret.html" )
})

app.post("/secret.html",function(req,res){

	const url = req.body.url;

	let r = (Math.random() + 1).toString(36).substring(7);
	res.send("Working on this! " + r + " is your ticket. Have a good day!")
	console.log("Download started")
	const query = "python3 -W ignore download.py " + url;
	exec(query,(error,stdout,stderr)=>{
		if(error)
		{
			console.log(`error: ${error}`)
			return;
		}
		if(stderr)
		{
			console.log(`error: ${stderr}`)
			return;
		}
		console.log(`stdout: ${stdout}`)
		console.log('Download Complete')

	} )
	app.get(`/downloads`,function(req,res){
		res.sendFile(__dirname + 'Downloads/' +'downloaded.zip')
	})

})

app.listen(3000)
