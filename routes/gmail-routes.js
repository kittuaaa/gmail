const request = require('../requests/mail-request');
const ensureAuthenticated = require('../middlewares/ensureauth-middleware');

module.exports = app => {
    app.route('/api/v1/mail/list')
        .get(ensureAuthenticated, app.getAllMails);

    app.route('/api/v1/mail/:threadId')
        .get(request.validate("getMailInfo"), ensureAuthenticated, app.getSpecificMail);
};
