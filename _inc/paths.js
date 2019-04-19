// template location setup, this is also in the config.js
// process.env.THE_THEME = 'asc'; // set this node variable during build, uncomment for testing
// SET THE_THEME=asc for testing locally
const themeFolder = process.env.THE_THEME || 'asc';
console.log('Theme Used: ' + themeFolder);

// folders paths
module.exports = {
    themes: [
        'asc',
        'aaa'
    ],
    site: {
        src: '_src/',
        dest: '_build/'
    },
    html: {
        sitePages: '_src/pages/**/*.+(html|njk)',
        siteFolder: '_src/pages/',
        templatesFiles: '_src/templates/**/*',
        templatesFolder: '_src/templates/'
    },
    images: {
        siteFiles: '_src/images/**/*',
        siteFolder: '_src/images/',
        siteDest: '_build/images/',
        themeFiles: theme => '_src/themes/' + theme + '/images/**/*',
        themeFolder: theme => '_src/themes/' + theme + '/images/',
        themeDest: theme => '_build/themes/' + theme + '/custom_content/images/'
    },
    css: {
        siteFiles: '_src/scss/**/*',
        siteFolder: '_src/scss/',
        // siteSass: '_src/scss/site.scss',
        siteSass: theme => '_src/themes/' + theme + '/scss/site.scss',
        siteDest: theme => '_build/themes/' + theme + '/custom_content/css/',
        bsFiles: '_src/bootstrap/scss/**/*',
        bsFolder: '_src/bootstrap/scss/',
        bsSass: '_src/scss/bootstrap/scss/bootstrap.scss',
        bsDest: theme => '_build/themes/' + theme + '/custom_content/css/bootstrap'
    },
    js: {
        siteFiles: '_src/js/**/*',
        siteRootFiles: '_src/js/*',
        siteFolder: '_src/js/',
        siteDest: theme => '_build/themes/' + theme + '/custom_content/js/',
    },
    fonts: {
        files: '_src/font/**/*',
        folder: '_src/font/',
        dest: '_build/font/'
    },
    downloads: {
        files: '_src/downloads/**/*',
        folder: '_src/downloads',
        dest: '_build/downloads/'
    },
    root: {
        files: '_src/root/**/*'
    }
}
