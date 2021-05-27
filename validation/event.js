const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.sport = validText(data.sport) ? data.sport : "";
  data.team_id = validText(data.team_id) ? data.team_id : "";

  if (Validator.isEmpty(data.sport)) {
    errors.sport = "Sport field is required";
  }

  if (Validator.isEmpty(data.team_size)) {
    errors.team_size = "Team size field is required";
  }

  if (Validator.isEmpty(data.num_teams)) {
    errors.num_teams = "Must specify the number of teams";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
