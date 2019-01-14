const Joi = require("joi");

const { usernameSchema, emailSchema } = require("../user/user.validation");

const passwordSchema = Joi.object().keys({
    password: Joi.string()
        .min(6)
        .trim()
        .required()
        .error(new Error("Password must be 6 characters long"))
});

const signupSchema = usernameSchema.concat(passwordSchema).concat(emailSchema);

const loginSchema = usernameSchema.concat(passwordSchema);

const tokenSchema = Joi.object().keys({
    token: Joi.binary()
        .encoding("base64")
        .min(15)
        .required()
        .error(new Error("Invalid token"))
});

module.exports = { signupSchema, loginSchema, tokenSchema };
