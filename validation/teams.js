const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateParkInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "A name is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "At least one player is required";
  }
//   isIn - value in array

//   if (!Validator.isInt(data.numPlayers)) {
//     errors.numPlayers = "A valid number is required";
//   }

  if (Validator.isEmpty(data.playersToFill)) {
    errors.playersToFill =
      "The number of players needed to fill a teem is required";
  }
//   if (!Validator.isInt(data.playersToFill)) {
//     errors.playersToFill = "A valid number is required";
//   }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
