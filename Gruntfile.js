/*
【構造】
developで開発、releaseでminify
*/

/*
【スタートの際：プラグン】

●1つづつ読み込み
ex.
npm install grunt-contrib-watch grunt-contrib-cssmin --save-dev

●一度に読み込み
package.jsonのdevDependenciesにプラグインなどの情報が書かれていれば
npm install
でOK
*/

module.exports = function(grunt) {
  grunt.initConfig({
  	
  	// package.jsonの定義
  	pkg: grunt.file.readJSON('package.json'),


    //SASS
    sass: {                              // Task
    dist: {                            // Target
        options: {                       // Target options
         style: 'expanded'
        },
       files: {                         // Dictionary of files
         'develop/asset/css/style.css': 'develop/asset/css/style.scss'       // 'destination': 'source'
        }
      }
    },
  
  	//CSS min
  	cssmin: {
      compress: {
        files: {
          'release/asset/css/min.css': ['develop/asset/css/reset.css', 'develop/asset/css/style.css']
        }
      }
    },
    watch: {
      sass: {
        files: ['develop/asset/css/*.scss'],
        tasks: ['sass']
      },
      cssmin: {
        files: ['develop/asset/css/*.css'],
        tasks: ['cssmin']
      },
      uglify: {
        files: ['develop/asset/js/*.js'],
        tasks: ['uglify']
      },
      htmlmin: {
        files: ['develop/*.html'],
        tasks: ['htmlmin']
      }
    },
    
    
    //JS min
    uglify: {
	    my_target: {
	      files: {
	        'release/asset/js/script.min.js': ['develop/asset/js/*.js']
	      	}
	    },
	    Plugins: {
	      files: {
	        'release/asset/js/engine/plugin/plugin.min.js': ['develop/asset/js/engine/plugin/*.js']
	      	}
	    }
 	 },
 	 
 	 //HTML min
 	 htmlmin: {
      all: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeCDATASectionsFromCDATA: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          removeOptionalTags: true
        },
        expand: true,
        cwd: 'develop/',
        src: ['**/*.html'],
        dest: 'release/'
      }
    },
    
    // copy ファイルのコピー → releaseへ
    copy: {
      html: {
        expand: true,
        cwd: 'develop/asset/',
        src: ['**/*.html'],
        dest: 'release/asset/'
      },
      css: {
        expand: true,
        cwd: 'develop/asset/',
        src: ['**/*.css'],
        dest: 'release/asset/'
      },
      images: {
        expand: true,
        cwd: 'develop/asset/',
        src: ['img/**'],
        dest: 'release/asset/'
      },
      js: {
        expand: true,
        cwd: 'develop/asset/',
        src: ['js/**'],
        dest: 'release/asset/'
      }
    },
    
    // clean 不要ファイルを削除
    clean: {
      // 最初にreleaseディレクトリ内を削除
      deleteReleaseDir: {
        src: 'release/'
      }
    }
  
  
  });
  
  //タスク読み込み
  grunt.loadNpmTasks('grunt-contrib-cssmin'); //CSSmin
  grunt.loadNpmTasks('grunt-contrib-copy'); //CSSmin csso
  grunt.loadNpmTasks('grunt-contrib-uglify');  //JSmin
  grunt.loadNpmTasks('grunt-contrib-htmlmin');  //htmlmin
  grunt.loadNpmTasks('grunt-contrib-watch'); //ウォッチ
  grunt.loadNpmTasks('grunt-contrib-sass'); //sass
  
  //defaultを設定すると"grunt"だけで下記実行
  grunt.registerTask('default', ['sass','cssmin', 'copy', 'uglify', 'htmlmin', 'watch']);
};

/*
grunt watch を終了させる時は Ctrl + C
*/