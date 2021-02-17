var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var gulp_helper = require("./internal/gulp_helper");



/**
 * CSS task
 */

var VENDOR_CSS_ROOT = "./src/vendor/css";

var cssVendorList = [
    "/bootstrap.css",
    "/bootstrap-reset.css",
    "/font-awesome.css",
    "/style.css",
    "/style-responsive.css",
    "/slidebars.css"
];

gulp.task('vendorCSSMin', function() {

    return gulp.src(gulp_helper.mergePathRoot(VENDOR_CSS_ROOT, cssVendorList))
        .pipe(concat("compile_000.css"))
        .pipe(cssnano())
        .pipe(gulp.dest("public/compiled/css"));

});

/**
 * End CSS Task
 * #############################################
 */



/**
 * SASS task
 */
gulp.task('sassCompile', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(concat("app.css"))
        .pipe(cssnano())
        .pipe(gulp.dest('public/compiled/css'));
});

/**
 * End SASS Task
 * #############################################
 */



/**
 * Javascript task
 */

var VENDOR_JS_ROOT = "./src/vendor/js";

var vendorJSList = gulp_helper.mergePathRoot(VENDOR_JS_ROOT, [
    "/jquery.js",
    "/bootstrap.min.js",
    "/jquery.dcjqaccordion.2.7.js",
    "/hover-dropdown.js",
    "/jquery.scrollTo.min.js",
    "/jquery.nicescroll.js",
    "/respond.min.js",
    "/slidebars.min.js",
    "/common-scripts.js"
]);

//vendorJSList = vendorJSList.concat([
//    "./node_modules/vue/dist/vue.js"
//]);


gulp.task('vendorJSMin', function() {

    return gulp.src(vendorJSList)
        .pipe(concat("compile_000.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public/compiled/js"));

});


/**
 * End Javascript task
 * #############################################
 */



/**
 * Default task
 */

gulp.task(
    "default", 
    gulp.parallel(
        "vendorCSSMin", 
        "sassCompile", 
        "vendorJSMin"
    )
);

/**
 * End Default task
 * #############################################
 */
