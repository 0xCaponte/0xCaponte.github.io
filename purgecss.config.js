module.exports = {
  content: ['./_site/**/*.html'],
  css: ['./_site/css/font-awesome.min.css', './_site/css/materialize.min.css'],

  // Tailwind CSS config
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
}
