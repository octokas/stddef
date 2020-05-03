// Require Gulp
var gulp 		= require('gulp'); 						// https://github.com/gulpjs/gulp | http://gulpjs.com/

// Require Gulp Plugins
var	less 		= require("gulp-less"),					// https://github.com/plus3network/gulp-less
	concat 		= require("gulp-concat"),				// https://github.com/contra/gulp-concat
	wrap 		= require("gulp-wrap"),					// https://github.com/adamayres/gulp-wrap
	watch 		= require("gulp-watch"),				// https://github.com/floatdrop/gulp-watch
	uglify 		= require("gulp-uglify"),				// https://github.com/terinjokes/gulp-uglify
	rename 		= require("gulp-rename"),				// https://github.com/hparra/gulp-rename
	minifyCSS 	= require("gulp-clean-css"),			// https://github.com/scniro/gulp-clean-css
	browserSync	= require('browser-sync').create(), 	// https://github.com/BrowserSync/browser-sync
	reload 		= browserSync.reload;

// Parent folder name, feel free to change it if you have a different folder name.
var folder = "template/";

// Scripts order
var scripts = {
	"all": [
		folder + "assets/js/vendor.js",
		folder + "assets/js/blocks.js"
	],
	"vendor":[
		folder + "assets/js/vendor/libs/*.js",
		folder + "assets/js/vendor/plugins/*.js"
	],
	"blocks": [
		folder + "assets/js/common/*.js",
		folder + "blocks/**/*.js"
	]
};

// Minify Less files
gulp.task('less:min', ["less"], function () {
	return 	gulp.src(folder + "dist/style.css").
			pipe(minifyCSS()).
			pipe(rename({
				suffix: '.min'
			})).
			pipe(gulp.dest(folder + "dist/"));
});

// Compile Less files
gulp.task('less', function () {
	return 	gulp.src(folder + "assets/less/style.less").
    		pipe(less({
    			plugins: [require("less-plugin-glob")]
    		})).
    		pipe(gulp.dest(folder + "dist/")).
    		pipe(reload({
                stream: true
            }));
});

// Concatenate blocks scripts
gulp.task("js:blocks", function () {
	return 	gulp.src(scripts.blocks).
			pipe(concat('blocks.js')).
			pipe(wrap({src: folder + "dist/dev/layout.js"})).
			pipe(gulp.dest(folder + "assets/js/"));
});

// Concatenate vendor scripts
gulp.task("js:vendor", function () {
	return 	gulp.src(scripts.vendor).
			pipe(concat('vendor.js')).
			pipe(gulp.dest(folder + "assets/js/"));
});

// Minify JavaScript files
gulp.task("js:min", ["js"], function () {
	return 	gulp.src(folder + "dist/script.js").
			pipe(uglify()).
			pipe(rename({
				suffix: '.min'
			})).
			pipe(gulp.dest(folder + "dist/"));
});

// Concatenate JavaScript files
gulp.task("js", ["js:blocks", "js:vendor"], function () {
	return 	gulp.src(scripts.all).
			pipe(concat('script.js')).
			pipe(gulp.dest(folder + "dist/")).
			pipe(reload({
	            stream: true
	        }));
});

// Watch for file changes and refresh the browser
gulp.task('watch', function () {
	browserSync.init({
		server: folder
	});

	watch([folder + "blocks/**/*.less", folder + "assets/less/**/*.less", folder + "assets/less/**/*.css"], function () {
		gulp.start('less');
	});

	watch([folder + "blocks/**/*.js", folder + "assets/js/vendor/**/*.js", folder + "assets/js/common/*.js"], function () {
		gulp.start('js');
	});

	watch([folder + "*.html"], browserSync.reload);
	
});


// Development Build [run 'gulp dev' in your terminal]
gulp.task('dev', ['less', 'js', 'watch']);

// Production Build [run 'gulp prod' in your terminal]
gulp.task('prod', ['less:min', 'js:min']);