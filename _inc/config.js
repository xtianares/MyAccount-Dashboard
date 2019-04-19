// Gulp.js configuration
const
    // modules
    gulp            = require('gulp'),
    replace         = require('gulp-replace'),

    // replacement settings
    themeFolder     = process.env.THE_THEME || 'asc';
;

module.exports =  {
    set: function (theStream) {
        theStream = theStream
            .pipe(replace('themeFolder_replaced_during_build', themeFolder))

        if (process.env.NODE_ENV == 'Development') {
            theStream = theStream
                .pipe(replace('themeFolder_replaced_during_build', themeFolder));
        }
        else if (process.env.NODE_ENV == 'Staging') {
            theStream = theStream
                .pipe(replace('themeFolder_replaced_during_build', themeFolder));
        }
        else if (process.env.NODE_ENV == 'Production') {
            theStream = theStream
                .pipe(replace('themeFolder_replaced_during_build', themeFolder));
            }
        else  {
            theStream = theStream
                .pipe(replace('themeFolder_replaced_during_build', themeFolder));
        }
        theStream = theStream.on("data", function() {}); // magic fix for the issue where pages just dont get optimized
    }
}
