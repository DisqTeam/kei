module.exports = {
    apps : [
        {
          name: "kei_api",
          script: "dist/src/index.js",
          watch: false,
          env: {
            "NODE_ENV": "production",
          }
        }
    ]
  }
  