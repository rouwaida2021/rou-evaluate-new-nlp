
//settings and initializations
//1- setup the enviromental variables
const dotenv = require('dotenv')
dotenv.config({
    path: `${__dirname}/src/.env`
  })

// Setup an empty JS object to act as endpoint for all routes in my project
projectData = {}

var path = require('path')

//Setup express
const express = require('express')

const app = express()


console.log(__dirname) //for test
console.log("Rourou API key is",process.env.myAPIKey) //for test

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder (dist)
app.use(express.static('dist'))

//End Initializations

//get request 
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
   
})

// designates what port the server will listen to for incoming requests
app.listen(8081, function () {
    console.log('my app is listening on port 8081!')
})

//  *****************************   Rou start server *****************************************

//make routes

//get route

/**
 * @description defining get route and send the endpoint (projectData) as server response
 * @param {string} /all - The url of the get route
 * @param {function} anynomous - The function with request and response parameters
*/
app.get('/all',function(req,res){
    
   console.log('model ' + projectData.model + ' score_tag:' + projectData.score_tag + ' agreement:' + projectData.agreement)
    res.send(projectData)
  })
  
  //post route
  
  /**
   * @description defining post route and send the endpoint (projectData) as server response
   *              also it writes in the console - terminal - the endpoint data for test purposes
   * @param {string} /addData - The url of the get route
   * @param {function} addArticleData - The function with request and response parameters that fill the endpoint with received data
  */
  app.post('/addData', addArticleData)
  
  /**
   * @description fills the endpoint (projectData) with the received data (model, score_tag, agreement, subjectivity,confidence,irony)
   *              sends the projectData endpoint to the client
   * @param {object} req - the request
   * @param {object} res - The response
  */
  function addArticleData(req, res){
   
    console.log('from server: request :' + req.body)
  
    projectData.model=req.body.model;
    projectData.score_tag=req.body.score_tag;
    projectData.agreement=req.body.agreement;

    projectData.subjectivity=req.body.subjectivity;
    projectData.confidence=req.body.confidence;
    projectData.irony=req.body.irony;
 
    res.send(projectData)
    console.log('This is server - projectData' + projectData)//for test s
    
  } 
  
//********************************   Rou END SERVER ******************************************* */