const fs = require('fs')
const path = require('path')

const [ , , folderPath, newFileName] = process.argv

if (!folderPath) {
    throw new Error('需要指定目录')
}

if (!newFileName) {
    throw new Error('需要指定新的文件名')
}

fs.readdir(folderPath, null, (err, files) => {
    if (err) console.log(err)

    files.forEach(file => {        
        const pattern = /.*([\d 一 二 三 四 五 六 七 八 九 十]).*(\..*)/
        const newFile = file.replace(pattern, `${newFileName}$1$2`)
        const filePath = path.format({
            root: '/ignored',
            dir: folderPath,
            base: file,
        })
        const newFilePath = path.format({
            root: '/ignored',
            dir: folderPath,
            base: newFile,
        })
        fs.rename(filePath, newFilePath, err => console.log(err))
    })
})
