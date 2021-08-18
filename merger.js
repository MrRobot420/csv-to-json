const fs = require('fs')
var csv = require("csvtojson");
const inputDir = "./data/input/"
const outFilePath = "./data/lifehacks_de.json"

const getFilenames = (folder) => {
    const filenames = []
    fs.readdirSync(folder).forEach(file => {
        console.log(file)
        filenames.push(file)
    })
    return filenames
}

const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
        var x = parseInt(a[key]); var y = parseInt(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const merger = async () => {
    const filenames = getFilenames(inputDir)

    const data = await Promise.all(filenames.map(async file => {
        const lifehacksForFile = []
        await csv({ delimiter: ';'})
        .fromFile(inputDir + file)
        .then(lifehacks => { //when parse finished, result will be emitted here.
            lifehacks = lifehacks.forEach(lifehack => {
                // console.log(lifehack);
                delete lifehack.imageNumber
                lifehack.isFavorite = false;
                lifehack.isFeatured = false;
                lifehacksForFile.push(lifehack)
            })
        })
        return [...lifehacksForFile]
    }))

    const realData = data.reduce((acc, curr) => {
        return [...acc, ...curr]
    }, [])
    const sortedData = sortByKey(realData, 'id')
    fs.writeFileSync(outFilePath, JSON.stringify(sortedData, null, 2));
}

merger()