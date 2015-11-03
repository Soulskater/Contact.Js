var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task("build", ["build-min"], function () {
    return gulp.src("./src/**/*.js")
        .pipe(concat("contract.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("build-min", function () {
    return gulp.src("./src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("contract.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist"));
});