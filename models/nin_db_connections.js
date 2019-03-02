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


  module.exports = {
    getCoords : getcoords,
    getStates: getstates,
    getHospitalCountbyStates : getHospitalCountbyStates

  };