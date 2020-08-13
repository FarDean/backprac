const express = require('express');
const Singer = require('../models/Singer');
const router = express.Router();

router.get('/',async (req,res)=>{
    const singers = await Singer.find()
    res.render('index.ejs',{singers:singers})
})

router.get('/add',(req,res)=>{
    res.render('add')
})

router.post('/',async (req,res)=>{
    const {name} = req.body;
    const newSinger = new Singer({
        name:name
    });
    // try{
        await newSinger.save()
        res.redirect('/')
    // }catch(e){
    //     console.log(e)
    //     res.send('error')
    // }
})

module.exports = router