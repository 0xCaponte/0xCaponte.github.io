var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var cp = require('child_process');
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var browserSync = require('browser-sync').create();

function jekyllBuild() {
    return cp.spawn('bundle', ['exec', jekyll, 'build'], { stdio: 'inherit' });
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
    gulp.watch(
        [
            '*.html',
            '*.md',
            '*.markdown',
            '_layouts/*.html',
            '_pages/*',
            '_posts/*',
            '_data/*.yml',
            '_data/*.json',
            '_includes/*',
            '_includes/*/*',
            '_includes/*/*/*',
            'blog',
            'js/*.js',
            'css/*.css',
            'css/skins/*.css',
            '_config.yml'
        ],
        gulp.series(jekyllBuild, browserSyncReload));
}

exports.default = gulp.series(gulp.parallel(jekyllBuild, browserSyncServe), watch);
exports.build = jekyllBuild;
