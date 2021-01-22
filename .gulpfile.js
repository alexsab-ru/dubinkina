// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php', // List of files extensions for watching & hard reload (comma separated)
    pageversion  = 'html,htm,php', // List of files extensions for watching change version files (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true, // If «false» - Browsersync will work offline without internet connection
    basename     = require('path').basename(__dirname),
    forProd      = [
					'/**',
					' * @author github.com/newstreetpunk',
					' */',
					''].join('\n');

const { src, dest, parallel, series, watch, task } = require('gulp'),
	sass           = require('gulp-sass'),
	cleancss       = require('gulp-clean-css'),
	concat         = require('gulp-concat'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify-es').default,
	autoprefixer   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
	newer          = require('gulp-newer'),
	rsync          = require('gulp-rsync'),
	del            = require('del'),
	connect        = require('gulp-connect-php'),
	header         = require('gulp-header'),
	notify         = require('gulp-notify'),
	rename         = require('gulp-rename'),
	responsive     = require('gulp-responsive'),
	pngquant       = require('imagemin-pngquant'),
	merge          = require('merge-stream'),
	{ spawn, exec } = require('child_process'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof jekyllPort == 'undefined') 
	global.jekyllPort = 4000;


projects.dubinkina = {

	jekyllPort: ++jekyllPort,

	base: basename,
	dest: basename,

	styles_jekyll: {
		src:	'src/' + preprocessor + '/styles.'+preprocessor,
		watch:  'src/' + preprocessor + '/**/*.'+preprocessor,
		dest:   'css',
		output: 'styles.css',
	},

	scripts_jekyll: {
		src: [
			'../node_modules/jquery/dist/jquery.min.js',
			'src/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			'../node_modules/slick-carousel/slick/slick.js',
			'src/js/common.js', // Custom scripts. Always at the end
		],
		dest:       'js',
		output:     'scripts.js',
	},

	code_jekyll: {
		src: [
			'**/*.{' + fileswatch + '}',
		],
	},

	forProd: [
		'/**',
		' * @author https://github.com/newstreetpunk',
		' * @author https://github.com/alexsab',
		' */',
		''].join('\n'),
}



/* dubinkina BEGIN */

function dubinkina_browsersync_jekyll() {
	browserSync.init({
		proxy: '127.0.0.1:' + projects.dubinkina.jekyllPort,
		notify: false,
		online: online
	});
};

// Custom Styles
function dubinkina_styles_jekyll() {
	return src(projects.dubinkina.styles_jekyll.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.dubinkina.styles_jekyll.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	//.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.dubinkina.styles_jekyll.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function dubinkina_scripts_jekyll() {
	return src(projects.dubinkina.scripts_jekyll.src)
	.pipe(concat(projects.dubinkina.scripts_jekyll.output))
	//.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.dubinkina.forProd))
	.pipe(dest(projects.dubinkina.scripts_jekyll.dest))
	.pipe(browserSync.stream())
};

function dubinkina_watch_jekyll() {
	watch(projects.dubinkina.styles_jekyll.watch, dubinkina_styles_jekyll);
	watch(projects.dubinkina.scripts_jekyll.src, dubinkina_scripts_jekyll);

	watch(projects.dubinkina.code_jekyll.src).on('change', browserSync.reload);
};

function dubinkina_cd_jekyll(callback) {

	process.chdir(process.cwd()+'/'+basename);
	// console.log(process.cwd());
}
function dubinkina_run_jekyll(callback) {

	console.log('if you get error message: "Address already in use", run next command:');
	console.log('lsof -i :<PORT> — show you what process run on your port');
	console.log('kill -9 <PID> —  kill that process by PID');

	var build = exec('bundle exec jekyll serve --port ' + projects.dubinkina.jekyllPort + ' --disable-disk-cache --trace');
	// var build = spawn('bundle', ['exec', 'jekyll', 'serve']);

	build.stdout.on('data', (data) => {
	  console.log(`stdout: ` + data);
	});

	build.stderr.on('data', (data) => {
	  console.error(`stderr: ${data}`);
	});

	build.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});

	return build;
}

// exports.dubinkina_jekyll = parallel(dubinkina_styles_jekyll, dubinkina_scripts_jekyll, dubinkina_browsersync, dubinkina_watch_jekyll);
exports.dubinkina_run_jekyll = parallel(dubinkina_cd_jekyll, dubinkina_styles_jekyll, dubinkina_scripts_jekyll, dubinkina_run_jekyll, dubinkina_browsersync_jekyll, dubinkina_watch_jekyll);


/* dubinkina END */

