// folders paths
module.exports = {
    site: {
        src: '_src/',
        dest: '_build/'
    },
    reg: {
        src: '_src/registration/',
        dest: '_build/registration/'
    },
    html: {
        sitePages: '_src/pages/**/*.+(html|njk)',
        siteFolder: '_src/pages/',
        regPages: '_src/registration/pages/**/*.+(html|njk)',
        regFolder: '_src/registration/pages/',
        templatesFiles: '_src/templates/**/*',
        templatesFolder: '_src/templates/'
    },
    images: {
        siteFiles: '_src/images/**/*',
        regFiles: '_src/registration/images/**/*',
        siteFolder: '_src/images/',
        regFolder: '_src/registration/images/',
        siteDest: '_build/custom_content/images/',
        regDest: '_build/images/registration/'
    },
    css: {
        siteFiles: '_src/scss/**/*',
        siteFolder: '_src/scss/',
        siteSass: '_src/scss/site.scss',
        siteDest: '_build/custom_content/css/',
        bsFiles: '_src/bootstrap/scss/**/*',
        bsFolder: '_src/bootstrap/scss/',
        bsSass: '_src/bootstrap/scss/bootstrap.scss',
        bsDest: '_build/custom_content/css/bootstrap'
    },
    js: {
        siteFiles: '_src/js/**/*',
        siteRootFiles: '_src/js/*',
        siteFolder: '_src/js/',
        regFiles: '_src/registration/js/**/*',
        regRootFiles: '_src/registration/js/*',
        regFolder: '_src/registration/js/',
        siteDest: '_build/custom_content/js/',
        regDest: '_build/js/registration/'
    },
    lang: {
        files: '_src/registration/lang/**/*',
        folder: '_src/registration/lang/',
        en: '_src/registration/lang/en/index.json',
        es: '_src/registration/lang/es/index.json',
        dest: '_build/registration/lang/'
    },
    ajax: {
        files: '_src/registration/ajax/**/*',
        folder: '_src/registration/ajax/',
        dest: '_build/registration/ajax/'
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
