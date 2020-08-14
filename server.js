const express = require('express');
var methodOverride = require('method-override')
const app = express();
const mongoose =require('mongoose')
const indexRouter = require('./routes/singers')
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
mongoose.connect('mongodb://localhost/singer', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongoose ...')
});
app.use('/',indexRouter)
app.listen(3000,()=>{
    console.log('connected...')
})