module.exports = {
  keepRemoved: true,
  output: 'frontend_translations/$LOCALE.json',
  input: [
    'components/*.mjs',
    'app.mjs'
  ],
  locales: ['en', 'fr']
}