// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // development mode for better debugging
  entry: "./src/index.js", // entry point
  output: {
    filename: "main.js", // bundled output file
    path: path.resolve(__dirname, "dist"), // output folder
    clean: true, // clean dist before each build
  },
  devtool: "eval-source-map", // good source maps for debugging
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), // serve static assets from /public
    },
    watchFiles: ["./src/template.html"], // watch HTML file for changes
    port: 8080, // dev server port
    open: true, // auto-open browser
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // base HTML file
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
