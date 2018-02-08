const axios = require('axios')
const log = require('./log')

module.exports = {
    get: async url => {
        const start = (new Date()).getTime()
        const {data} = await axios.get(url)
        const duration = (new Date()).getTime() - start
        log.info('GET请求第三方url:%s 共耗时%s毫秒', url, duration)
        return data
    },
    post: async url => {
        const start = (new Date()).getTime()
        const {data} = await axios.post(url)
        const duration = (new Date()).getTime() - start
        log.info('POST请求第三方url:%s 共耗时%s毫秒', url, duration)
        return data
    }
}