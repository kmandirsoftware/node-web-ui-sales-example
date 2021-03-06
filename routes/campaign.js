const campaignRoutes = (app, fs, checkAuthenticated) => {

    const dataPath = './data/campaign.json';
    const columns = './data/campaigncolumndefs.json';

    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };
    app.get('/CampaignsAPI', checkAuthenticated, (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    app.get('/CampaignsColumnNames', checkAuthenticated,  (req, res) => {
        fs.readFile(columns, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

};

module.exports = campaignRoutes;