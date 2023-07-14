/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
    // ...
    webpack(config) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/sounds', // Specifies the path where the audio files will be served from
              name: '[name].[ext]', // Specifies the output file name and extension
            },
          },
        ],
      });
      return config;
    },
    // ...
  };
  