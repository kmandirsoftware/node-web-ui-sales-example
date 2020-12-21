const programdetailRoutes = require('./programdetail')
const campaignRoutes = require('./campaign')

const appRouter = (app, mysql, fs) => {

   /* GET home page. */
   app.get('/', (req, res) => {
     res.render('index', {page:'Home', menuId:'home'});
   });   

   
   app.get('/programs', function(req, res, next) {
     res.render('grid', {page:'Programs', menuId:'about', gridid: 'programGrid'});
   });   

   app.get('/campaigns', function(req, res, next) {
     res.render('grid', {page:'Campaigns', menuId:'contact', gridid:'campaignGrid'});
   });

	programdetailRoutes(app, mysql, fs);
	campaignRoutes(app, fs);
};

module.exports = appRouter;