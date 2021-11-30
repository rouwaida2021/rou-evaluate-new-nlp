
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('myURL').value
    // let formText = "https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)"
    console.log("The url typed is",formText)
    const urlCheckerResult = MyClient.checkForRightURL(formText)
    console.log("URL Checker Result is:",urlCheckerResult)
    console.log("Rou API key is",process.env.myAPIKey);
    
//********************************  START  ****************************************** */

//Adding event listener on click for the button and calling prepareArticleData function
document.getElementById('btnSubmit').addEventListener('click', prepareArticleData);

}//End of handleSubmit

/**
 * @description get the entered URL from input, 
 *              check if the entered URL is right and valid URL or not
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
    console.log("APIPortionToSend",myAPIKeyToSend)  //for test

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
        irony:data.irony
                 
    });
      })// end of .then
    .then(()=>updateMyUI())
   
    }//end of else

}  // rou end of prepareArticleData

//Rou definition of updateMyUI

/**
 * @description asynchronous function used to fech API using API key, Article URL entered by user
 * @param {string} mCUrl - The (meaning cloud) url
 * @param {string} iUURL - The (input user) url portion
 * @param {string} api - The api key received while making credentials on meaning cloud
 * @returns {string} data - the response of the meaning could api after transforming it to javascript format
*/
const getArticleData = async (mCUrl, iUURL, api)=>{
    
    const res = await fetch(mCUrl+api+iUURL+'&lang=en');
    try {

        //convert returned data from json format to javascript format
        const data = await res.json();

        console.log(data);  // for test
           
        return data; //the returned data

      } catch(error){
        console.log("error in getArticleData", error);
        
      }
    }//end of getArticleData

//Rou definition of post request
//

/**
 * @description asynchronous function used to post received article api to the server endpoint
 * @param {string} url - The url of the post function
 * @param {function} data - The callback function that define the post response
*/

  const postData = async(url, data={})=>{
console.log("the url is:" , url)
try {
  const response = await fetch(url, {
    "method": 'POST',
    "credentials": 'same-origin',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(data) 
  });
  // try {
  
    return;
  }catch(error) {
    console.log("Post error", error);
  }

}//end of post function

//Rou definition of updateMyUI

/**
 * @description asynchronous function used to update user interface by the data registered in the endpoint defined at server/index.js (projectData)
 * @param {function} anynomous - The callback function that wait for get request to read endpoint data and update the interface from it
*/
const updateMyUI = async ()=>{
  const myRequest = await fetch('http://localhost:8081/all')
  try{
    const myReturnedData = await myRequest.json();
   
    document.getElementById('model').innerHTML='Model: ' + myReturnedData.model;
    document.getElementById('score_tag').innerHTML='Score Tag: ' + myReturnedData.score_tag;
    document.getElementById('agreement').innerHTML='Agreement: ' + myReturnedData.agreement;

    document.getElementById('subjectivity').innerHTML='Subjectivity: ' + myReturnedData.subjectivity;
    document.getElementById('confidence').innerHTML='Confidence: ' + myReturnedData.confidence;
    document.getElementById('irony').innerHTML='Irony: ' + myReturnedData.irony;

  }
  catch(err){
    console.log('Error in updateMyUI ' , err);
  }
}

//********************************    END    ************************************************** */
 
export { handleSubmit }

