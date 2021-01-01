module.exports = {
    apps : [
        {
          name: "kei_api",
          script: "dist/src/index.js",
          watch: true,
          env: {
            "NODE_ENV": "production",
          }
        }
    ]
  }
  