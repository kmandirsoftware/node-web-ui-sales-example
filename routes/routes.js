const programdetailRoutes = require('./programdetail')
const campaignRoutes = require('./campaign')
const dealsRoutes = require('./deals')

const appRouter = (app, mysql, fs, checkAuthenticated, checkNotAuthenticated) => {

   /* GET home page. */
   app.get('/', checkAuthenticated, (req, res) => {
     res.render('index', {page:'Home', menuId:'home', name: req.user.name});
   });   
   /* GET login page. 
    */
   app.get('/login', checkNotAuthenticated, (req, res) => {
     res.render('login', {page:'Login', menuId:'login'});
   });   

   app.delete('/logout', (req, res) => {
     req.logOut()
     res.redirect('/login')
   })

   // Handle web pages
   app.get('/programs',checkAuthenticated, function(req, res, next) {
     res.render('grid', {page:'Programs', menuId:'programs', gridname: 'programGrid', name: req.user.name});
   });   

   app.get('/campaigns',checkAuthenticated, function(req, res, next) {
     res.render('grid', {page:'Campaigns', menuId:'campaigns', gridname:'campaignGrid', name: req.user.name});
   });

   app.get('/deals',checkAuthenticated, function(req, res, next) {
     res.render('grid', {page:'Deals', menuId:'deals', gridname:'dealsGrid', name: req.user.name});
   });

   	// Handle Web Requests
	programdetailRoutes(app, mysql, fs, checkAuthenticated);
	campaignRoutes(app, fs, checkAuthenticated);
	dealsRoutes(app, fs, checkAuthenticated);
};

module.exports = appRouter;