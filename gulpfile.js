// Gulp.js configuration
var
    // modules
    gulp            = require('gulp'),

    plugin          = require('./_inc/plugin'),
    config          = require('./_inc/config'),
    paths           = require('./_inc/paths'),
    requireDir      = require('require-dir')('./_tasks')
;

// complete html build and moving index file outside of the "index" folder
gulp.task('html', ['site:nunjucks'], function() {
    var move = plugin.fs.move (
        paths.site.dest + 'index/index.html', // file to move
        paths.site.dest + 'index.html',       // where to move
        { clobber: true },
        function(err) {
            //if (err) return console.log(err);
            plugin.fs.remove(paths.site.dest + "index");
        }
    );
    return move;
});

// images processing
gulp.task('images', ['site:images']);

// js processing
gulp.task('js', ['site:js', 'site:js-copy']);

// watch for changes
gulp.task('watch', function() {
    gulp.watch(paths.html.sitePages, ['html']);
    gulp.watch(paths.html.templatesFiles, ['html']);
    gulp.watch(paths.images.files, ['images']);
    gulp.watch(paths.js.siteFiles, ['js']);
    gulp.watch(paths.css.siteFiles, ['css']);
    gulp.watch(paths.css.regFiles, ['css']);
    gulp.watch(paths.root.files, ['rootfiles']);
});

// local webserver
gulp.task('webserver', ['watch', 'html', 'site:critical'], function () {
    return gulp.src(paths.site.dest)
        .pipe(plugin.webserver({
            //https: true,
            port: 8001,
            livereload: true,
            open: true
        }));
});

// run folder tasks
gulp.task('do-all', ['html', 'images', 'css', 'js', 'fonts', 'rootfiles', 'site:critical']);

gulp.task('build', function(callback) {
    if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
        plugin.runSequence('site:clean', 'do-all', 'sitemap', 'generate-service-worker', callback);
    } else {
        plugin.runSequence('site:clean', 'do-all', 'sitemap', callback);
    }
});

// default task for Devs (their local environment)
gulp.task('local', ['build', 'webserver']);

// default task for Devs (DL environment)
gulp.task('dev', ['set-dl-env','build','webserver']);

// default task for Devs (ML environmens)
gulp.task('staging', ['set-ml-env','build', 'webserver']);

// default task for Devs (Production environment)
gulp.task('prod', ['set-prod-env','build', 'webserver']);

// default task
gulp.task('default', ['set-dl-env','build', 'webserver']);
