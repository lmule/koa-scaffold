const PageType = require('../model/pageType')
const joi = require('joi')
const validator = require('../helper/validator')
const util = require('util')

let controller = {}

controller.list = async (ctx, next) => {
    return await PageType
            .fetchAll({
                columns: ['id', 'code', 'name']
            })
}

controller.add  = async (ctx, next) => {
    const {code, name, description} = ctx.query
    const value = {
        code: code,
        name: name,
        description: description
    }
    const scheme = {
        code: joi.string().required().max(50).label('页面类型代码'),
        name: joi.string().required().max(50).label('页面类型名称'),
        description: joi.string().max(100).required().label('页面类型描述')
    }

    // 这里要重新用Promise包装是因为对应多个异常，需要对err.details做重新包装
    await new Promise((resolve, reject) => {
        validator(value, scheme, { abortEarly: false })
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            let retError = []
            err.details.forEach(element => {
                retError.push(element.message)
            });
            reject(retError)
        })
    })

    const isExist = await PageType.query({
        where: { code: code },
        orWhere: { name: name }
    })
    .count()
    if (isExist > 0) {
        throw new Error(util.format('已经存在code=%s或者name=%s的记录', code, name))
    }

    let result = await new PageType(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存页面类型失败，具体数据是:%s', JSON.stringify(value)))
    }

    ctx.clientEnd()
}

module.exports = controller