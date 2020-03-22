const { body, param } = require('express-validator');
const commonUtility = require('../utility/common-utility');

const validate = method => {
    switch (method) {
        case 'add':
            return [
                body('nane')
                    .exists()
                    .isString()
                    .isLength({ min: 3, max: 254 })
                    .withMessage('name is too small or long.')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Name has some invalid characters.'),
                body('email')
                    .exists()
                    .withMessage('Email is not available')
                    .isEmail()
                    .normalizeEmail(),
                body('age')
                    .exists()
                    .isString()
                    .isLength({ min: 1, max: 2 })
                    .withMessage('Age is too little or long.')
                    .custom(value => commonUtility.checkIfPositiveNumber(value))
                    .withMessage('Age must be positive a no.')
            ];
        case 'update':
            return [
                param('email')
                    .exists()
                    .withMessage('Email is not available')
                    .isEmail()
                    .normalizeEmail(),
                body('nane')
                    .exists()
                    .isString()
                    .isLength({ min: 3, max: 254 })
                    .withMessage('name is too small or long.')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Name has some invalid characters.'),
                body('email')
                    .exists()
                    .withMessage('Email is not available')
                    .isEmail()
                    .normalizeEmail(),
                body('age')
                    .exists()
                    .isString()
                    .isLength({ min: 1, max: 2 })
                    .withMessage('Age is too little or long.')
                    .custom(value => commonUtility.checkIfPositiveNumber(value))
                    .withMessage('Age must be positive a no.')
            ];
        case 'delete':
            return [
                param('email')
                    .exists()
                    .withMessage('Email is not available')
                    .isEmail()
                    .normalizeEmail()
            ];
    }
};

module.exports = { validate };
