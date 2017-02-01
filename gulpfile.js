var gulp     = require('gulp');
var $        = require('gulp-load-plugins')();
var download = require('gulp-download');
var rename   = require('gulp-rename');
var clean    = require('gulp-clean');

var loc      = 'scss/brand-ai/';
var baseUrl  = 'https://assets.brand.ai/james-stone-consulting/primary-brand/';
var fileName = '_style-params.scss';
var key      = 'Bk14YSydl';

var filesToDownload = [baseUrl + fileName + '?key=' + key];

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('download', function() {
  return download(filesToDownload)
    .pipe(gulp.dest(loc));
});

gulp.task('rename', ['download'], function() {
  return gulp.src(loc + fileName + '?key=' + key)
    .pipe(rename(fileName))
    .pipe(gulp.dest(loc));
});

gulp.task('clean', ['rename'], function() {
  return gulp.src(loc + fileName + '?key=' + key, {read: false})
    .pipe(clean({force: true}));
});

gulp.task('sass', ['rename'], function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['download', 'rename', 'clean', 'sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
