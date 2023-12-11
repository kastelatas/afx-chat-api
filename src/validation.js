const Joi = require('joi');

module.exports.registerValidation = (data) => {
    const schema = Joi.object({
        login: Joi.string()
            .min(5)
            .required(),
        email: Joi.string()
            .min(5)
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    })

    return schema.validate(data);
}

module.exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(5)
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    })

    return schema.validate(data);
}
