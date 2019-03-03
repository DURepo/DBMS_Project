var mysql = require('mysql2');

var con = mysql.createPool({
    host: "classmysql.engr.oregonstate.edu",
    user: "cs540_ummaredd",
    password: "neha123",
    database: "cs540_ummaredd"
  });
  
  function getcoords(callback) {
    con.query("SELECT latitude, longitude FROM cs540_ninHealthFacilities", (err, result) => {
      if (err) throw err;     
      callback(err,result);
    });
  };

  function getstates(callback){
    con.query("SELECT Name FROM cs540_States", (err, result) => {
      if (err) throw err;
      res1 = JSON.stringify(result);
      res2 = JSON.parse(res1)         
      callback(err,res2);
    });
  };
  

 function getHospitalCountbyStates(callback){
  con.query("SELECT State_Name as name , count(*) as count from cs540_ninHealthFacilities Group by State_Name", (err, result) => {
    if(err) throw err;
    res1 = JSON.stringify(result);
    res2 = JSON.parse(res1);   
    callback(err,res2);
  });
 }

 function getDistrictsofState(callback){
   var stateName = "Goa"
   var sql = "SELECT DistrictNo,Name FROM cs540_District where StateID = (SELECT StateID FROM cs540_State WHERE Name = ?)";
   con.query(sql, [stateName], function(err, result){
     if(err) throw err;
     console.log(result);
     callback(err, result)
   });
 }

 function getPopulationbyDistrict(callback){
   var DistrictNo = 123
   var sql = "SELECT Population from cs540_statePopulationinDetail WHERE DistrictNo = ?";
   con.query(sql, [DistrictNo], function(err, result){
     if(err) throw err;
     console.log(result);
     callback(err, result);
   });
 }
 


  module.exports = {
    getCoords : getcoords,
    getStates: getstates,
    getHospitalCountbyStates : getHospitalCountbyStates,
    getDistrictsofState : getDistrictsofState,
    getPopulationbyDistrict : getPopulationbyDistrict

  };