const { extractCCCD } = require('./dist/index.js');



// 049096016530
// 0312345678901
// 123456789012
// 1234567890123    
console.log(extractCCCD("049000016530")); // [ '049096016530' ]
console.log(extractCCCD("0312345678901")); // [ '0312345678901' ]
console.log(extractCCCD("123456789012"));           
console.log(extractCCCD("1234567890123")); // [ '123456789012', '1234567890123' ]
console.log(extractCCCD("Here are some IDs: 123456789012, 9876543210987, and 12345678901.")); // [ '123456789012', '9876543210987' ]