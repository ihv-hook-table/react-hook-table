module.exports = {
  overrides: [
    {
      test: ['./examples/**/*.{js,jsx,ts,tsx}'],
      plugins: [
        'babel-plugin-react-compiler',
        {
          compilationMode: 'annotation',
        },
      ],
    },
  ],
};
