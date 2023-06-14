const { _DB } = require("../../database/schemas");


const countryRegions = async(countryId = new Number())=>{
    let country = new _DB('Regions');
    let region = await country.getModel("Regions").find;
    console.log(region)
} 

countryRegions(1);
module.exports = {countryRegions};