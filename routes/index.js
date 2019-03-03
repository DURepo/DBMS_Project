var express = require('express');
var router = express.Router();
var nin_db = require('../models/nin_db_connections');

/* GET home page. */

router.get('/', function(req, res, next) {
  /*var result = [ { latitude: 10.786, longitude: 78.2814 },
     { latitude: 11.4751, longitude: 77.5783 },
     { latitude: 10.9211, longitude: 77.3173 },
     { latitude: 10.9421, longitude: 77.4385 },
     { latitude: 10.7964, longitude: 78.2498 },
      { latitude: 10.535, longitude: 76.996 },
      { latitude: 10.9837, longitude: 77.4423 },
      { latitude: 10.9402, longitude: 77.4414 },
      { latitude: 10.7478, longitude: 78.2245 },
      { latitude: 11.4506, longitude: 77.6818 },
      { latitude: 12.3399, longitude: 78.2785 },
      { latitude: 10.8196, longitude: 78.2717 },
      { latitude: 11.3395, longitude: 77.7169 },
      { latitude: 11.0231, longitude: 77.4235 },
      { latitude: 11.5193, longitude: 76.4816 }];
      res.render('index', { title: 'Express', coords:result});*/
        
    nin_db.getCoords((err,result) => {    
    res.render('index', { title: 'Express', coords:result});    
  });   
});

router.get('/bystate',function(req,res){
  nin_db.getHospitalCountbyStates((err,result)=>{
    res.send(result);
  })
});

module.exports = router;
