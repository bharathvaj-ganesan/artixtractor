module.exports = function (grunt) {

	grunt.initConfig({
		eslint: {
			options: {
				fix: true
			},
			target: ['src/*', 'test.js', 'index.js']
		}
	});

	grunt.loadNpmTasks('grunt-eslint');


	grunt.registerTask('run', ['eslint']);

};
