const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateParkInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";

  data.address = validText(data.address) ? data.address : "";

  data.zip = validText(data.zip) ? data.zip : "";

  data.borough = validText(data.borough) ? data.borough : "";


  data.sports = data.sports ? data.sports : "";

  data.lat = validText(data.lat) ? data.lat : "";
  data.lng = validText(data.lng) ? data.lng : "";
  // data.events = validText(data.events) ? data.events : "";
  // data.users = validText(data.users) ? data.users : "";

  // data.events, data.users are associations

  if (Validator.isEmpty(data.name)) {
    errors.name = "A name is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "An address is required";
  }
  if (Validator.isEmpty(data.zip)) {
    errors.zip = "A zip code is required";
  }
  if (Validator.isEmpty(data.borough)) {
    errors.borough = "A borough is required";
  }
  if (Validator.isEmpty(data.lat)) {
    errors.coordinate = "A lattitude is required";
  }
  if (Validator.isEmpty(data.lng)) {
    errors.coordinate = "A longitude is required";
  }
  if (Validator.isEmpty(data.sports)) {
    errors.sport = "A sport is required";
  }
  //error here ^^ 
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

//address, name, zipcode, borough, lat and lng, available sports, has many events, has many users
