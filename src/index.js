/**
 * Created by garusis on 20/11/17.
 */
const express = require('express');
const app = express();
const body = require('body-parser');
const workshops = require('./workshops');
const assistants = require('./assistants');

app.listen(3000, function(){
    console.log('example app listening on 3000');
});

app.use(body.urlencoded({extended:false}));

app.use(body.json());

app.use('/workshops', workshops);
app.use('/assistants', assistants);

module.exports = app;