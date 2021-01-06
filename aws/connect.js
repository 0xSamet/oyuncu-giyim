const aws = require("aws-sdk");

aws.config.setPromisesDependency(Promise);
aws.config.update({
  accessKeyId: "AKIA42VWDCYJGJAW4IG3",
  secretAccessKey: "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",
  region: "eu-central-1",
});

module.exports = aws;
