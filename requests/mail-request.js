const { body, param } = require('express-validator');
const commonUtility = require('../utility/common-utility');

const validate = method => {
    switch (method) {
        case 'getMailInfo':
            return [
                body('threadId')
                    .exists()
                    .isString()
                    .withMessage("Mail Thread Id isn't available")
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Name has some invalid characters.'),
            ];
    }
};

module.exports = { validate };
