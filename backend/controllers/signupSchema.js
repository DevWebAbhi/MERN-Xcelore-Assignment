const Joi = require('joi');


const signupSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'First name should be a type of text',
            'string.alphanum': 'First name must only contain alpha-numeric characters',
            'string.empty': 'First name is required',
            'string.min': 'First name should have a minimum length of {#limit}',
            'string.max': 'First name should have a maximum length of {#limit}',
            'any.required': 'First name is required'
        }),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Last name should be a type of text',
            'string.alphanum': 'Last name must only contain alpha-numeric characters',
            'string.empty': 'Last name is required',
            'string.min': 'Last name should have a minimum length of {#limit}',
            'string.max': 'Last name should have a maximum length of {#limit}',
            'any.required': 'Last name is required'
        }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and only contain letters and numbers'
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required'
        }),

    access_token: Joi.string()
})
    .xor('password', 'access_token')
    .messages({
        'object.xor': '{#label} contains a conflict between exclusive peers {#peers}'
    });


 const loginSchema =  Joi.object({
    

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and only contain letters and numbers'
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required'
        }),

    access_token: Joi.string()
})
    .xor('password', 'access_token')
    .messages({
        'object.xor': '{#label} contains a conflict between exclusive peers {#peers}'
    });

    async function check(){
        try {
            const value = await signupSchema.validateAsync({ firstName:"Prajwal",lastName:"Rakhwande",email:"prajwal@gmail.com",password:"Prajwal123" });
            console.log(value,"kj");
        }
        catch (err) { 
            console.log(err);
         }
    }
    check()

module.exports = {signupSchema,loginSchema};





