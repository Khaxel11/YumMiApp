const webpack = require('webpack'); // Asegúrate de requerir Webpack

const path = require('path');

module.exports = {
  entry: './index.js',  // Punto de entrada de tu aplicación
  output: {
    filename: 'bundle.js', // Archivo de salida
    path: path.resolve(__dirname, 'dist') // Carpeta donde se genera el build
  },
  target: 'node',  // Porque estás trabajando en Node.js
  mode: 'production', // O 'development' si estás en modo desarrollo
  resolve: {
    fallback: {
      "bufferutil": false,
      "utf-8-validate": false
    }
  },
  plugins: [
    // Ignora módulos problemáticos (ajusta esto según tus advertencias)
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/lib-cov\/fluent-ffmpeg$/,
    }),
  ],
};
