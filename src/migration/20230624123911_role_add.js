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
    },
    {
    _id: "rol_973a0ffdbd849d6776335116",
    name: "Service Provider",
    slug: "service-provider"
    }
];

const data = roleModel.create(roleData);

data.then((v) =>{
    // console.log("data inserted!"
    process.exit(1);
}).catch((e)=>{
    console.log(":: e",e)
})