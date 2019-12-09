const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const plumber = require( 'gulp-plumber' );
const beep = require( 'beepbeep' );
const notify = require( 'gulp-notify' ); 


const errorHandler = r => {
	notify.onError( '\n\n❌  ===> ERROR: <%= error.message %>\n' )( r );
	beep();
};

gulp.task('sass', function() {
  return gulp
    .src('./app/scss/theme.scss')
		.pipe( plumber( () => {	notify.onError( '\n\n❌  ===> SASS ERROR %>\n' ) }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./docs/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass_layout', function() {
  return gulp
    .src('./app/scss/layout.scss')
		.pipe( plumber( () => {	notify.onError( '\n\n❌  ===> SASS ERROR %>\n' ) }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./docs/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('./app/js/*.js').pipe(gulp.dest('./docs/js/'));
});

gulp.task('assets', function() {
  return gulp.src('./app/assets/**/*').pipe(gulp.dest('./docs/assets/'));
});

gulp.task('fileinclude', function() {
  return gulp.src(['./app/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./docs/'));
});

gulp.task('serve', gulp.series('fileinclude', 'assets', 'scripts', 'sass', 'sass_layout', function() {
  browserSync.init({
    server: './docs',
    open: false // set to false to disable browser autostart
  });
  gulp.watch('app/pages/*.html', gulp.series('fileinclude'));
  gulp.watch('app/partials/*.html', gulp.series('fileinclude'));
  gulp.watch('app/scss/**/*', gulp.series('sass', 'sass_layout'));
  gulp.watch('app/js/*.js',  gulp.series('scripts'));
  gulp.watch('app/assets/**/*', gulp.series('assets'));
  gulp.watch('docs/*.html').on('change', browserSync.reload);
  gulp.watch('docs/js/*.js').on('change', browserSync.reload);
}));

gulp.task('serve', gulp.series('serve'));
gulp.task('default',gulp.series('fileinclude', 'assets', 'scripts', 'sass', 'sass_layout'));