// Simple utility function to generate coverage data
function someUtilFunction(input) {
  if (!input || input === '') {
    return 'empty processed';
  }
  
  if (input.length > 10) {
    return 'long input processed';
  }
  
  return input + ' processed';
}

module.exports = {
  someUtilFunction
};