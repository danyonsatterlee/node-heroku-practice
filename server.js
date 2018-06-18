const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); 
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));
app.use((req,res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('unable to append to server.log');
        }
    })
    next();
});

app.use((req, res) =>{
    res.render('matinence.hbs')
    
})

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})


app.get('/', (req, res)=>{
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome hello'
    });
});


app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        message: 'this is a bad request'
    });
});

app.listen(3003, ()=>{console.log('server is up on port 3003')});