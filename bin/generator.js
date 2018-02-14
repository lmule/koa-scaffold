let fs =require('fs');

let name = ''
let port = 3000
if (process.argv.length === 2) {
    program.help()
    /*const prompt = require('co-fs')*/
    /*name = yield prompt('请输入文件夹名称')*/
    /*port = yield prompt('请输入文件夹名称')*/
}
else {
    const program = require('commander')
    program
        .version('0.0.1')
        .option('-n, --name [value]', '请输入文件夹名称')
        .option('-p, --port <n>', '请输入要启动的端口号,默认是3000')
        .parse(process.argv)
    name = program.name
    port = program.port
}

let replace = async(fileName, mapper) => {
    let content = fs.readFileSync(fileName, 'utf-8')
    for (const key in mapper) {
        content = content.replace(new RegExp('{' + key + '}', 'g'), mapper[key])
    }
    fs.writeFileSync(fileName, content)
}

const mapper = {
    name: name,
    port: port
}

// replace('./pm2.json', mapper)
// replace('./package.json', mapper)
