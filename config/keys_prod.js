const aws = require("aws-sdk");

module.exports = {
  mongoURI: process.env.mongoURI,
  secretOrKey: process.env.SECRET_OR_KEY,
};

const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  Bucket: process.env.Bucket,
});

module.exports.s3 = s3;