
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('myURL').value
    // let formText = "https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)"
    console.log("The url typed is",formText)
    const urlCheckerResult = MyClient.checkForRightURL(formText)
    console.log("URL Checker Result is:",urlCheckerResult)
    console.log("Rou API key is",process.env.myAPIKey);
    // Sentiment Analysis API
    //Rou new code
    
    
    
    //the post code
    // a route that handling post request for new URL that coming from the frontend

     
    //End Rou new code

    //Collect Url parts:
    // const InputURLWIthAPI = formText + process.env.myAPIKey
    // const InputURLWIthAPI = `https://api.meaningcloud.com/sentiment-2.1?key=35f1e8cb2902d9b55dfd542e119b1ad5&lang=en`
    
//********************************  START  ****************************************** */

//Adding event listener on click for the button  "Generate" an calling prepareWeatherData function
document.getElementById('btnSubmit').addEventListener('click', prepareArticleData);

}//End of handleSubmit
/**
 * @description get the zip code and the user feelings from input, 
 *              insure zip code has entered
 *              calling the fetch API and chained promises
*/
function prepareArticleData(){
const inputUserURL =  document.getElementById('myURL').value
const isRightURL = MyClient.checkForRightURL(inputUserURL)
const myAPIKeyToSend = '?key=35f1e8cb2902d9b55dfd542e119b1ad5'
const meaningCloudUrl = 'https://api.meaningcloud.com/sentiment-2.1'
if (isRightURL===false)
{
    alert('Kindly enter a valid URL!');
}
else
{
  //chaining promises here 3 functions call

    const urlToSend = "&url=" + inputUserURL
    console.log("meaningCloudUrl",meaningCloudUrl) //for test
    console.log("urlToSend",urlToSend)  //for test
    console.log("urlToSend",myAPIKeyToSend)  //for test

    let myReturnedArticleData=getArticleData(meaningCloudUrl,urlToSend,myAPIKeyToSend);
    myReturnedArticleData
    .then(function(data){      //Rou post new call
        // postData('/addData',{
      postData('http://localhost:8081/addData',{

        model: data.model,
        score_tag: data.score_tag,
        agreement:data.agreement,
        subjectivity:data.subjectivity,
        confidence:data.confidence,
        irony:data.irony,

        // sentence_list: data.sentence_list[0].text,
        // sentimented_entity_list: data.sentimented_entity_list[0].form,
        // sentimented_concept_list: data.sentimented_concept_list[0].form
        
               
    });
      })// end of .then
    .then(()=>updateMyUI())
    // .catch(console.log(Error ('Post failed ')));
   
    }//end of else

}  // rou end of prepareArticleData



//Rou definition of updateMyUI

//Rou definition of getWeatherData function

/**
 * @description asynchronous function used to fech API using API key, Weather URL and Zip code entered by user
 * @param {string} wUrl - The url of the weather journal
 * @param {string} zip - The zip code of the region we want to grap weather data
 * @param {string} api - The api key received while making credentials
 * @returns {string} data - the response of the weather journal api after transforming it to javascript format
*/
const getArticleData = async (mCUrl, iUURL, api)=>{

    //require unit of the temperature as celcius
    
    const res = await fetch(mCUrl+api+iUURL+'&lang=en');
    try {

        //convert returned data from json format to javascript format
        const data = await res.json();

        console.log(data);  // for test
        // console.log(data.name);  // for test
        // console.log(data.main.temp);  // for test
    
        return data;
      } catch(error){
        console.log("error in getArticleData", error);
        // appropriately handle the error
      }
    }//end of getweatherdata function definition

//Rou definition of post request
//

/**
 * @description asynchronous function used to post received weather api to the server endpoint
 * @param {string} url - The url of the post function
 * @param {function} data - The callback function that define the post reponse
*/
  const postData = async(url, data={})=>{
console.log("the url is:" , url)
  const response = await fetch(url, {
    "method": 'POST',
    "credentials": 'same-origin',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  try {
  
    return;
  }catch(error) {
    console.log("Post error", error);
  }

}//end of post function

//Rou definition of updateMyUI

/**
 * @description asynchronous function used to update user interface by the data registered in the endpoint defined at server.js
 * @param {function} anynomous - The callback function that wait for get request to read endpoint data and update the interface from it
*/
const updateMyUI = async ()=>{
  const myRequest = await fetch('http://localhost:8081/all')
  try{
    const myReturnedData = await myRequest.json();
    // console.log('from updateUI : myReturnedData is:' + myReturnedData.userResponse);
    // document.getElementById('results').innerHTML = myReturnedData.status;
    document.getElementById('model').innerHTML='Model: ' + myReturnedData.model;
    document.getElementById('score_tag').innerHTML='Score Tag: ' + myReturnedData.score_tag;
    document.getElementById('agreement').innerHTML='Agreement: ' + myReturnedData.agreement;

    document.getElementById('subjectivity').innerHTML='Subjectivity: ' + myReturnedData.subjectivity;
    document.getElementById('confidence').innerHTML='Confidence: ' + myReturnedData.confidence;
    document.getElementById('irony').innerHTML='Irony: ' + myReturnedData.irony;

    // document.getElementById('sentence_list').innerHTML='Text of sentence_list[0]: ' + myReturnedData.sentence_list[0].text;
    // document.getElementById('sentimented_entity_list').innerHTML='Form of sentimented_entity_list[0]: ' + myReturnedData.sentimented_entity_list[0].form;
    // document.getElementById('sentimented_concept_list').innerHTML='Form of sentimented_concept_list[0]: ' + myReturnedData.sentimented_concept_list[0].form;
  }
  catch(err){
    console.log('Error in updateMyUI ' , err);
  }
}




//********************************    END    ************************************************** */
                // console.log("the input url with the API key", InputURLWIthAPI)
                // // fetch('http://localhost:8081/test')
                // fetch(formText)
                // .then(res => res.json())
                // .then(function(res) {
                //     document.getElementById('results').innerHTML = res.message
                // })


export { handleSubmit }

