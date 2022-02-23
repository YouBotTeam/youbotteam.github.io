const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const { version } = require("./package.json");

console.log(version);

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "youaiwebchat.js",
    library: "YouaiWebChat",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: "string-replace-loader",
          //   options: {
          //     search: "version",
          //     replace: version,
          //   },
          // },
          { loader: "babel-loader" },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
