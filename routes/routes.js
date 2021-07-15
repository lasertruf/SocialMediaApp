const express = require('express');
const { ModuleResolutionKind } = require('typescript');


const router = express.Router();
const Post = require('../backend/models/post.js');
const ObjectId = require('mongoose').Types.ObjectId;

//get
router.get('/', (req,res) => {
    Post.find((err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(doc); 

        }
    })
    });

//get by id
router.get('/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        Post.findById(req.params.id,(err,doc)=>{
            if(err){
                console.log('error in get post by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }


    
    });

//post
router.post('/', (req,res) => {
let post = new Post ({

    title : req.body.title,

    content : req.body.content,

    email  : req.body.email
});

post.save((err,doc)=>{
    if(err){
        console.log('Error in Post data' + err);
    }
    else{
        res.send(doc); 
        console.log(doc);
    }
});
});


//put 
router.put('/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){
        let post = {
            title : req.body.title,
           content : req.body.content
       };

        Post.findByIdAndUpdate(req.params.id,{$set:post},{new:true},(err,doc)=>{
            if(err){
                console.log('error in delete post by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
        
    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }

});


//delete
router.delete('/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        Post.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(err){
                console.log('error in delete post by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });

    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }

});


module.exports= router;