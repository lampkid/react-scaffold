
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var templateFile = path.resolve(__dirname, '../page/template.php');


var NEED_PAGE = true; //是否需要生成页面

//自动按键值生成到相应的目录里,关注配置即可
/**
 * demo:
 *
 * app: [
 *       {
 *           pageName: 'index.html',
 *           scripts: ['index'],
 *           pack: {
 *               index: ['./src/app/index.js']
 *           }
 *       }
 *   ]
 *
 */
var PAGE_LIST_MAP = {
    app: [
        {
            pageName: 'index.html',
            scripts: ['index'],
            pack: {
                index: ['./src/app/index.js']
            }
        }
    ]

};


var PAGE_LIST = [];
var entry = {};

Object.keys(PAGE_LIST_MAP).map(function (project) {
    var projectPageList = PAGE_LIST_MAP[project];

    projectPageList.map(function (projectPage) {
        var scripts = projectPage.scripts.map (function (script) { 
            var outputFilePath = project + '/' + script;
            var packInfo = projectPage.pack || {};
            if (packInfo[script]) {
                entry[outputFilePath] = packInfo[script];
            }
            return outputFilePath; 
        });

        scripts.push('common');

        var item = {
            pageName: project + '/' + projectPage.pageName,
            scripts: scripts
        };

        if (NEED_PAGE) {
            //页面生成先通过全局控制，写到这里
            PAGE_LIST.push(item);
        }

    });
    
});

pages = PAGE_LIST.map(function (item) {
    return new HtmlWebpackPlugin({
       template: templateFile,
       filename: item.pageName,
       chunks: item.scripts,
       inject: 'body'
    });
});

module.exports = {
    entry: entry,
    pages: pages
}
