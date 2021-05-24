const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.fname = validText(data.fname) ? data.fname : "";
  data.lname = validText(data.lname) ? data.lname : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";
  data.bio = validText(data.bio) ? data.bio : "";
  data.home_court = validText(data.home_court) ? data.home_court : "";
  //may need to remove validText validation here if just an id.
  data.favorite_sports = validText(data.favorite_sports)
    ? data.favorite_sports
    : "";
  data.avatar = validText(data.avatar) ? data.avatar : "";

  //username - no validation on presence
  if (!Validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3-30 characters";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "An email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (Validator.isEmpty(data.fname)) {
    errors.fname = "An first name is required";
  }
  if (Validator.isEmpty(data.lname)) {
    errors.lname = "An lastname is required";
  }
};
