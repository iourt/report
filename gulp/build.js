var fs   = require('fs'),
    argv = require('yargs').argv,
    os   = require('os');

var getProject = require('./tools/folder.js'),
    buildFolder = require('./tools/build.folder.js')() || './build/';


var runType     = argv.run || '', // dev、build
    packageType = argv.g || 'app', //--默认打APP的包，如果要打H5的包就 --g web
    codePath    = "./source/", //---------代码放置目录
    cssPath     = './source/themes',
    netPath     = '',
    d           = new Date(),
    version     = d.getTime(),
    veros       = os.platform();

switch (runType) {
    case 'build':
        netPort = argv.port || 8888;
        netPath = buildFolder;
    break;

    default: //--dev
        netPort = argv.port || 9999;
        netPath = './source/';
}

module.exports = function (gulp, $) {

    gulp.task('sass', function() {

        return gulp.src(codePath+'themes/*.scss')
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({
                title: 'css--------------------------------'
            }))
            .pipe(gulp.dest(cssPath));
    });


    gulp.task('clean', function() {
        
        if (runType !== 'build') {
            return;
        }

        return gulp.src([
                buildFolder,
                './.tmp'
            ], {read: false})
            // .pipe($.clean());
            .pipe($.rimraf({ force: true })); 
    });


    gulp.task('connect', function() {

        var url = '';

        $.connect.server({
            root: netPath,
            port: netPort,
            livereload: true
        });

        switch (veros) {
            case 'win32':
                url = 'start http://localhost:' + netPort;
            break;

            case 'darwin':
                url = 'open http://localhost:' + netPort;
            break;
        }

        gulp.src('')
            .pipe($.shell(url));
    });
    

    gulp.task('watch', function() {

        $.livereload.listen();

        gulp.src(codePath+'themes/**/*.scss')
            .pipe($.plumber())
            .pipe($.watch(codePath+'themes/**/*.scss', function() {
                gulp.src(codePath+'themes/*.scss')
                    .pipe($.plumber())
                    .pipe($.sass())
                    .pipe($.autoprefixer('last 3 version'))
                    .pipe($.size({
                        title: 'css--------------------------------'
                    }))
                    .pipe(gulp.dest(cssPath))
                    .pipe($.livereload());
            }));


        gulp.src([
                codePath+'**/*.html',
                codePath+'**/*.js',
                '!'+codePath+'lib/**/*',
                '!'+codePath+'bower/**/*'
            ])
            .pipe($.watch([
                codePath+'**/*.html',
                codePath+'**/*.js',
                '!'+codePath+'lib/**/*',
                '!'+codePath+'bower/**/*'
            ]))
            .pipe($.livereload());

    });
    
    //--JS 注入到页面中
    gulp.task('inject', function() {
        return gulp.src(codePath+'index.html')
            .pipe(
                $.inject(
                    gulp.src(codePath+'common/**/*.js', {read: false}), { 
                        relative: true, 
                        name: 'injectcommon' 
                    }
                )
            )
            .pipe(
                $.inject(
                    gulp.src([
                            codePath+'**/*.js',
                            '!'+codePath+'app.js',
                            '!'+codePath+'common/**/*.js',
                            '!'+codePath+'data/*',
                            '!'+codePath+'themes/*',
                            '!'+codePath+'lib/**/*',
                            '!'+codePath+'bower/**/*'
                        ], 
                        {read: false}), {relative: true}
                )
            )
            .pipe(gulp.dest(codePath));
    });

    
    //--html js 替换
    gulp.task('replacehtml', function() {
        var jsFiles = [
            'frame.js?v='+ version,
            'common.js?v='+ version,
            'index.js?v='+ version
        ];

        return gulp.src(codePath+'index.html')
            .pipe($.htmlReplace({
                'css': 'themes/all.css?v='+ version,
                'js': jsFiles
            }))
            .pipe(gulp.dest(buildFolder));
    });


    //--生成JS模板数据
    gulp.task('templates', function() {
        return gulp.src([
                codePath+'**/*.html',
                '!'+codePath+'index.html',
                '!'+codePath+'bower/**/*'
            ])
            .pipe($.ngHtml2js({
                moduleName: "Huijm",
                prefix: ""
            }))
            .pipe(gulp.dest("./.tmp/"));
    });

    //--css 迁移
    gulp.task('movecss', function() {
        return gulp.src([
                codePath+'**/*.css',
                '!'+codePath+'bower/**/*'
            ])
            // .pipe($.minifyCss())
            .pipe(gulp.dest(buildFolder));
    });

    //字体文件
    gulp.task('movefonts', function() {
        return gulp.src([
                codePath+'themes/fonts/*'
            ])
            .pipe(gulp.dest(buildFolder+ '/themes/fonts'));
    });

    //--image 迁移
    gulp.task('moveimages', function() {
        return gulp.src([
                codePath+'**/*.jpg',
                codePath+'**/*.png',
                '!'+codePath+'bower/**/*'
            ])
            .pipe(gulp.dest(buildFolder));
    });

    //--json 迁移
    gulp.task('movejson', function() {
        return gulp.src([
                codePath+'**/*.json',
                '!'+codePath+'bower/**/*'
            ])
            .pipe(gulp.dest(buildFolder));
    });
    
    //--js 合并压缩
    gulp.task('minjs', function() {
        //--框架JS压缩合并
        var framejs = [
                codePath+'lib/md5.js',

        		codePath+'bower/angular/angular.js',
        		codePath+'bower/angular-touch/angular-touch.js',
        		codePath+'bower/angular-route/angular-route.js',
        		codePath+'bower/angular-ui-router/release/angular-ui-router.js',
                codePath+'bower/highcharts-ng/highcharts-ng.js'
            ];

        gulp.src(framejs)
            .pipe($.concat('frame.js'))
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder));


        //--项目公共JS压缩、合并（包括公共模板数据）
        gulp.src([
                codePath+'app.js',
                
                './.tmp/common/**/*.js',
                codePath+'common/**/*.js'
            ])
            .pipe($.concat('common.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder));

        //--项目中的JS压缩、合并（包括项目模板数据）
        gulp.src([
                './.tmp/**/*.js',
                codePath+'**/*.js',

                '!./.tmp/common/**/*.js',

                '!'+codePath+'app.js',
                '!'+codePath+'lib/**/*.js',
                '!'+codePath+'common/**/*.js',
                '!'+codePath+'bower/**/*'
            ])
            .pipe($.concat('index.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder));
    });
};
