const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.sport = "Need to add a comment before you post.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
