
import '@babel/polyfill'

const { handleSubmit } = require('../js/handleSubmit');

test('test the form handling after submit button clicked', () => {

  expect(handleSubmit).toBeDefined();
})