// const Validator = require('validator');

// module.exports = function validateEventInput(data) {
//     let errors = {};
  
//     if (!Validator.isLength(data.date, { min: Date.now, max: '2025-12-31' })) {
//         errors.date = 'Must create a future event';
//     }

//     return {
//         errors,
//         isValid: Object.keys(errors).length === 0
//     };
// };