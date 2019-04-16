// Gulp.js configuration
var
    // modules
    gulp            = require('gulp'),
    replace         = require('gulp-replace'),

    // replacement settings
    price_default_pids          = '["1149","1189"]', // defaut PIDs for this site/build
    price_default_lgr           = 'ba4e9284-3ca7-4a2b-b242-fb93f57f1fad', // default LGR for this site/build
    reg_default_host            = 'texasadultdriver.com', // default host
    default_order_description   = 'TexasAdultDriver.com Course', // default host
    site_url                    = 'https://www.texasadultdriver.com', // final url of the site

    // Application Insights instrumentation key
    iKey                        = '000000', // Replace with site's Application Insights unique instrumentation key ("iKey")

    dl_apiURL_registration      = 'https://dlapi.amersc.com/registration/api/v1/',
    dl_apiURL_product           = 'https://dlapi.amersc.com/product/api/v1.1/',
    dl_apiURL_geolocation       = 'https://dlapi.amersc.com/geolocation/api/v1.0/',
    dl_loginURL                 = 'https://dlhome.amersc.com/studentlogin.aspx?host=' + reg_default_host,

    dl_apiURL_registration      = 'https://mlapi.amersc.com/registration/api/v1/',
    dl_apiURL_product           = 'https://mlapi.amersc.com/product/api/v1.1/',
    dl_apiURL_geolocation       = 'https://mlapi.amersc.com/geolocation/api/v1.0/',
    dl_loginURL                 = 'https://mlhome.amersc.com/studentlogin.aspx?host=' + reg_default_host,

    ml_apiURL_registration      = 'https://mlapi.amersc.com/registration/api/v1/',
    ml_apiURL_product           = 'https://mlapi.amersc.com/product/api/v1.1/',
    ml_apiURL_geolocation       = 'https://mlapi.amersc.com/geolocation/api/v1.0/',
    ml_loginURL                 = 'https://mlhome.amersc.com/studentlogin.aspx?host=' + reg_default_host,

    prod_apiURL_registration    = 'https://api.amersc.com/registration/api/v1/',
    prod_apiURL_product         = 'https://api.amersc.com/product/api/v1.1/',
    prod_apiURL_geolocation     = 'https://api.amersc.com/geolocation/api/v1.0/',
    prod_loginURL               = 'https://home.uceusa.com/studentlogin.aspx?host=' + reg_default_host,

    local_apiURL_registration   = 'http://localhost:49929/registration/api/v1/', // change this to your own local url
    local_apiURL_product        = 'http://localhost:50817/product/api/v1.1/',  // change this to your own local url
    local_apiURL_geolocation    = 'http://localhost:50817/geolocation/api/v1.0/',  // change this to your own local url
    local_loginURL              = 'http://localhost:58804/studentlogin.aspx?host=' + reg_default_host  // change this to your own local url
;

module.exports =  {
    set: function (theStream) {
        theStream = theStream
            .pipe(replace('INSTRUMENTATION_KEY', iKey))
            .pipe(replace('default_pids_replaced_during_build', price_default_pids))
            .pipe(replace('default_lgr_replaced_during_build', price_default_lgr))
            .pipe(replace('default_host_replaced_during_build', reg_default_host))
            .pipe(replace('order_description_replaced_during_build', default_order_description));

        if (process.env.NODE_ENV == 'Development') {
            theStream = theStream
                .pipe(replace('apiURL_registration_replaced_during_build', dl_apiURL_registration))
                .pipe(replace('apiURL_product_replaced_during_build', dl_apiURL_product))
                .pipe(replace('apiURL_geolocation_replaced_during_build', dl_apiURL_geolocation))
                .pipe(replace('loginURL_replaced_during_build', dl_loginURL));
        }
        else if (process.env.NODE_ENV == 'Staging') {
            theStream = theStream
                .pipe(replace('apiURL_registration_replaced_during_build', ml_apiURL_registration))
                .pipe(replace('apiURL_product_replaced_during_build', ml_apiURL_product))
                .pipe(replace('apiURL_geolocation_replaced_during_build', ml_apiURL_geolocation))
                .pipe(replace('loginURL_replaced_during_build', ml_loginURL));
        }
        else if (process.env.NODE_ENV == 'Production') {
            theStream = theStream
                .pipe(replace('apiURL_registration_replaced_during_build', prod_apiURL_registration))
                .pipe(replace('apiURL_product_replaced_during_build', prod_apiURL_product))
                .pipe(replace('apiURL_geolocation_replaced_during_build', prod_apiURL_geolocation))
                .pipe(replace('loginURL_replaced_during_build', prod_loginURL));
            }
        else  {
            theStream = theStream
                .pipe(replace('apiURL_registration_replaced_during_build', local_apiURL_registration))
                .pipe(replace('apiURL_product_replaced_during_build', local_apiURL_product))
                .pipe(replace('apiURL_geolocation_replaced_during_build', local_apiURL_geolocation))
                .pipe(replace('loginURL_replaced_during_build', local_loginURL));
        }
        theStream = theStream.on("data", function() {}); // magic fix for the issue where pages just dont get optimized
    },
    site_url: site_url
}
