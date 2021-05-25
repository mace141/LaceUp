const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateParkInput(data) {
<<<<<<< HEAD
    let errors = {}
}
=======
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.numPlayers = validText(data.numPlayers) ? data.numPlayers : "";
  data.playersToFill = validText(data.playersToFill) ? data.playersToFill : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "A name is required";
  }  

  if (Validator.isEmpty(data.numPlayers)) {
    errors.numPlayers = "At least one player is required";
  }
// //   isIn - value in array

  if (!Validator.isInt(data.numPlayers)) {
    errors.numPlayers = "A valid number is required";
  }

  if (Validator.isEmpty(data.playersToFill)) {
    errors.playersToFill =
      "The number of players needed to fill a team is required";
  }
  if (!Validator.isInt(data.playersToFill)) {
    errors.playersToFill = "A valid number is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
>>>>>>> 2a8a86cada34d290355d58e2f8cbbee15dae567d
