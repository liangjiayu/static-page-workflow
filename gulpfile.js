const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const htmltpl = require("gulp-html-tpl");
const artTemplate = require("art-template");
const babel = require("gulp-babel");
const browserSync = require("browser-sync");
const changed = require("gulp-changed");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
// const sourcemaps = require("gulp-sourcemaps");

// dev start
function delHtml() {
  return del(["./src/pages/**/*"]);
}

function compileHtml() {
  return gulp
    .src("./src/views/**/*.html")
    .pipe(changed("./src/pages/"))
    .pipe(
      htmltpl({
        engine: function (template, data) {
          if (!template) {
            return false;
          }
          return artTemplate.compile(template)(data);
        },
      })
    )
    .pipe(gulp.dest("./src/pages/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function compileStyles() {
  return gulp
    .src("./src/style/**/*.scss")
    .pipe(
      changed("./src/assets/css/", {
        extension: ".css",
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({}))
    .pipe(gulp.dest("./src/assets/css/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function babelScript() {
  return gulp
    .src("./src/script/**/*.js")
    .pipe(changed("./src/assets/js/"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./src/assets/js/"));
}

function server() {
  return browserSync.init({
    server: {
      baseDir: "./src",
    },
    port: 3001,
    startPath: "/pages",
  });
}

function clearDev() {
  return del(["./src/assets/css/", "./src/assets/js/", "./src/pages/"]);
}

function watch() {
  gulp.watch("./src/views/public/*.html", gulp.series(delHtml, compileHtml));

  gulp.watch(
    ["./src/views/**/*.html", "!./src/views/public/*.html"],
    { ignoreInitial: false },
    compileHtml
  );

  gulp.watch("./src/style/**/*.scss", { ignoreInitial: false }, compileStyles);

  gulp.watch("./src/script/**/*.js", { ignoreInitial: false }, babelScript);

  setTimeout(() => {
    server();
  }, 500);
}
// dev end

// build start
function clearDist() {
  return del(["./dist/**"]);
}

function moveLibs() {
  return gulp.src("./src/assets/libs/*").pipe(gulp.dest("./dist/assets/libs"));
}

function buildHtml() {
  return gulp
    .src("./src/views/**/*.html")
    .pipe(
      htmltpl({
        engine: function (template, data) {
          if (!template) {
            return false;
          }
          return artTemplate.compile(template)(data);
        },
      })
    )
    .pipe(gulp.dest("./dist/pages/"));
}

function buildStyle() {
  return gulp
    .src("./src/style/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({}))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/assets/css"));
}

function buildScript() {
  return gulp
    .src("./src/script/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/assets/js/"));
}

// build end

exports.start = gulp.series(clearDev, watch);
exports.build = gulp.series(
  clearDist,
  gulp.parallel(buildHtml, buildStyle, buildScript),
  moveLibs
);
