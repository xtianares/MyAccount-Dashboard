// Gulp.js configuration
var
    // modules
    gulp            = require('gulp'),

    plugin          = require('../_inc/plugin'),
    config          = require('../_inc/config'),
    paths           = require('../_inc/paths')

;

// copy files that need to be in the root folder
gulp.task('rootfiles', function() {
    var rootfiles = gulp.src(paths.root.files)

    if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
        rootfiles = rootfiles
            .pipe(plugin.replace(
                '<!--<mimeMap fileExtension=".json" mimeType="application/json" />-->',
                '<mimeMap fileExtension=".json" mimeType="application/json" />'
            ));
    }

    return rootfiles.pipe(gulp.dest(paths.site.dest));
});

// copy font folder
gulp.task('fonts', function() {
    return gulp.src(paths.fonts.files)
        .pipe(plugin.newer(paths.fonts.dest))
        .pipe(gulp.dest(paths.fonts.dest));
});

// CSS processing using sass
gulp.task('css', ['site:images'], function() {
    return gulp.src(paths.css.siteSass)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugin.sass({
            outputStyle: 'nested', // set to expanded/compressed
            imagePath: 'images/',
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(plugin.cleancss({compatibility: 'ie9'}))
        .pipe(plugin.sourcemaps.write(''))
        .pipe(gulp.dest(paths.css.siteDest));
});

gulp.task('set-dl-env', function() {
    return process.env.NODE_ENV = 'Development';
});
gulp.task('set-ml-env', function() {
    return process.env.NODE_ENV = 'Staging';
});
gulp.task('set-prod-env', function() {
    return process.env.NODE_ENV = 'Production';
});
