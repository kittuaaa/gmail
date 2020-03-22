const users = require("../data/data");

module.exports = function (app) {

    app.getUsers = (req, res) => {
        try {
            res.status(200).send({data: users}) ;
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'})
        }

    };

    app.getSpecificUser = (req, res) => {
        try {
            const user = users.find(user => user.email === req.params.email);
            if(user) {
                res.status(200).send({data: user});
            } else {
                res.status(200).send({msg: 'User is not available'});
            }
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'});
        }

    };

    app.addUser = (req, res) => {
        try {
            const user = users.findIndex(user => user.email === req.body.email);
            if(user > -1) {
                res.status(400).send({msg: 'User already exist'});
            } else {
                users.push({id: (users.length + 1).toString(), ...req.body});
                res.status(200).send({msg: 'User has been added successfully', data: users});
            }
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'})
        }

    };

    app.updateUser = (req, res) => {
        try {
            const user = users.findIndex(user => user.email === req.body.email);
            if(user> -1) {
                users[user] = { ...req.body};
                res.status(200).send({msg: 'User has been updated successfully', data: users});
            } else {
                res.status(400).send({msg: 'User is not available'})
            }

        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'})
        }

    };

    app.deleteUser = (req, res) => {
        try {
            const user = users.findIndex(user => user.email === req.param.email);
            if(user) {
                users.splice(user, 1);
                res.status(200).send({msg: 'User has been deleted successfully', data: users});
            } else {
                res.status(400).send({msg: 'User is not available'})
            }
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'});
        }

    }

};
