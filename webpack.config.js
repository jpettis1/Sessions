const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "client"),
  },
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./client"),
      publicPath: "/",
    },
    port: 8080,
    hot: true,
    proxy: {
      "/workouts": "http://localhost:3000",
      "/auth/google": "http://localhost:3000",
      "/auth/google/success": "http://localhost:3000",
      "/logout": "http://localhost:3000",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./client/index.html",
    }),
  ],
};
