const joi = require("joi")

const validator = (schema) => (payload) => schema.validate(payload)

const categorySchema = joi.object({
    name: joi.string().required(),
    description: joi.string()
})

const productSchema = joi.object({
    category: joi.string().required(),
    name: joi.string().required(),
    img: joi.string(),
    price: joi.number().required(),
    featured: joi.boolean(),
    topSelling: joi.boolean()
})

exports.validateCategory = validator(categorySchema)
exports.validateProduct = validator(productSchema)