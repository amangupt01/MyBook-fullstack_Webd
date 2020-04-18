const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const flash = require('connect-flash')

let User = require('../models/user');

router.get('/register',function(req,res){
	res.render('register');
});

router.post('/register',function(req,res){
	const name = req.body.name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;

	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('password','Password is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(req.body.password);

	let errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors : errors
		});
	}
	else {
		let newUser = new User({
			name:name,
			email:email,
			username:username,
			password:password,
		})
		bcrypt.genSalt(10,function(err,salt){
			bcrypt.hash(newUser.password,salt,function(err,hash){
				if(err){
					console.log(err)
				}	
				newUser.password =hash;
				newUser.save(function(err){
					if(err){
						console.log(err);
						return;
					}
					else{
						req.session.message = {
							type : 'success',
							intro : 'Success! Your are now registered and can login',
							message : 'Yes'
						}
						res.redirect('/users/login');
						return;
					}
				});
 			});
		});
	}
});

router.get('/login',function(req,res){
	res.render('login');
});



router.post('/login', function (req, res, next) { 
    passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '#',
      failureFlash: true,
    })(req, res, next)
});


router.get('/logout',function(req,res){
	req.logout();
	req.session.message = {
		type : 'success',
		intro : 'You are logged out',
		message : 'Yes'
		};
	res.redirect('/users/login');

})

module.exports = router ;