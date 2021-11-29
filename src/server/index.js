
//settings and initializations
const dotenv = require('dotenv');
dotenv.config({
    path: `${__dirname}/src/.env`
  });

// const dotenvload = require('dotenv-load')
// dotenvload.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require('path')
const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')

const app = express()


console.log(__dirname)
// const { myAPIKey } = process.dotenv
console.log("Rourou API key is",process.env.myAPIKey);

//************************************ */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))
//******************************** */
//End Initializations
//Rou start code

    // const MeaningCloudURL = "https://api.meaningcloud.com/sentiment-2.1"
    //  const myAPI = "35f1e8cb2902d9b55dfd542e119b1ad5"
    //  const InputURLWIthAPI = `${MeaningCloudURL}?key=${myAPI}&url=${req.body.url}&lang=en`
//Rou End Code

//rou adjust express settings 
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
   
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('my app is listening on port 8081!')
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

//  *****************************   Rou start server *****************************************

//make routes

//get route

/**
 * @description defining get route and send the endpoint (projectData) as server response
 * @param {string} /all - The url of the get route
 * @param {function} anynomous - The function with request and response parameters
*/
app.get('/all',function(req,res){
    // console.log('project data is :' + 'date ' + projectData.date + ' temp ' + projectData.temp + ' user response ' + projectData.userResponse);
   console.log('model ' + projectData.model + ' score_tag:' + projectData.score_tag + ' agreement:' + projectData.agreement);
    res.send(projectData);
  })
  
  //post route
  
  /**
   * @description defining post route and send the endpoint (projectData) as server response
   *              also it writes in the console - terminal - the endpoint data for test purposes
   * @param {string} /addData - The url of the get route
   * @param {function} addWeatherData - The function with request and response parameters thatfill the endpoint with received data
  */
  app.post('/addData', addArticleData)
  
  /**
   * @description fills the endpoint (projectData) with the received data (date, temp, user response)
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

    // projectData.sentence_list=req.body.sentence_list[0].text;
    // projectData.sentimented_entity_list=req.body.sentimented_entity_list[0].form;
    // projectData.sentimented_concept_list=req.body.sentimented_concept_list[0].form;
  
    res.send(projectData)
    console.log('This is server - projectData' + projectData)
    
  } 
  

//********************************   Rou END SERVER ******************************************* */