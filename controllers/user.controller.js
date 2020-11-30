module.exports.create = async ctx => {
    try {
        ctx.body = await ctx.db.User.create({
            firstName: ctx.request.body.firstName,
            lastName: ctx.request.body.lastName,
            email: ctx.request.body.email,
            birthDate: Date.parse(ctx.request.body.birthDate),
            ipAddress: ctx.request.body.ipAddress,
            registrationDate: Date.now(),
            status: ctx.request.body.status
        })
    } catch (err) {
        ctx.throw(500, err)
    }
}

module.exports.getAll = async ctx => {
    try {
        const query = {}
        if (ctx.query.firstName) {
            query.firstName = ctx.query.firstName
        }

        if (ctx.query.lastName) {
            query.lastName = ctx.query.lastName
        }

        ctx.body = await ctx.db.User.findAll({
            include: [
                {
                    model: ctx.db.Files
                }
            ]
        }, {
            where: query
        })
    } catch (err) {
        ctx.throw(500, err)
    }
}
