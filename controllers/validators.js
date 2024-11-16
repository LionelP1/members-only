const { check, body, validationResult } = require('express-validator');

exports.validateUser = [
    check('first_name')
        .isAlpha()
        .withMessage('First name can only contain letters')
        .notEmpty()
        .withMessage('First name is required'),
    check('last_name')
        .isAlpha()
        .withMessage('Last name can only contain letters')
        .notEmpty()
        .withMessage('Last name is required'),
    check('username')
        .isAlphanumeric()
        .withMessage('Username can only contain letters and numbers')
        .isLength({ min: 3, max: 15 })
        .withMessage('Username must be between 3 and 15 characters')
        .notEmpty()
        .withMessage('Username is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];