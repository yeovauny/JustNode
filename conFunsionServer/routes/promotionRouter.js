const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());


promotionRouter.route('/')
/**end points without params */
.get((req,res,next) =>{
    Promotions.find({})
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));

})

.post((req,res,next) =>{
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Dish Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((req,res,next) =>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
})
/**
 * endpoints with params
 */
;

var apiRoutes = {
    getParamsPromotionRouter : function(req, res, next){
        Promotions.findById(req.params.id)
        .then((promotios) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotios);
        }, (err) => next(err))
        .catch((err) => next(err));
    },
    postParamsPromotionRouter : function(req, res, next){
        res.statusCode = 403;
       res.end('POST operation not supported on /promotios/'+ req.params.id);
    },
    putParamsPromotionRouter : function(req, res, next){
        Promotions.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
    },
    deleteParamsPromotionRouter : function(req, res, next){
        Promotions.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    }
    
}
promotionRouter.route('/:id').get(apiRoutes.getParamsPromotionRouter);
promotionRouter.route('/:id').post(apiRoutes.postParamsPromotionRouter);
promotionRouter.route('/:id').put(apiRoutes.putParamsPromotionRouter);
promotionRouter.route('/:id').delete(apiRoutes.deleteParamsPromotionRouter);


module.exports = promotionRouter;