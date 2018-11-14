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
        .pipe(plugin.concat('main.min.js'));

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
    var criticalpath =  gulp.src([paths.site.dest+'**/*.html', '!'+paths.reg.dest+'**/*.html'])
        // minify production code
        if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
            criticalpath = criticalpath
            .pipe(plugin.critical({
                base: paths.site.dest,
                inline: true,
                css: [paths.css.siteDest+'style.css'],
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

// generate sitemap.xml file
gulp.task('sitemap', function () {
    gulp.src([paths.site.dest + '**/*.html', '!_build/registration/**/*.html'], { read: false })
        .pipe(plugin.sitemap({
            siteUrl: config.site_url // this is set above in the variables
        }))
        .pipe(gulp.dest(paths.site.dest));
});

gulp.task('generate-service-worker', function(callback) {
    plugin.swPrecache.write(paths.site.dest + "service-worker.js", {
        //staticFileGlobs: [paths.site.dest + '/**/*.{js,html,aspx,css,png,jpg,webp,gif,svg,eot,ttf,woff}'],
        staticFileGlobs: [
            paths.site.dest + '/!(registration)/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
            paths.site.dest + '/*.{js,html,css}'
        ],
        runtimeCaching: [{
            urlPattern: /^http([s]*):\/\/(.*)\.googleapis\.com\/(.*)/,
            handler: 'networkFirst',
            options: {
                cache: {
                    maxEntries: 10,
                    name: 'google-cache'
                }
            }
        }],
        stripPrefix: paths.site.dest
    }, callback);
});

// clean the _build folder
gulp.task('site:clean', function() {
    var clean = plugin.fs.emptyDirSync(paths.site.dest, err => {
        if (err) return console.error(err);
        console.log('build folder cleaned!');
    });
    return clean;
});
