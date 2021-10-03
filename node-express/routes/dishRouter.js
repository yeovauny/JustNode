const express = require('express');
const bodyParser = require ('body-parser');


const dishRouter = express.Router();
const dishRouterParams = express.Router();


dishRouter.use(bodyParser.json());
dishRouterParams.use(bodyParser.json());




dishRouter.route('/')

.all((req,res,next)=>{

    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next) =>{
    console.log("verificacion que pasa en este laod");
   res.end("will send details of the dishes! "+req.query.id+ " to you!");

})

.get((req,res,next) =>{
    res.end("will send details of the dishes! "+req.params.dishID+ " to you!");

})

.post((req,res,next) =>{
    console.log("entra aqui");
    res.end(`will add the dish ${req.body.name} with details ${req.body.description}`);
})

.put((req,res,next) =>{
    res.statusCode = 200;
    res.write(`Will update the dish ${req.params.dishID} `);
    res.end(`Will update the dish ${req.body.name} with  details ${req.body.description}`)
})

.delete((req,res,next) =>{
    res.statusCode = 200;
    res.end(`Was deleted all Dishes!`);
});

/**
 * Was added endpoint that accept params data on url.
 */
 var apiRoutes = {
    getParamsRouter : function(req, res, next){
        console.log(`/dish/:id with id ${req.params.id}`);
        res.end("GET endpoint with params  "+req.params.id)
    },
    postdishRouter : function(req, res, next){
        console.log(`/dish/:id with id ${req.params.id}`);
        res.end(`POST endpoint with params  ${req.params.id} with body name ${req.body.name} and  details ${req.body.description}`)
    },
    putdishRouter : function(req, res, next){
        console.log(`/dish/:id with id ${req.params.id}`);
        res.end(`PUT endpoint with params  ${req.params.id} with body name ${req.body.name} and  details ${req.body.description}`)
    },
    deleteParamsRouter : function(req, res, next){
        console.log(`/dish/:id with id ${req.params.id}`);
        res.end("DELETE endpoint. Was deleted the dishe with id  "+req.params.id)
    }
    
}
dishRouter.route('/:id').get(apiRoutes.getParamsRouter);
dishRouter.route('/:id').post(apiRoutes.postdishRouter);
dishRouter.route('/:id').put(apiRoutes.putdishRouter);
dishRouter.route('/:id').delete(apiRoutes.deleteParamsRouter);

module.exports = dishRouter;