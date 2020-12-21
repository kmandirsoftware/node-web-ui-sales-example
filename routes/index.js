var express = require('express');
var router = express.Router();
const mysql = require("mysql");
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/programs', function(req, res, next) {
  res.render('grid', {page:'Programs', menuId:'about', gridid: 'programGrid'});
});

router.get('/campaigns', function(req, res, next) {
  res.render('grid', {page:'Campaigns', menuId:'contact', gridid:'campaignGrid'});
});


    const con = mysql.createConnection({
        host: 'ec2-13-59-108-198.us-east-2.compute.amazonaws.com',
        user: 'webuser',
        password: 'webwordpw',
        database: 'ldmrk'
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

router.get('/ProgramDetailsColumnNames', (req, res, next) => {
        var myquery="show columns from ldmrk.programdetails";
        con.query(myquery, function(err,result){
            if(err){
                console.log('Error');
                console.log(err);
            }else{
                console.log('Success');
                var data= new Array();
                for (var index in result){
                    if( result[index]['Field'] === "id"){ continue };
                    if( result[index]['Field'] === 'created_at'){ continue };
                    data.push(result[index]['Field']);
                }
                var json=JSON.stringify(data);
                res.send(json);
            }
        })
});
    router.get('/ProgramDetails', (req, res) => {
        if(req.query.hasOwnProperty('start')){
            console.log(req.query['start']);
            var selectallquery = "select * from programdetails limit 100 offset  "+req.query['start'] ;
        }else{
            var selectallquery = "select * from programdetails limit 1000";
        }
      con.query(selectallquery, function(err,result) {
        if(err) {
          console.log('Error');
          console.log(err);
        }
        else {
          console.log('Success');
          var data=[];
          var i=0;
          for (var index in result){
            delete result[index]['id'];
            data[i] = result[index];
            i++;
           }
            //console.log(header);
             var json = JSON.stringify(data);
           res.send(json); 
        }
      });            
    });

    const dataPath = './data/campaign.json';
    const columns = './data/campaigncolumndefs.json';
    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };
    router.get('/CampaignsAPI', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    router.get('/CampaignsColumnNames', (req, res) => {
        fs.readFile(columns, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

module.exports = router;
