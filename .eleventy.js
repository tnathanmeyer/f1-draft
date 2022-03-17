const sass = require('sass');
const htmlmin = require('html-minifier');
const CleanCSS = require('clean-css');

module.exports = function (eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", htmlminTransform);

	eleventyConfig.addFilter('cssmin', function (code) {
		const compiled = sass.compileString(code);
		return new CleanCSS({}).minify(compiled.css).styles;
	});

	eleventyConfig.addWatchTarget('./src/scss');

	return {
		dir: {
			input: 'src',
			output: 'dist'
		}
	}
};

// 'stolen' from https://github.com/tmns/11ty-feedback/blob/main/.eleventy.js
function htmlminTransform(content, outputPath) {
	if (outputPath.endsWith(".html")) {
		let minified = htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true
		});
		return minified;
	}
	return content;
}
