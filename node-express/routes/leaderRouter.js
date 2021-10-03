const express = require('express');
const bodyParser = require ('body-parser');


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
/**end points without params */
.get((req,res,next) =>{
    res.end("Sending all leaders to you!");

})

.post((req,res,next) =>{
    res.statusCode = 200;
    res.end(`will add the leader ${req.body.name} with details ${req.body.description}`);
})

.put((req,res,next) =>{
    res.statusCode = 200;
    res.end(`Will update the leader ${req.body.name} with  details ${req.body.description}`)
})

.delete((req,res,next) =>{
    res.statusCode = 200;
    res.end(`Was deleted all the leader`);
});
/**
 * End points with params on the URLS
 */
var apiRoutes = {
    getParamsLeaderRouter : function(req, res, next){
        console.log(`/leader/:id with id ${req.params.id}`);
        res.end("GET endpoint with params  "+req.params.id)
    },
    postParamsLeaderRouter : function(req, res, next){
        console.log(`/leader/:id with id ${req.params.id}`);
        res.end(`POST endpoint with params  ${req.params.id} with body name ${req.body.name} and  details ${req.body.description}`)
    },
    putParamsLeaderRouter : function(req, res, next){
        console.log(`/leader/:id with id ${req.params.id}`);
        res.end(`PUT endpoint with params  ${req.params.id} with body name ${req.body.name} and  details ${req.body.description}`)
    },
    deleteParamsLeaderRouter : function(req, res, next){
        console.log(`/leader/:id with id ${req.params.id}`);
        res.end("DELETE endpoint. Was deleted the leader with id  "+req.params.id)
    }
    
}
leaderRouter.route('/:id').get(apiRoutes.getParamsLeaderRouter);
leaderRouter.route('/:id').post(apiRoutes.postParamsLeaderRouter);
leaderRouter.route('/:id').put(apiRoutes.putParamsLeaderRouter);
leaderRouter.route('/:id').delete(apiRoutes.deleteParamsLeaderRouter);


module.exports = leaderRouter;