'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BcbnGenerator = yeoman.generators.Base.extend({
	promptUser: function() {
		var done = this.async();

		// have Yeoman greet the user
		console.log(this.yeoman);

		var prompts = [{
				name: 'appName',
				message: 'What is your app\'s name ?'
		}];

		this.prompt(prompts, function (props) {
				this.appName = props.appName;

				done();
		}.bind(this));
	},

	scaffoldFolders: function(){
		this.mkdir("app");
		this.mkdir("app/assets");
		this.mkdir("app/extensions");
		this.mkdir("app/modules");
		this.mkdir("build");
	},

	copyMainFiles: function(){
		this.copy("_footer.html", "app/footer.html");
		this.copy("_gruntfile.js", "Gruntfile.js");
		this.copy("_package.json", "package.json");
		this.copy("_main.css", "app/assets/main.css");    
	 
		var context = { 
			site_name: this.appName 
		};
	 
		this.template("_header.html", "app/header.html", context);
	},

	runNpm: function(){
		var done = this.async();
		this.npmInstall("", function(){
			console.log("\nEverything Setup !!!\n");
			done();
		});
	}
});

module.exports = BcbnGenerator;