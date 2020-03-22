const request = require('../requests/users-request');

module.exports = app => {

    app.route('/api/v1/user/:email')
        .get(request.validate("delete"), app.getSpecificUser)
        .put(request.validate('update'), app.updateUser)
        .delete(request.validate('delete'), app.deleteUser);

    app.route('/api/v1/user')
        .get(app.getUsers)
        .post(request.validate('add'), app.addUser);
};
