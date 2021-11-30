

/**
 * @description function used to check if the entered article url by the user is a valid url or not - to be able to send it to the meaning cloud API
 * @param {string} inputText - the input string that is written by the user that should be checked if it's valid url or not
 * @returns {Boolean} true or false - the returned value - true if valid url , false if wrong url
*/

function checkForRightURL(inputText) {
    console.log("Checking for right URL", inputText);

    
  let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(inputText))
        {
            return true;
        }else
        {
            return false;
        }
   
} //end checkForRightURL

export {checkForRightURL}
