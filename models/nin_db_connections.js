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
      console.log(result);
      callback(err,result);
    });
  };

  module.exports = {
    getCoords : getcoords,

  };