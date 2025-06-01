const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", webpack({
        webpackOptions: {
          resolve: {
            alias: {
              "@": path.resolve(__dirname, "./src"), // adjust if your base is ./src or ./app
            },
            extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: "ts-loader",
                  options: { transpileOnly: true }
                }
              },
              {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                }
              }
            ],
          }
        }
      }));

      return config;
    },
  },
});
