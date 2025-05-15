const { mongoId } = require("../helpers/commonFunction");
require("../loaders/mongoose");
const roleModel = require("../models/roleModel");

const roleData = [
    {
    _id: "rol_1a37023fecf3005b66a1850e",
    name: "Admin",
    slug: "admin",
    },
    {
    _id: "rol_906473dafa4daad6190fa25e",
    name: "User",
    slug: "user"
    }
];

const data = roleModel.create(roleData);

data.then((v) =>{
    console.log("data inserted!")
    process.exit(1);
}).catch((e)=>{
    console.log(":: e",e)
})