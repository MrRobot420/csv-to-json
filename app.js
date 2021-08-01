const fs = require('fs')
var csv = require("csvtojson");
const csvFilePath = "./data/lifehacks_de.csv"
const outFilePath = "./data/lifehacks_de.json"
 
// Convert a csv file with csvtojson
csv({ delimiter: ';'})
  .fromFile(csvFilePath)
  .then(lifehacks => { //when parse finished, result will be emitted here.
    lifehacks = lifehacks.map(lifehack => {
        delete lifehack.imageNumber
        lifehack.isFavorite = false;
        lifehack.isFeatured = false;
        return lifehack
    })
    console.log(lifehacks);
    fs.writeFileSync(outFilePath, JSON.stringify(lifehacks, null, 2));
})
