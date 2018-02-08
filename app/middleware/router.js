const routerPath = require("path").join(__dirname, "../router");

// 遍历router下的所有路由文件，这样就不用再加router/index.js来包含所有文件了
module.exports = app => {
    require("fs").readdirSync(routerPath).forEach(function(file) {
        const router = require("../router/" + file).routes();
        app.use(router)
    });
}