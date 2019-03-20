module.exports =  {
    gutil           : require('gulp-util'),
    newer           : require('gulp-newer'),
    imagemin        : require('gulp-imagemin'),
    htmlmin         : require('gulp-htmlmin'),
    sass            : require('gulp-sass'),
    autoprefixer    : require('gulp-autoprefixer'),
    cleancss        : require('gulp-clean-css'),
    sourcemaps      : require('gulp-sourcemaps'),
    concat          : require('gulp-concat'),
    deporder        : require('gulp-deporder'),
    stripdebug      : require('gulp-strip-debug'),
    jshint          : require('gulp-jshint'),
    uglify          : require('gulp-uglify'),
    nunjucksRender  : require('gulp-nunjucks-render'),
    webserver       : require('gulp-webserver'),
    webp            : require('gulp-webp'),
    replace         : require('gulp-replace'),
    sitemap         : require('gulp-sitemap'),
    chug            : require('gulp-chug'),
    data            : require('gulp-data'),
    postcss         : require('gulp-postcss'),
    fs              : require('fs-extra'),
    critical        : require('critical').stream,
    runSequence     : require('run-sequence'),
    swPrecache      : require('sw-precache'),
    eventstream     : require('event-stream')
}
