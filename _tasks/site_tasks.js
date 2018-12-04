// Gulp.js configuration
var
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
gulp.task('site:images', ['site:imagemin', 'site:imagewebp']);

// site page/html processing
gulp.task('site:nunjucks', function() {
    var page = gulp.src(paths.html.sitePages)
        //.pipe(plugin.newer(paths.site.dest))
        .pipe(plugin.nunjucksRender({
            ext: '/index.html',
            path: [paths.html.templatesFolder]
        }));

    config.set(page); // run replacement settings from config file

    // minify production code
    if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
        console.log(process.env.NODE_ENV);
        page.pipe(plugin.htmlmin({
            collapseWhitespace: true,
            //preserveLineBreaks: true,
            minifyCSS: true,
            //minifyJS: true
        }));
    }

    return page.pipe(gulp.dest(paths.site.dest));
});

// site js processing
gulp.task('site:js', function() {
    var jsbuild = gulp.src(paths.js.siteRootFiles)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.deporder())
        .pipe(plugin.concat('site.js'));

        config.set(jsbuild); // run replacement settings from config file

    // minify production code
    if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
        jsbuild = jsbuild
            //.pipe(plugin.stripdebug())
            .pipe(plugin.uglify());
    }
    jsbuild = jsbuild.pipe(plugin.sourcemaps.write(''));

    return jsbuild.pipe(gulp.dest(paths.js.siteDest));
});

// copying js files to build forder
gulp.task('site:js-copy', function() {
    return gulp.src([paths.js.siteFiles, '!' + paths.js.regFolder + 'amersc-registration.js'])
        .pipe(plugin.newer(paths.js.siteDest))
        .pipe(gulp.dest(paths.js.siteDest));
});

// generate and inline critical css
gulp.task('site:critical', ['css', 'site:nunjucks'], function () {
    var criticalpath =  gulp.src([paths.site.dest+'**/*.html', '!'+paths.site.dest+'index/index.html', '!'+paths.reg.dest+'**/*.html'])
        // minify production code
        if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
            criticalpath = criticalpath
            .pipe(plugin.critical({
                base: paths.site.dest,
                inline: true,
                css: [paths.css.siteDest+'site.css'],
                minify: true,
                include: ['#menutoggle', '.container.fluid'],
                timeout: 90000,
                penthouse: {
                    timeout:                90000,
                    pageLoadSkipTimeout:    30000,
                    renderWaitTime:         400,
                    blockJSRequest:         true
                },
                dimensions: [{
                    width: 1200,
                    height: 800
                }]
            }))
            .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        }
        return criticalpath.pipe(gulp.dest(paths.site.dest));
});

// clean the _build folder
gulp.task('site:clean', function() {
    var clean = plugin.fs.emptyDirSync(paths.site.dest, err => {
        if (err) return console.error(err);
        console.log('build folder cleaned!');
    });
    return clean;
});
