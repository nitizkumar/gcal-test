module.exports = function(grunt) {
  grunt.initConfig({

    less:{
      development: {
        files: {"css/style.css" : "less/style.less"}
      }
    },

    useminPrepare:{
      html:'index.html',
      options:{
        dest:'dist'
      }
    },
    usemin:{
      html:['dist/index.html']
    },
    copy:{
      html:{
        src:'./index.html',
        dest:'dist/index.html'
      },
      template:{
        expand: true,
        src: ['**'],
        cwd:'templates/',
        dest:'dist/templates'
      },
      fonts:{
        expand: true,
        src: ['**'],
        cwd:'fonts/',
        dest:'dist/fonts'
      },
      img:{
        expand: true,
        src: ['**'],
        cwd:'img/',
        dest:'dist/img'
      }
    },
    ngAnnotate: {
      app:{
        files:[{
          expand:true,
          src:['js/src/**/*.js'],
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('default', ['less','ngAnnotate','copy','useminPrepare', 'concat:generated',
    'cssmin:generated',
    'uglify:generated','usemin']);

};