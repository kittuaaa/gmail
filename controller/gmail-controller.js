const {google} = require('googleapis');

module.exports = function (app) {
    app.getAllMails = (req, res) => {
        try {
            const mailer = req.mail;
            const dataArr = [];
            mailer.users.messages.list({
                userId: 'me',
                labelIds: 'INBOX',
                maxResults: 10
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                var labels = res.data.messages;
                if (labels.length == 0) {
                    console.log('No Mail found.');
                } else {
                    console.log('Labels:');
                    for (var i = 0; i < labels.length; i++) {
                        var msg = labels[i];
                        mailer.users.messages.get({
                            userId: 'me',
                            id: msg.id
                        }).then(msg => {
                            console.log('msg', msg);
                            dataArr.push(msg);
                        })
                    }
                }
            });
            res.status(200).send({data: JSON.stringify(dataArr)})
        } catch (err) {
            res.status(500).send({msg: 'something went wrong'})
        }
    };

    app.getSpecificMail = (req, res) => {
        try {
            const mailer = req.mail;
            mailer.users.messages.get({userId: 'me', id: req.params.threadId}).then(msg => {
                console.log('msg', msg);
              res.status(200).send({data: msg});
            });
        } catch (err) {
            res.status(500).send({msg: 'something went wrong'})
        }
    }
};
