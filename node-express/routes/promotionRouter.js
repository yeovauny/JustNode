const express = require('express');
const bodyParser = require ('body-parser');


const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());


promotionRouter.route('/')
/**end points without params */
.get((req,res,next) =>{
    res.end("Sending all promotions to you!");

})

.post((req,res,next) =>{
    res.statusCode = 200;
    res.end(`will add the promotions ${req.body.name} with details ${req.body.description}`);
})

.put((req,res,next) =>{
    res.statusCode = 200;
    res.end(`Will update the promotions ${req.body.name} with  details ${req.body.description}`)
})

.delete((req,res,next) =>{
    res.statusCode = 200;
    res.end(`Was deleted all the promotions`);
})
/**
 * endpoints with params
 */
;

var apiRoutes = {
    getParamsPromotionRouter : function(req, res, next){
        console.log(`/promotion/:id with id ${req.params.id}`);
        res.end("GET endpoint with params  "+req.params.id)
    },
    postParamsPromotionRouter : function(req, res, next){
        console.log(`/promotion/:id with id ${req.params.id}`);
        res.end(`POST endpoint with params  ${req.params.id} with body name ${req.body.name} and  details ${req.body.description}`)
    },
    putParamsPromotionRouter : function(req, res, next){
        console.log(`/promotion/:id with id ${req.params.id}`);
        res.end(`PUT endpoint with params  ${req.params.id} with body name ${req.body.name} and  details ${req.body.description}`)
    },
    deleteParamsPromotionRouter : function(req, res, next){
        console.log(`/promotion/:id with id ${req.params.id}`);
        res.end("DELETE endpoint. Was deleted the promotion with id  "+req.params.id)
    }
    
}
promotionRouter.route('/:id').get(apiRoutes.getParamsPromotionRouter);
promotionRouter.route('/:id').post(apiRoutes.postParamsPromotionRouter);
promotionRouter.route('/:id').put(apiRoutes.putParamsPromotionRouter);
promotionRouter.route('/:id').delete(apiRoutes.deleteParamsPromotionRouter);


module.exports = promotionRouter;