// Gulp.js configuration
const
    // modules
    gulp            = require('gulp'),
    plugin          = require('../_inc/plugin'),
    config          = require('../_inc/config'),
    paths           = require('../_inc/paths')
;

// image processing
gulp.task('site:imagemin', function() {
    return gulp.src(paths.images.siteFiles)
        .pipe(plugin.newer(paths.images.siteDest))
        .pipe(plugin.imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.images.siteDest));
});

gulp.task('site:imagewebp', function() {
    return gulp.src(paths.images.siteFiles)
        .pipe(plugin.newer(paths.images.siteDest))
        .pipe(plugin.webp({ lossless: true, quality: 65 }))
        .pipe(gulp.dest(paths.images.siteDest));
});

gulp.task('theme:imagemin', function() {
    paths.themes.forEach(theme => {
        return gulp.src(paths.images.themeFiles(theme))
            .pipe(plugin.newer(paths.images.themeDest(theme)))
            .pipe(plugin.imagemin({ optimizationLevel: 5 }))
            .pipe(gulp.dest(paths.images.themeDest(theme)));
    });
});

gulp.task('theme:imagewebp', function() {
    paths.themes.forEach(theme => {
        return gulp.src(paths.images.themeFiles(theme))
            .pipe(plugin.newer(paths.images.themeDest(theme)))
            .pipe(plugin.webp({ lossless: true, quality: 65 }))
            .pipe(gulp.dest(paths.images.themeDest(theme)));
    });
});

gulp.task('images', ['site:imagemin', 'site:imagewebp', 'theme:imagemin', 'theme:imagewebp']);
