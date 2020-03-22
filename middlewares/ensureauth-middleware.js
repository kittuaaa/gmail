const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const TOKEN_PATH = './configs/token.json';

module.exports = (req, res, next) => {
    try {
        // Load client secrets from a local file.
        fs.readFile('./configs/credentials.json', (err, content) => {
            if (err) console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Gmail API.
            authorize(JSON.parse(content)).then(token => {
                req.mail = google.gmail({version: 'v1', auth: token});
                next();
            }).catch(err => {
                console.log('error----------?', err);
                return false;
            });
        });

    } catch (e) {
        console.log('error--------->', e);
        return false;
    }
};

function authorize(credentials) {
    try {
        console.log('1234rwe');
        return new Promise((resolve, reject) => {
            // The file token.json stores the user's access and refresh tokens, and is
            // created automatically when the authorization flow completes for the first time.

            const {client_secret, client_id, redirect_uris} = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) {
                    getNewToken(oAuth2Client).then((token) => {
                        console.log('===================================', token);
                        resolve(token);
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    oAuth2Client.setCredentials(JSON.parse(token));
                    resolve(oAuth2Client);
                }
            });
        })
    } catch (e) {
        return false;
    }
}

function getNewToken(oAuth2Client) {
    try {
        return new Promise((resolve, reject) => {
            // If modifying these scopes, delete token.json.
            const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
                oAuth2Client.getToken(code, (err, token) => {
                    if (err) {
                        console.error('Error retrieving access token', err);
                        reject(err);
                    }
                    oAuth2Client.setCredentials(token);
                    console.log('===================================token===================');
                    // Store the token to disk for later program executions
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        console.log('Token stored to', TOKEN_PATH);
                        resolve(oAuth2Client);
                    });
                });
            })
        })
    } catch (e) {
        console.log('error', e);
        return false;
    }

}

function setAuthContext(auth, req) {
    console.log();

    // Object.assign(req, {authInfo: auth});
    return true;
}
