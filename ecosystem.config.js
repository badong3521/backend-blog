// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "BaseNodejs",
      script: "./dist/index.js",
      watch: ["./dirt/"],
      env_production: {
        NODE_ENV: "development",
      },
      env_development: {
        NODE_ENV: "development",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
