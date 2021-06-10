module.exports = {
  mongoURI: process.env.mongoURI,
  secretOrKey: process.env.SECRET_OR_KEY,
};

module.exports.s3 = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  Bucket: process.env.Bucket,
}