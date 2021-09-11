const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const EmailToPlugin = require(path.resolve("./EmailToPlugin"))

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack~",
    }),
    new EmailToPlugin({
      formEmail: "kingpenguins@163.com",
      password: "xxx",
      toEmail: "kingpenguins@163.com",
      host: "smtp.163.com",
    }),
  ],
}
