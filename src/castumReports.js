//////////////////SS/////////////////////////////////////////basic required code
//Must to configure private data on apiConfig.js file
const wizlib = require("wizcloud-api");
const fs = require("fs");
const myObjData = require("./apiConfig.json");

async function exportCastumersRecords(fileData) {
  //console.log("filedata" + fileData);
  console.log(myObjData);
  console.log(typeof myObjData);
  console.log(Array.isArray(myObjData));
  var myDBname = await myObjData[0].WizcloudApiDBName;
  wizlib.init(myObjData[0].WizcloudApiPrivateKey, myObjData[0].WizcloudApiServer);

  let { reportCod, parameters } = await fileData;

  let apiRes = await wizlib.exportDataRecords(myDBname, {
    datafile: reportCod,
    parameters: parameters,
  });
  const jsondata = JSON.parse(apiRes);

  const data = JSON.stringify(jsondata, null, 2);

  return data;
}

module.exports.exportCastumersRecords = exportCastumersRecords;
