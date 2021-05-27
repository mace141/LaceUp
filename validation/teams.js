const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateParkInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.numPlayers = validText(data.numPlayers) ? data.numPlayers : "";
  data.playersToFill = validText(data.playersToFill) ? data.playersToFill : "";
  data.event_id = validText(data.event_id) ? data.event_id : "";
  data.player_id = validText(data.player_id) ? data.player_id : "";

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

  if(Validator.isEmpty(data.event_id)) {
    errors.event_id = "A team must belong to an event"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
