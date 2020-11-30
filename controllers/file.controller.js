const fs = require('fs')

module.exports.upload = async ctx => {
    try {
        const file = ctx.request.files.file
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf') {
            ctx.body = await ctx.db.Files.create({
                fileName: ctx.request.body.fileName,
                originalName: file.path.split('/')[1],
                mime: file.type.toString(),
                size: file.size
            })
        } else {
            fs.unlink(__dirname + '/../' + file.path, (err) => {
                if (err) {
                    throw err
                }
            })
            ctx.body = {
                message: 'Неверный формат'
            }
        }
    } catch (err) {
        ctx.throw(500, err)
    }
}
