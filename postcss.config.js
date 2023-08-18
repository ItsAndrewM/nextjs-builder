module.exports = {
  // plugins: [
  //   'tailwindcss',
  //   'autoprefixer',
  //   'postcss-nesting',
  //   'postcss-flexbugs-fixes',
  //   [
  //     'postcss-preset-env',
  //     {
  //       autoprefixer: {
  //         flexbox: 'no-2009',
  //       },
  //       stage: 2,
  //       features: {
  //         'custom-properties': false,
  //       },
  //     },
  //   ],
  // ],
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
  }
}
