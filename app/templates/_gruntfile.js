module.exports = function(grunt) {
  grunt.initConfig({
	concat: {
		dist: {
			src: ["app/header.html", "app/modules/*.html", "app/footer.html"],
			dest: "build/index.html"
		}
	},
	
	cssmin: {
		css: {
			files: {
				"build/assets/main.css": ["app/assets/*.css"]
			}
		}
	},

	connect: {
		server: {
			options: {
				keepalive: true,
				open: true,
				middleware: function(){
					var middleware = [];
 
					middleware.push(function(req, res, next) {
						if (req.url !== "/") return next();
						 
						res.setHeader("Content-type", "text/html");
						var html = grunt.file.read("app/header.html");
						html += grunt.file.read("app/footer.html");
						res.end(html);
					});
					middleware.push(function(req, res, next){
						if (req.url !== "/assets/main.css") return next();
						 
						res.setHeader("Content-type", "text/css");
						var css = "";
					 
						var files = grunt.file.expand("app/assets/*.css");
						for (var i = 0; i < files.length; i++) {
							 css += grunt.file.read(files[i]);
						}
					 
						res.end(css);
					});
					middleware.push(function(req, res){
						res.statusCode = 404;
						res.end("Not Found");
					});
					 
					return middleware;
				}
			}
		}
	}


  });
 
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
 
  grunt.registerTask('serve', ['connect']);
  grunt.registerTask('build', ['concat', 'cssmin']);
  grunt.registerTask('default', ['build']);
};