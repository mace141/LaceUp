const keys = require("../config/keys");

const deleteImage = (bucket, key) => {
  let params = {
    Bucket: bucket,
    Key: key,
  };
  keys.s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};


module.exports = deleteImage