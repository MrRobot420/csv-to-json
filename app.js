const fs = require('fs')
var csv = require("csvtojson");
const csvFilePath = "./data/kitchen.csv"
const outFilePath = "./data/kitchen.json"
 
// Convert a csv file with csvtojson
csv({ delimiter: ';'})
  .fromFile(csvFilePath)
  .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
     console.log(jsonArrayObj);
     fs.writeFileSync(outFilePath, JSON.stringify(jsonArrayObj, null, 2));
   })
