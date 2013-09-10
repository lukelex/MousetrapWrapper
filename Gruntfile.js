module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      // Your project's source files
      src: 'mousetrap_wrapper.js',
      // Your Jasmine spec files
      options: {
        specs: 'tests/spec/base_spec.js'
        // Your spec helper files
        // helpers : 'specs/helpers/*.js'
      }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('test', 'jasmine');
};
