const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // development mode for better debugging
  entry: "./src/index.js", // entry point
  output: {
    filename: "main.js", // bundled output file
    path: path.resolve(__dirname, "build"), // output folder (deployable)
    clean: true, // clean build before each build
    publicPath: "/todo-list/", // correct path for GitHub Pages
  },
  devtool: "eval-source-map", // good source maps for debugging
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"), // match output folder
    },
    port: 8080,
    open: true, // auto-open browser
    hot: true, // enable hot module replacement
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // base HTML file
      filename: "index.html", // output HTML in build
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // handle CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i, // handle HTML imports (img src, etc.)
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // handle image files
        type: "asset/resource",
      },
    ],
  },
};
