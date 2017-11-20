/**
 * Created by garusis on 20/11/17.
 */
const express = require('express');
const app = express();


app.listen(3000, function(){
    console.log('example app listening on 3000');
});


module.exports = app