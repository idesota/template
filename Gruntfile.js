/*
ターミナルでプラグン読み込み
ex.
npm install grunt-contrib-watch grunt-contrib-cssmin --save-dev

package.jsonのdevDependenciesにプラグインなどの情報が書かれていれば
npm install
でOK
npm install grunt-contrib-uglify --save-dev
*/

module.exports = function(grunt) {
  grunt.initConfig({
  	
  	pkg: grunt.file.readJSON('package.json')
  	
  	, //JOINT
  
  	//CSS min
  	cssmin: {
      compress: {
        files: {
          'asset/min.css': ['asset/css/reset.css', 'asset/css/style.css']
        }
      }
    },
    watch: {
      files: ['asset/css/*.css'],
      tasks: ['cssmin']
    }
    //**
    
    , //JOINT
    
    //JS min
    uglify: {
    my_target: {
      files: {
        'asset/js/script.min.js': ['asset/js/script.js', 'asset/js/script.js']
      	}
    	}
 	 }
  
  
  });
  
  //タスク読み込み
  grunt.loadNpmTasks('grunt-contrib-cssmin'); //CSSmin
  grunt.loadNpmTasks('grunt-contrib-uglify');  //JSmin
  grunt.loadNpmTasks('grunt-contrib-watch'); //ウォッチ
  
  //defaultを設定すると"grunt"だけで下記実行
  grunt.registerTask('default', ['cssmin', 'uglify', 'watch']);
};

/*
grunt watch を終了させる時は Ctrl + C
*/