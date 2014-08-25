// jshint strict:false

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('html', function () { // {{{1
  return gulp.src('src/**/*.jade')
    .pipe(plugins.jade())
    .pipe(gulp.dest('out'));
});

gulp.task('css', function () { // {{{ 1
  return gulp.src('src/css/**/*.styl')
    .pipe(plugins.stylus())
    .pipe(gulp.dest('out/css'));
});

gulp.task('jsx', function () { // {{{!
  return gulp.src('src/js/**/*.jsx')
    .pipe(plugins.react())
    .pipe(gulp.dest('out/js'));
});

gulp.task('lint', function () { // {{{1
  gulp.src('./src/js/**/*.js*')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['lint', 'jsx'], function () { // {{{1
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('out/js'));
});

gulp.task('images', function () { // {{{1
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('out/images'));
});

gulp.task('build', ['html', 'css', 'js', 'images']);

gulp.task('watch', ['build'], function () { // {{{1
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('server', ['watch'], function () { // {{{1
    return gulp.src('./')
      .pipe(plugins.webserver({
        directoryListing: true,
        open: true
      }));
}); // }}}

gulp.task('default', ['server']);
