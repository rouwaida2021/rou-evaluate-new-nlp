//settings and initializations
//1- setup the enviromental variables
const dotenv = require('dotenv');
dotenv.config()

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
//axios
const axios = require ('axios');
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

// /**
//  * @description defining get route and send the endpoint (projectData) as server response
//  * @param {string} /all - The url of the get route
//  * @param {function} anynomous - The function with request and response parameters
// */
// app.get('/all',function(req,res){
    
//    console.log('model ' + projectData.model + ' score_tag:' + projectData.score_tag + ' agreement:' + projectData.agreement)
//     res.send(projectData)
//   })
  
  //post route
  
  /**
   * @description defining post route and send the endpoint (projectData) as server response
   *              also it writes in the console - terminal - the endpoint data for test purposes
   * @param {string} /addData - The url of the get route

  */

app.post('/addData', async (req, res) => {
   
  const myAPIToSend = process.env.myAPIKey
  const meaningCloudUrl = 'https://api.meaningcloud.com/sentiment-2.1'
  const urlToSend = `${meaningCloudUrl}?key=${myAPIToSend}&url=${req.body.iUURL}&lang=en`
  console.log("NEW FROM SERVER the urlToSend is:",urlToSend)
  // https://api.meaningcloud.com/sentiment-2.1?key=35f1e8cb2902d9b55dfd542e119b1ad5&url=https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)&lang=en
 
    try {


    const response = await axios(urlToSend);
     
    projectData.model=response.data.model;
    projectData.score_tag=response.data.score_tag;
    projectData.agreement=response.data.agreement;

    projectData.subjectivity=response.data.subjectivity;
    projectData.confidence=response.data.confidence;
    projectData.irony=response.data.irony;

    res.send(projectData)
  

      } catch(error){
        console.log("error in getAPIData", error);
        
      }
    // }//end of getArticleData

  
} // end getAPIData

)

//********************************   Rou END SERVER ******************************************* */