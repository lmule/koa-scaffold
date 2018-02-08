const language = require('../../config/validator')
const joi = require('joi')
const oldJoi = joi.validate

module.exports = (value, schema, options) => {
    options = options || {};
    options.language = language

    return oldJoi(value, schema, options);
}