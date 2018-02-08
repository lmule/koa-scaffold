const middleWare = ['log', 'error', 'db', 'bodyParser', 'cors', 'json', 'response', 'router']

// 不循环获取middleware下面的文件然后require，是因为是考虑中间件的加载顺序
module.exports = app => {
    middleWare.forEach(function(file) {
        require('../middleware/' + file)(app)
    })
}