const express = require('express');
const Singer = require('../models/Singer');
const router = express.Router();

router.get('/',async(req,res)=>{
    const seachOption ={}
    if(req.query.name != null && req.query.name !== ""){
        seachOption.name = new RegExp(req.query.name,'i')
    }
    const singers = await Singer.find(seachOption)
    res.render('index',{singers:singers})

})

router.get('/add',(req,res)=>{
    res.render('add',{singer: new Singer()})
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
router.delete('/:id',async (req,res)=>{
    await Singer.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.put('/:id',async(req,res)=>{
    let singer =await Singer.findById(req.params.id)
    singer.name = req.body.name
    singer.age = req.body.age
    singer.description = req.body.description
    // try{
        singer = await singer.save()
        res.redirect(`/${singer.id}`)
    // }catch (e){
    //     res.render(`/edit/${singer.id}`)
    //     console.log(e)
    // }

})

router.get('/edit/:id', async (req,res)=>{
    const singer = await Singer.findById(req.params.id)
    res.render('edit',{singer:singer})
})
module.exports = router