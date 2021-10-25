const express = require('express');
const bodyParser = require ('body-parser');
const mongoose =require('mongoose');
const Leader = require('../models/leaders');
const authenticate = require('../authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
/**end points without params */
.get((req,res,next) =>{
    Leader.find({})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));

})

.post(authenticate.verifyUser ,(req,res,next) =>{
    Leader.create(req.body)
    .then((leader) => {
        console.log('Leader was Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
    
})

.put(authenticate.verifyUser ,(req,res,next) =>{
  res.statusCode = 403;
  res.end(`Put operations not supported on /leaders`);
})

.delete(authenticate.verifyUser ,(req,res,next) =>{
    Leader.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
});
/**
 * End points with params on the URLS
 */
var apiRoutes = {
    getParamsLeaderRouter :  authenticate.verifyUser , function(req, res, next){
        console.log("entra a esta secccion despues de autenticarse");
        Leader.findById(req.params.id)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    },
    postParamsLeaderRouter : function(req, res, next){
        res.statusCode = 403;
        res.end('POST operation not supported on /Leaders/'+ req.params.dishId);
    },
    putParamsLeaderRouter : function(req, res, next){
        Leader.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    },
    deleteParamsLeaderRouter : function(req, res, next){
        Leader.findByIdAndRemove(req.params.id)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    
}
leaderRouter.route('/:id').get(apiRoutes.getParamsLeaderRouter);
leaderRouter.route('/:id').post(apiRoutes.postParamsLeaderRouter);
leaderRouter.route('/:id').put(apiRoutes.putParamsLeaderRouter);
leaderRouter.route('/:id').delete(apiRoutes.deleteParamsLeaderRouter);


module.exports = leaderRouter;