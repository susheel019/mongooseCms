const express = require('express');
const routeCustomer = require('./routes/customer')

var app = express();

app.use('/customer' , routeCustomer)

//ejs for view engine
app.set('view engine' , 'ejs');

 app.get('/' , (req , res) =>{
    res.render('home' );
 });
 
 app.listen(7080,'127.0.0.1' , ()=>{
    console.log(`server started at http://127.0.0.1:7080`);
 });