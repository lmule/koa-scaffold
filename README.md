# djbiu

## 安装方式

```
    npm i djbiu -g
```

## 该工具主要是基于koa2做的脚手架，主要包含以下两个功能:

- 搭建工程项目的整体目录结构，包含一些比较常用的功能以及对应的技术选型:

    - log -> log4js
    - 统一异常处理
    - db -> bookshelf(之所以不用sequelizejs是因为有点太重)
    - bodyParser -> koa-bodyparser
    - cors -> koa2-cors
    - 统一输出,业务只需要在controller里面返回业务数据即可，由response中间件返回统一的数据格式 -> koa-json
    - router -> koa-router
    - 部署: supervisor && pm2(后期会加docker)
    - 传入的数据验证 -> joi
    - 管理异步 async / await
    - 请求远程url -> axios

- 生成单表的增删改查（暂时不涉及到多表关联，因为如果自动处理多表关联的话，是基于数据库外键的，但其实一般不太推荐使用外键）

## 具体用法：

- 初始化工程目录结构

```
    djbiu init -n '项目名称' -p 端口号
```

- 新建某个单表的增删改查

```
    djbiu crud -t '表名' -m 'model名'
```