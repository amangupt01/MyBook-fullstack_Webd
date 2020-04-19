const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const layouts = require('handlebars-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')
const expressValidator = require("express-validator");
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router()
const config = require('./config/database');
const passport = require('passport');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

mongoose.connect(config.database,{ useNewUrlParser: true,useUnifiedTopology: true});
let db = mongoose.connection;

db.once('open',function(){
	console.log('Connected to MongoDb');
});
//checking errors 
db.on('error',function(err){
	console.log(err);
});
app.use(express.static(path.join(__dirname,'Public')));

app.use(cookieParser('secret'));
app.use(session({cookie:{maxAge: null},resave: false,saveUninitialized : false,secret:'secret'}));
app.use(flash());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


//

app.get('*',function(req,res,next){
	res.locals.user = req.user || null ;
	next();
});



let Article = require('./models/article')

const hbs = handlebars.create({
	layoutsDir: __dirname + '/views/layouts',
	extname : 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars),

	helpers:{
		iff: function(a, operator, b, opts) {
    		var bool = false;
    		switch(operator) {
       			case '==':
           		bool = a === b;
           		break;
       		case '>':
           		bool = a > b;
           		break;
       		case '<':
           		bool = a < b;
           		break;
       		default:
           		throw "Unknown operator " + operator;
           	}	
    	}
	}
});

app.set('view engine', 'hbs'); 
app.engine('hbs', hbs.engine);


app.use(bodyParser.urlencoded({extended : false }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.locals.message = req.session.message;
	delete req.session.message;
	next();
})




app.get('/', (req, res) => {
	Article.find({}).lean()
		.exec(function(err,articles){
		if(err){
			console.log(err)
		}else{
			res.render('home', {title : 'Articles', article : articles });
		}
	})

});




let articles = require('./routes/articles');
let users = require('./routes/users');

app.use('/articles',articles);
app.use('/users',users);

app.listen(3000,function(){
	console.log('Server Started')
}) 