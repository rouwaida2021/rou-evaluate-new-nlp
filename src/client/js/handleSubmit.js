
function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('myURL').value
  // let formText = "https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)"
  console.log("The url typed is",formText)
  const urlCheckerResult = MyClient.checkForRightURL(formText)
  console.log("URL Checker Result is:",urlCheckerResult)
  

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
  try{
const inputUserURL =  document.getElementById('myURL').value
const isRightURL = MyClient.checkForRightURL(inputUserURL)

if (isRightURL===false)
{
  alert('Kindly enter a valid URL!');
}
else
{


  const urlToSend = inputUserURL
 
  console.log("FROM CLIENT:urlToSend",urlToSend)  //for test
 

  const myReturnedArticleData=getArticleData(urlToSend);
  
 
  }//end of else

}
catch(error){
  console.log("NEW error in prepareArticleData", error);
}
}  // rou end of prepareArticleData

//Rou definition of updateMyUI

/**
* @description asynchronous function used to fech API using Article URL entered by user and update the user interface
* @param {string} iUURL - The (input user) url portion
* @returns {string} data - the response of the meaning could api after transforming it to javascript format
*/
const getArticleData = async (iUURL)=>{
  
  
  try {
    const res = await postData("http://localhost:8081/addData",{iUURL});


    document.getElementById('model').innerHTML='Model: ' + res.model;
    document.getElementById('score_tag').innerHTML='Score Tag: ' + res.score_tag;
    document.getElementById('agreement').innerHTML='Agreement: ' + res.agreement;
  
    document.getElementById('subjectivity').innerHTML='Subjectivity: ' + res.subjectivity;
    document.getElementById('confidence').innerHTML='Confidence: ' + res.confidence;
    document.getElementById('irony').innerHTML='Irony: ' + res.irony;

     
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
        "mode":'cors',
  headers: {
      "Content-Type": 'application/json'
  },
  body: JSON.stringify(data) 
});
// try {

  // return;
  return await response.json();

}catch(error) {
  console.log("Post error", error);
}

}//end of post function


//********************************    END    ************************************************** */

export { handleSubmit }

