module.exports = {
  keepRemoved: true,
  output: 'translations/$LOCALE.json',
  input: [
    'components/*.mjs',
    'app.mjs'
  ],
  locales: ['en', 'fr']
}