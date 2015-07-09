var browserify = require('browserify'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    source = require('vinyl-source-stream');

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  styles: 'app/styles/styles.styl',
  scripts: 'app/**/*.js',
  staticFiles: [
    '!app/**/*.+(styl|css|js|jade)',
     'app/**/*.*'
  ],
  clientTests: [],
  serverTests: ['test/server/**/*.js']
};

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function () {
    gulp
    .src(paths.styles)
    .pipe(stylus({
        paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('static-files',function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/**','app/**','node_modules/**'] })
    .on('restart', function () {
      console.log('>> node restart');
    });
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('browserify', function() {
  var b = browserify();
  b.add('./app/js/application.js');
  return b.bundle()
  .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
  .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
  .pipe(source('index.js'))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['browserify']);
});

gulp.task('bower', function() {
  // return bower()
  //   .pipe(gulp.dest('public/lib/'));
});

gulp.task('build', ['bower', 'jade', 'styles', 'browserify', 'static-files']);
gulp.task('production', ['nodemon', 'build']);
gulp.task('default', ['nodemon', 'build', 'watch']);
