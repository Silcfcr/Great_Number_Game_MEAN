// npm init -y
// npm i express
//npm i ejs 
// npm install express-session
// npm i nodemon
// mkdir views // create views folder
// touch index.ejs // create index.ejs file in views folder

const express = require( 'express' );
var session = require('express-session');

const app = express();
app.use(session({ secret: 'codingdojorocks' }));
// to use ejs

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
// body-parser

app.use( express.urlencoded({extended:true}) );

app.get( '/', function( request, response ){
    var number = Math.floor(Math.random() * 100) + 1;
    console.log("Im the number" + number);
    request.session.guess = undefined;
    request.session.number = number;
    response.redirect( '/play');
});

app.get( '/play', function( request, response ){
    response.render( 'index',{ guess: request.session.guess, number: request.session.number });
});


app.post( '/guess', function( request, response ){
    let guess = Number(request.body.guess);
    console.log(guess);
    request.session.guess = guess;

    response.redirect( '/play');
});

app.get( '/playAgain', function( request, response ){
    request.session = null;
    response.redirect( '/');
});

app.listen( 4000, function(){
    console.log( "The users server is running in port 4000." );
});