const moment = require("moment-timezone");
const path = require('path');
// include node fs module
var fs = require('fs');
require("../../loaders/mongoose");
const migrationModel = require("./migrationModel")
const { mongoId } = require("../../helpers/commonFunction")
const fileName = `${moment().format("YYYYMMDDHHmmSS")}_${process.argv[2]}`;
const created_at = moment();
const creation = async () => {
    try {
        console.log(mongoId("role"))
        // writeFile function with filename, content and callback function
        content = 'const { mongoId } = require("../helpers/commonFunction");\nrequire("../loaders/mongoose");';
        fs.writeFile(path.join(__dirname,"../",`${fileName}.js`), content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
        });

        setTimeout(() => process.exit(1), 500)

} catch (error) {
console.log(":: e", error)        
}

}

creation();
