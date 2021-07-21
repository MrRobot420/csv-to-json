const fs = require('fs')
var csv = require("csvtojson");
const csvFilePath = "./data/kitchen.csv"
const outFilePath = "./data/kitchen.json"
 
// Convert a csv file with csvtojson
csv({ delimiter: ';'})
  .fromFile(csvFilePath)
  .then(lifehacks => { //when parse finished, result will be emitted here.
    lifehacks = lifehacks.map(lifehack => {
        lifehack.isFavorite = false;
        lifehack.isFeatured = false;
        return lifehack
    })
    console.log(lifehacks);
    fs.writeFileSync(outFilePath, JSON.stringify(lifehacks, null, 2));
})
