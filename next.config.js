module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    DB_HOST: "ec2-54-147-209-121.compute-1.amazonaws.com",
    DB_USER: "yspgtxlyoiydro",
    DB_PASS: "dad35508bd07298b98f261f174b3b5ea8d8e6dde99c57f2f97a3ace8f9fbe55e",
    DB_DATABASE: "d93d1vd9uaub6",
  },
};
