
const loginRouter = (app,mysql,bcrypt,passport,flash,session,methodOverride,checkNotAuthenticated,checkAuthenticated) => {

const users = [];

bcrypt.hash('guest1234', 10, function(err, hash) {
  // Store hash in database
	users.push({
      id: Date.now().toString(),
      name: "guest",
      email: "guest@guest.com",
      password: hash
    })
    console.log(users);
});

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

app.post('/login', checkNotAuthenticated, passport.authenticate(
	'local', 
	{
  		successRedirect: '/',
  		failureRedirect: '/login',
  		failureFlash: true
	},

))

};

module.exports = loginRouter;