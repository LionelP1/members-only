const { check, body, validationResult } = require('express-validator');

const validateUser = [
    check('firstName')
        .isAlpha()
        .withMessage('can only contain letters')
        .notEmpty()
        .withMessage('is required'),
    check('lastName')
        .isAlpha()
        .withMessage('can only contain letters')
        .notEmpty()
        .withMessage('is required'),
    check('username')
        .isAlphanumeric()
        .withMessage('can only contain letters and numbers')
        .isLength({ min: 3, max: 15 })
        .withMessage('must be between 3 and 15 characters')
        .notEmpty()
        .withMessage('is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('must contain at least one letter'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];