
const { checkForRightURL } = require('../js/checkForRightURL');

test('check if the entered url is right and valid or not', () => {
    expect(checkForRightURL('hello')).toBeFalsy();
    expect(checkForRightURL('https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)')).toBeTruthy();
    expect(checkForRightURL('https://en.wikipedia.org/wiki/Naguib_Mahfouz')).toBeTruthy();
});