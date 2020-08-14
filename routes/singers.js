const express = require('express');
const Singer = require('../models/Singer');
const router = express.Router();

router.get('/',async (req,res)=>{
    const searchOption = {};
    if(req.query.name != null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name,'i')
    }
    const singers = await Singer.find(searchOption)
    res.render('index.ejs',{singers:singers})
})

router.get('/add',(req,res)=>{
    res.render('add')
})

router.post('/',async (req,res)=>{
    const {name,age,description} = req.body;
    const newSinger = new Singer({
        name:name,
        age:age,
        description:description
    });
    // try{
        await newSinger.save()
        res.redirect('/')
    // }catch(e){
    //     console.log(e)
    //     res.send('error')
    // }
})

router.get('/:id',async(req,res)=>{
    const singer =await Singer.findById(req.params.id)
    if(singer == null){
        res.redirect('/')
    }else{
        res.render('singer',{singer:singer})
    }

})

module.exports = router