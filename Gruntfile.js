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
  
  	//CSS min
  	cssmin: {
      compress: {
        files: {
          'release/asset/css/min.css': ['develop/asset/css/reset.css', 'develop/asset/css/style.css']
        }
      }
    },
    watch: {
      files: ['develop/asset/css/*.css'],
      tasks: ['cssmin']
    },
    
    //CSSmin csso ←CSSminを再コンパイル
    csso: {
	  dist: {
	    files: {
	      'release/asset/css/min.css': ['release/asset/css/min.css']
	    }
	  }
	},
    
    //JS min
    uglify: {
	    my_target: {
	      files: {
	        'release/asset/js/script.min.js': ['develop/asset/js/script.js', 'develop/asset/js/script.js']
	      	}
	    },
	    Plugins: {
	      files: {
	        'release/asset/js/plugin/plugin.min.js': ['develop/asset/js/plugin/*.js']
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
  grunt.loadNpmTasks('grunt-csso'); //csso ←CSSminよりいいらしい
  grunt.loadNpmTasks('grunt-contrib-copy'); //CSSmin csso
  grunt.loadNpmTasks('grunt-contrib-uglify');  //JSmin
  grunt.loadNpmTasks('grunt-contrib-htmlmin');  //htmlmin
  grunt.loadNpmTasks('grunt-contrib-watch'); //ウォッチ
  
  //defaultを設定すると"grunt"だけで下記実行
  grunt.registerTask('default', ['cssmin', 'csso', 'copy', 'uglify', 'htmlmin', 'watch']);
};

/*
grunt watch を終了させる時は Ctrl + C
*/