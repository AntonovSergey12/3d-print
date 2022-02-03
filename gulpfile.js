const gulp = require('gulp');
const terser = require('gulp-terser');
const deleted = require('gulp-deleted');

const indexhtml = function() {
    return gulp.src('./source/index.html').pipe(gulp.dest('./build/'));
}

const printhtml = function() {
    return gulp.src('./source/3d-print.html').pipe(gulp.dest('./build/'));
}

const modelinghtml = function() {
    return gulp.src('./source/3d-modeling.html').pipe(gulp.dest('./build/'));
}

const contactshtml = function() {
    return gulp.src('./source/contacts.html').pipe(gulp.dest('./build/'));
}

const stylecss = function() {
    return gulp.src('./source/style/style.css').pipe(gulp.dest('./build/style/'));
}
const js = function() {
    return gulp.src('./source/js/script.js')
    .pipe(terser())
    .pipe(gulp.dest('./build/js/'))
}
const clean = function() {
    return gulp.src('./source').pipe(deleted({src: './source', dest: './build', patterns: ['**/*']})).pipe(gulp.dest('./build'));
}
exports.build = gulp.series(clean,indexhtml, printhtml, modelinghtml, contactshtml, stylecss, js);