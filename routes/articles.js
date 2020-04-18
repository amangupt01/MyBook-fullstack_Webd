const express = require('express');
const router = express.Router()

let Article = require('../models/article')




router.get('/edit/:id',function(req,res){
	Article.findById(req.params.id).lean()
		.exec(function(err,articles){
		if(err){
			res.send("Error 404 : Not Found")
		}else{
			res.render('edit_articles', {title: "Edit article" ,article : articles});
		}
	});
});		

router.get('/add',function(req,res){
	res.render('articles_add', {title : 'Add Article'});
});

/// Add submit routes

router.post('/add',function(req,res){
	req.checkBody('title','Title is required').notEmpty();
	req.checkBody('author','Author is required').notEmpty();
	req.checkBody('body','Body is required').notEmpty()

	let errors =req.validationErrors();
	if(errors){
		res.render('articles_add', {title : 'Add Article',errors:errors});
	}
	else{
		let article = new Article() ;
		article.title = req.body.title;
		article.author = req.body.author;
		article.body = req.body.body

		article.save(function(err){
			if(err){
				console.log(err);
				return;
			}
			else {
				req.session.message = {
					type : 'success',
					intro : 'Success! Your article has been added',
					message : 'Yes'
				}
				res.redirect('/');
				return;
		}
	});
	}
});


router.post('/edit/:id',function(req,res){
	let article =  {};
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body

	let query = {_id:req.params.id};

	Article.updateOne(query,article,function(err){
		if(err){
			console.log(err);
			return;
		}
		else {
			req.session.message = {
				type : 'success',
				intro : 'Success! Your article has been updated',
				message : 'Yes'
			}
			res.redirect('/');
			return;
		}
	});
});

router.delete('/:id',function(req,res){
	let query = {_id:req.params.id}

	Article.deleteOne(query,function(err){
			if(err){
			console.log(err);
		}
		res.send('Success');
	});
});

router.get('/:id',function(req,res){
	Article.findById(req.params.id).lean()
		.exec(function(err,articles){
		if(err){
			console.log(err)
			res.send("Error 404 : Not Found")
		}else{
			res.render('articles', {article : articles});
		}
	});
});


module.exports = router ;

