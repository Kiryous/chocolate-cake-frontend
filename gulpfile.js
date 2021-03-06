'use strict';

var gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    portfinder = require('portfinder'),
    postcss = require('gulp-postcss'),
    postcssEasyImport = require('postcss-easy-import'),
    cssnext = require('postcss-cssnext'),
    nano = require('gulp-cssnano'),
    browserSync = require("browser-sync"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    twig = require('gulp-twig'),
    inline  = require('postcss-inline-svg'),
    cache = require('gulp-cached'),
    image = require('gulp-imagemin'),
    cachebust = require('gulp-cache-bust'),
    eslint = require('gulp-eslint'),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    reload = browserSync.reload;

function flatten(path) {
	path.dirname = '';
	return path;
}

var processors = [
  postcssEasyImport({extensions: '.pcss'}),
  cssnext(),
  inline()
];

// Ресурсы проекта
var OUT = 'build';
var paths = {
  styles: 'src/styles/',
  css: OUT + '/assets/css/',
  scripts: 'src/scripts/',
  js:  OUT + '/assets/js/',
  templates: 'src/templates/',
  img: 'src/img/',
  bundles:  OUT + '/assets/img/',
  html: 'build/',
  fonts: 'src/fonts/',
  outFonts: OUT + '/assets/fonts/',
  audios: 'src/audios',
  outAudios: OUT + '/assets/audios/'  
};

// Одноразовая сборка проекта
gulp.task('default', function() {
  gulp.start('templates', 'styles', 'scripts', 'copy-fonts', 'copy-audios', 'cache', 'img');
});

// Запуск живой сборки
gulp.task('live', function() {
  gulp.start('templates', 'styles', 'scripts', 'copy-fonts', 'copy-audios', 'img', 'watch', 'server');
});

// Запуск туннеля в интернет
gulp.task('external-world', function() {
  gulp.start('templates', 'styles', 'scripts', 'copy-fonts', 'copy-audios', 'img', 'watch', 'web-server');
});

// Cборка с вотчем без браузерсинка
gulp.task('no-server', function() {
  gulp.start('templates', 'styles', 'scripts', 'copy-fonts', 'copy-audios', 'img', 'watch');
});

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  gulp.watch(paths.templates + '**/*.html', ['templates']);
  gulp.watch(paths.styles + '**/*.pcss', ['styles']);
  gulp.watch(paths.scripts + '*.js', ['scripts']);
  gulp.watch(paths.fonts + '**/*', ['copy-fonts']); 
  gulp.watch(paths.audios + '**/*', ['copy-audios']);     
  gulp.watch(paths.img + '*.{png,jpg,gif,svg}', ['img']).on('change', function(event) {
    if (event.type === 'deleted') {
      del(paths.bundles + path.basename(event.path));
      delete cache.caches['img'][event.path];
    }
  });
});

// Шаблонизация
gulp.task('templates', function() {
  gulp.src(paths.templates + '*.html')
    .pipe(plumber({errorHandler: onError}))
    .pipe(twig(
      {defaults: { cache: false }}
    ))
    .pipe(gulp.dest(paths.html))
    .pipe(reload({stream: true}));
});

// Компиляция стилей, добавление префиксов
gulp.task('styles', function () {
  gulp.src(paths.styles + 'layout.pcss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(postcss(processors))
    .pipe(rename('style.css'))
    .pipe(nano({convertValues: {length: false}}))
    .pipe(gulp.dest(paths.css))
    .pipe(reload({stream: true}));    
});

// Lint for god sick 
gulp.task('styles:lint', function () {
  gulp.src(paths.styles + '**.pcss')
    .pipe(postcss([
      require('stylelint')(),
      require('postcss-reporter')({clearMessages: true})]
    ));
});

// Сборка и минификация скриптов
gulp.task('scripts', function() {
  gulp.src(paths.scripts + '*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js))
    .pipe(reload({stream: true}));    
});

// Сжатие картинок
gulp.task('img', function() {
  gulp.src(paths.img + '/**/*.{png,jpg,gif,svg}')
    .pipe(cache('img'))
    .pipe(image({
      verbose: true
    }))
    .pipe(gulp.dest(paths.bundles));
});

gulp.task('copy-fonts', () => {
	return gulp
		.src(paths.fonts + '**/*')
		.pipe(plumber({errorHandler: onError}))
		.pipe(rename(flatten))
		.pipe(gulp.dest(paths.outFonts));
});

gulp.task('copy-audios', () => {
	return gulp
		.src(paths.audios + '**/*')
		.pipe(plumber({errorHandler: onError}))
		.pipe(rename(flatten))
		.pipe(gulp.dest(paths.outAudios));
});

// Очистка кэша для яваскрипта и ЦССа
gulp.task('cache', function() {
  gulp.src(paths.html + '*.html')
    .pipe(cachebust())
    .pipe(gulp.dest(paths.html))
    .pipe(reload({stream: true}));
});

// Локальный сервер
gulp.task('server', function() {
  portfinder.getPort(function (err, port) {
    browserSync({
      server: {
        baseDir: "build/"
      },
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Локальный сервер c туннелем в интернет
gulp.task('web-server', function() {
  portfinder.getPort(function (err, port) {
    browserSync({
      server: {
        baseDir: "demo/"
      },
      tunnel: true,
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Рефреш ХТМЛ-страниц
gulp.task('html', function () {
  gulp.src(paths.html + '*.html')
    .pipe(reload({stream: true}));
});

// Ошибки
var onError = function(error) {
  gutil.log([
    (error.name + ' in ' + error.plugin).bold.red,
    '',
    error.message,
    ''
  ].join('\n'));
  gutil.beep();
  this.emit('end');
};
