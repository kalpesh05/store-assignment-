
//requiring path and fs modules
require("../../loaders/mongoose");
const path = require('path');
const fs = require('fs');
const migrationModel = require("./migrationModel")
const { mongoId } = require("../../helpers/commonFunction")
const util = require("util");
const exec = util.promisify(require("child_process").exec);


//joining path of directory 
const directoryPath = path.join(__dirname, '../');
const migrationData = migrationModel.find();
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        if(!["config"].includes(file)){
        // Do whatever you want to do with the file
        migrationData.then(async (res) => {

            
            if(!res.find((v) => v.name === file)){
                const Obj  = {_id:  mongoId(), name: file};
                try {
                    await  migrationModel.create(Obj);
                     const result = await exec(`node ${path.join(__dirname, `../${file}`)}`);

                } catch (error) {
                    migrationModel.remove({name:file})                    
                }
            }

            process.exit(1);
        })
    
    }

    });
});