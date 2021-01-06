export default {
  Query: {
    images: async (_parent, { input }, { db }, _info) => {
      // const s3 = new aws.S3();

      // const response = await s3
      //   .listObjectsV2({
      //     Bucket: "oyuncu-giyim",
      //   })
      //   .promise();

      // const c = await s3
      //   .getObject({
      //     Bucket: "oyuncu-giyim",
      //     Key: "slider-4.jpg",
      //   })
      //   .promise();

      // console.log(c);
      //console.log(c.Body.toString("utf-8"));

      // const params = { Bucket: "example" };
      // s3.createBucket(params, function (err) {
      //   if (err) {
      //     console.error(err);
      //   }
      // });

      return { src: "asdasd" };
    },
  },
  Mutation: {
    uploadImage: async (_parent, { input }, { db }, _info) => {
      console.log("samet");

      return null;
    },
  },
};
