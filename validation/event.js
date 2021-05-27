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

  // Need to tweak below validator to make sure the event is created for the future

  // if (!Validator.isLength(data.date, { min: Date.now, max: '2025-12-31' })) {
  //     errors.date = 'Must create a future event';
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
