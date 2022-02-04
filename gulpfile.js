const {src, dest, series, watch} = require('gulp')
const gulp = require('gulp')
const deleted = require('gulp-deleted')
const plumber = require('gulp-plumber')
const csso = require('gulp-csso')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const svgstore = require('gulp-svgstore')
const pipeline = require('readable-stream').pipeline
const uglify = require('gulp-uglify-es').default


function copy() {
    return src ([
        'source/fonts/**/*',
        'source/*.ico*'
    ], {
        base: 'source'
    })
    .pipe(dest('build'))
}
const clean = function() {
    return gulp.src('./source').pipe(deleted({src: './source', dest: './build', patterns:['**/*']})).pipe(gulp.dest('./build'))
}
function html() {
    return src('./source/*.html')
    .pipe(dest('build'))
}
function css() {
    return src('./source/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write("./"))
    .pipe(dest('build/css'))
}
function cssNomin() {
    return src('./source/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('build/css'))
}
function images() {
    return src('./source/img/**/*.{png,jpg,jpeg}')
	.pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
	imagemin.optipng({optimizationLevel: 3})
])).pipe(dest('build/img'))
}
function sprite() {
    return src('./source/img/icon-*.svg')
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(svgstore({
        inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(dest('build/img'))
}
function js() {
    return pipeline (
        src('./source/js/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('.'),
        rename({suffix: '.min'}),
        dest('build/js')
    
    )
}


exports.html = html
exports.css = css
exports['css-nomin'] = cssNomin
exports.images = images
exports.sprite = sprite
exports.js = js

exports.build = series(
    clean,
    images,
    copy,
    html,
    css,
    cssNomin,
    sprite,
    js
)

