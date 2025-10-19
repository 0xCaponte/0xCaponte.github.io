const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cp = require('child_process');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));

const jsFiles = [
    'js/jquery-3.6.0.min.js',
    'js/jquery.animatedheadline.js',
    'js/boxlayout.js',
    'js/jquery.hoverdir.js',
    'js/simple-jekyll-search.min.js',
    'js/custom.js',
    'js/materialize.min.js',
    'js/lazysizes.min.js'
];

const cssFiles = [
    'css/font-awesome.min.css',
    'css/jquery.animatedheadline.css',
    'css/materialize.min.css',
    'css/style.css',
    'css/skins/blue.css',
    'css/blog-image-fix.css',
    'css/blog-alignment.css'
];

function jekyllBuild() {
    return cp.spawn('bundle', ['exec', jekyll, 'build'], { stdio: 'inherit' });
}

function processJs() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('_site/js'))
        .pipe(browserSync.stream());
}

function processCss() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.stream());
}

function processImages() {
    return gulp.src('resources/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('_site/resources/images'));
}

function browserSyncServe(done) {
    browserSync.init({
        server: {
            baseDir: "_site"
        }
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watch() {
    gulp.watch('js/*.js', processJs);
    gulp.watch('css/**/*.css', processCss);
    gulp.watch('resources/images/**/*', processImages);
    gulp.watch(
        [
            '*.html',
            '*.md',
            '_layouts/*.html',
            '_posts/*',
            '_includes/*'
        ],
        gulp.series(jekyllBuild, gulp.parallel(processJs, processCss, processImages), browserSyncReload));
}

const build = gulp.series(jekyllBuild, gulp.parallel(processJs, processCss, processImages));

exports.default = gulp.series(build, gulp.parallel(browserSyncServe, watch));
exports.build = build;
