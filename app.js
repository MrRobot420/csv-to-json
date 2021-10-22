const fs = require('fs')
var csv = require("csvtojson");
const csvFilePath = "./data/cybertrez420-all-txs.csv"
const outFilePath = "./data/cybertrez420-all-txs.json"
 
// Convert a csv file with csvtojson
csv({ delimiter: ','})
  .fromFile(csvFilePath)
  .then(lifehacks => { //when parse finished, result will be emitted here.
    lifehacks = lifehacks.map(lifehack => {
        return lifehack
    })
    console.log(lifehacks);
    fs.writeFileSync(outFilePath, JSON.stringify(lifehacks, null, 2));
})
