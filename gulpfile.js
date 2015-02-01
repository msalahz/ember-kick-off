var gulp = require('gulp'),
    del = require('del'),
    copy = require('gulp-copy'),
    using = require('gulp-using'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    minifycss = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    emberTemplates = require('gulp-ember-templates');

var root = {
        src: 'src',
        build: 'dist'
    },
    date = new Date().getTime(),
    output = {
        src: {},
        build: {
            templates: 'build.hbs.js',
            scripts: 'build.js',
            styles: 'build.css'
        }
    },
    dest = {
        src: {},
        build: {
            templates: '/scripts',
            scripts: '/scripts',
            styles: '/styles'
        }
    },
    paths = {
        templates: {
            src: {
                dest: root.src + '/scripts',
                output: 'concat.hbs.js',
                files: ['src/templates/**/*.hbs']
            },
            build: {
                dest: root.build + dest.build.templates,
                output: output.build.templates,
                files: ['src/templates/**/*.hbs']
            }
        },
        scripts: {
            src: {
                dest: root.src + '/scripts',
                output: 'concat.js',
                jsFiles: [
                    'src/scripts/app.js',
                    'src/scripts/router.js',
                    'src/scripts/base/constant.js',
                    'src/scripts/base/service.js',
                    'src/scripts/classes/**/*',
                    'src/scripts/services/**/*',
                    'src/scripts/helpers/**/*',
                    'src/scripts/components/**/*',
                    'src/scripts/routes/**/*',
                    'src/scripts/controllers/**/*',
                    'src/scripts/views/**/*'
                ],
                mapFiles: []
            },
            build: {
                dest: root.build + dest.build.scripts,
                output: output.build.scripts,
                jsFiles: [
                    'src/bower_components/underscore/underscore-min.js',
                    'src/bower_components/underscore.string/dist/underscore.string.min.js',
                    'src/bower_components/jquery/dist/jquery.js',
                    'src/bower_components/jquery.cookie/jquery.cookie.js',
                    'src/bower_components/jgrowl/jquery.jgrowl.min.js',
                    'src/bower_components/spin.js/spin.js',
                    'src/bower_components/blockui/jquery.blockUI.js',
                    'src/bower_components/handlebars/handlebars.runtime.js',
                    'src/bower_components/ember/ember.js',
                    'src/kendo/kendo.all.js',
                    'src/scripts/app.js',
                    'src/scripts/router.js',
                    'src/scripts/base/constant.js',
                    'src/scripts/base/service.js',
                    'src/scripts/classes/**/*',
                    'src/scripts/services/**/*',
                    'src/scripts/helpers/**/*',
                    'src/scripts/components/**/*',
                    'src/scripts/routes/**/*',
                    'src/scripts/controllers/**/*',
                    'src/scripts/views/**/*'
                ],
                mapFiles: [
                    'src/bower_components/jgrowl/jquery.jgrowl.map'
                ]
            }
        },
        styles: {
            src: {
                dest: root.src + '/styles',
                output: 'concat.css',
                cssFiles: [
                    'src/styles/main.css',
                    'src/styles/block.css',
                    'src/styles/style.css'
                ],
                mapFiles: []
            },
            build: {
                dest: root.build + dest.build.styles,
                output: output.build.styles,
                cssFiles: [
                    'src/bower_components/normalize.css/normalize.css',
                    'src/bower_components/bootstrap/dist/css/bootstrap.css',
                    'src/bower_components/jgrowl/jquery.jgrowl.css',
                    'src/kendo/kendo.common.css',
                    'src/kendo/kendo.bootstrap.min.css',
                    'src/styles/main.css',
                    'src/styles/block.css',
                    'src/styles/style.css'
                ],
                mapFiles: [
                    'src/bower_components/bootstrap/dist/css/bootstrap.css.map'
                ]
            }

        },
        images: {
            src: {},
            build: {
                main: {
                    dest: root.build + '/images',
                    files: ['src/images/**/*']
                },
                kendo: {
                    bootstrap: {
                        dest: root.build + '/styles/Bootstrap',
                        files: ['src/kendo/Bootstrap/*']
                    },
                    common: {
                        dest: root.build + '/styles/common',
                        files: ['src/kendo/common/*']
                    }
                }
            }
        },
        fonts: {
            src: {},
            build: {
                dest: root.build + '/fonts',
                files: ['src/bower_components/bootstrap/dist/fonts/*']
            }
        },
        html: {
            src: {},
            build: {
                dest: root.build + '/',
                output: {
                    js: [
                        dest.build.scripts + '/' + output.build.scripts.replace('.js', '.min.js' + '?' + date),
                        dest.build.templates + '/' + output.build.templates.replace('.js', '.min.js' + '?' + date)
                    ],
                    css: dest.build.styles + '/' + output.build.styles.replace('.css', '.min.css' + '?' + date)
                },
                files: ['src/index.html']
            }
        }
    };

// development
gulp.task('src.templates', function () {
    return gulp.src(paths.templates.src.files)
        .pipe(emberTemplates())
        .pipe(concat(paths.templates.src.output))
        .pipe(gulp.dest(paths.templates.src.dest));
});
gulp.task('src.scripts', function () {
    return gulp.src(paths.scripts.src.jsFiles)
        .pipe(concat(paths.scripts.src.output))
        .pipe(gulp.dest(paths.scripts.src.dest));
});
gulp.task('src.styles', function () {
    return gulp.src(paths.styles.src.cssFiles)
        .pipe(concat(paths.styles.src.output))
        .pipe(gulp.dest(paths.styles.src.dest));
});
gulp.task('src.watch', function () {
    //watches handlebars files for changes
    gulp.watch(paths.templates.src.files, ['src.templates']);
    //watches scripts files for changes
    gulp.watch(paths.scripts.src.jsFiles, ['src.scripts']);
    //watches styles files for changes
    gulp.watch(paths.styles.src.cssFiles, ['src.styles']);
});

// production
gulp.task('clean', function (cb) {
    del([root.build], cb)
});
gulp.task('templates', function () {
    return gulp.src(paths.templates.build.files)
        .pipe(emberTemplates())
        .pipe(concat(paths.templates.build.output))
        .pipe(gulp.dest(paths.templates.build.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.templates.build.dest))
        .pipe(notify({message: 'Templates task complete'}));
});
gulp.task('scripts.js', function () {
    return gulp.src(paths.scripts.build.jsFiles)
        .pipe(concat(paths.scripts.build.output))
        .pipe(gulp.dest(paths.scripts.build.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.build.dest))
        .pipe(notify({message: 'Scripts task complete'}));
});
gulp.task('scripts.map', function () {
    return gulp.src(paths.scripts.build.mapFiles)
        .pipe(copy(paths.scripts.build.dest, {prefix: 5}))
        .pipe(notify({message: 'Scripts.map task complete'}));
});
gulp.task('scripts', ['scripts.js', 'scripts.map']);
gulp.task('styles.css', function () {
    return gulp.src(paths.styles.build.cssFiles)
        .pipe(concat(paths.styles.build.output))
        .pipe(gulp.dest(paths.styles.build.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.styles.build.dest))
        .pipe(notify({message: 'Styles.css task complete'}));
});
gulp.task('styles.map', function () {
    return gulp.src(paths.styles.build.mapFiles)
        .pipe(copy(paths.styles.build.dest, {prefix: 5}))
        .pipe(notify({message: 'Styles.map task complete'}));
});
gulp.task('styles', ['styles.css', 'styles.map']);
gulp.task('images.main', function () {
    return gulp.src(paths.images.build.main.files)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.images.build.main.dest));
});
gulp.task('images.kendo.bootstrap', function () {
    return gulp.src(paths.images.build.kendo.bootstrap.files)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.images.build.kendo.bootstrap.dest));
});
gulp.task('images.kendo.common', function () {
    return gulp.src(paths.images.build.kendo.common.files)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.images.build.kendo.common.dest));
});
gulp.task('images', ['images.main', 'images.kendo.bootstrap', 'images.kendo.common']);
gulp.task('fonts', function () {
    return gulp.src(paths.fonts.build.files)
        .pipe(copy(paths.fonts.build.dest, {prefix: 5}))
        .pipe(notify({message: 'Fonts task complete'}));
});
gulp.task('html', function () {


    return gulp.src(paths.html.build.files)
        .pipe(htmlreplace(paths.html.build.output))
        .pipe(gulp.dest(paths.html.build.dest))
        .pipe(notify({message: 'HTML task complete'}));
});

// tasks

// The serve task (called when you run `gulp serve` from cli)
gulp.task('serve', ['src.templates'], function () {
    gulp.start(
        'src.scripts',
        'src.styles'
    );
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['src.watch', 'serve']);

// The build task (called when you run `gulp build` from cli)
gulp.task('build', ['clean'], function () {
    gulp.start(
        'templates',
        'scripts',
        'styles',
        'images',
        'fonts',
        'html'
    );
});



