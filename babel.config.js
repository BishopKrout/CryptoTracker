// babel.config.js
module.exports = {
    presets: [
      '@babel/preset-env', // For modern JavaScript features
      '@babel/preset-react' // For JSX support
    ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'] // For async/await support in tests
      }
    }
  };
  