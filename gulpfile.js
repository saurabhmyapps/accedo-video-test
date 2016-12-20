var gulp = require('gulp'),
    less = require("gulp-less"),
	watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    shell = require('gulp-shell'),
    rename = require('gulp-rename');

gulp.task('lint', function  () {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task("less", function(){
    gulp.src("src/less/entry.less")
        .pipe(less())
        .pipe(rename("main.css"))
        .pipe(gulp.dest("dist/css"))
})

gulp.task('webpack', function () {
    gulp.src('src/js/entry.js')
        .pipe(webpack())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('cmdline', shell.task([
  'npm install --verbose && nodemon -e js,html,css --debug --harmony index.js'
]))

gulp.task('default', function(){
    gulp.run('lint', 'webpack', 'less', "cmdline")
    gulp.watch(["src/**/*.js", "src/**/*.less"], {interval: 1000}, ["lint", "webpack", "less"])
})
