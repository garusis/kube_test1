/**
 * Created by garusis on 20/11/17.
 */
const express = require('express');
const app = express();
const body = require('body-parser');
const workshops = require('./workshop');
const assistants = require('./assistant');
const workshoper = require('./workshoper')

app.listen(3000, function(){
    console.log('example app listening on 3000');
});

app.use(body.urlencoded({extended:false}));

app.use(body.json());

app.use('/workshop', workshops);
app.use('/assistant', assistants);
app.use('/workshoper', workshoper);

module.exports = app;